import type { Time, Objected } from 'src/types/objects';
import type { ImageCropperResult, base64 } from 'src/types';

import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ImageCropperComponent } from 'src/app/components/common/image_cropper/image-cropper.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_HEADERS } from 'src/utils/http';

@Component({
	selector: 'app-user-profile-picture-edit-modal',
	templateUrl: './picture-edit-modal.html',
	styleUrls: ['./picture-edit-modal.scss'],
})
export class UserProfilePictureEditModalComponent implements OnInit {
	@ViewChild('picture', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public cropper!: ImageCropperComponent;

	public pictureUncropped?: base64;
	public pictureCropped?: ImageCropperResult;

	private userId = 0;

	@Output() public pictureUpdated = new EventEmitter<base64>();

	public readonly options: Cropper.Options = {
		aspectRatio: 1,
		rotatable: true,
		zoomable: true,
		scalable: true,
	};

	public timeLeft?: Date;

	public constructor(
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(HttpClient) private readonly http: HttpClient,
		@Inject(UserService) private readonly u: UserService,
		private activeRoute: ActivatedRoute,
	) {
		this.activeRoute.params.subscribe((params) => {
			this.userId = parseInt(params['id'], 10);
			this.fetchData(this.userId);
		});
	}

	public ngOnInit(): void {
		this.modal.nativeElement.addEventListener('click', (e) => {
			const dimensions = this.modal.nativeElement.getBoundingClientRect();
			if (!dimensions) return;

			if (
				e.clientX < dimensions.left ||
				e.clientX > dimensions.right ||
				e.clientY < dimensions.top ||
				e.clientY > dimensions.bottom
			)
				this.close();
		});
	}

	public fetchData(id: number): void {
		this.apollo
			.query<Objected<{ lastPictureUpdate: Time }>>({
				query: gql`
					query ($user_id: Int!) {
						lastPictureUpdate(id: $user_id) {
							date
						}
					}
				`,
				variables: {
					user_id: id,
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data }) => {
				// The user can't update his picture more than once a week
				const diff =
					environment.DELAY_UPDATE_PROFILE_PICTURE * 1000 -
					(new Date().getTime() - new Date(data['lastPictureUpdate'].date).getTime());
				if (diff > 0) this.timeLeft = new Date(new Date().getTime() + diff);
			});
	}

	public open() {
		// Only the user can update his picture
		// TODO: take into account the user's role ("admin" can update any user's picture)
		if (this.userId !== this.u.user?.id) return;

		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
	}

	public updateUncroppedPicture(file: base64) {
		this.pictureUncropped = file;
	}

	public async updateCroppedPicture(event: ImageCropperResult) {
		this.pictureCropped = event;
		if (this.pictureCropped.dataUrl) this.pictureUpdated.emit(this.pictureCropped.dataUrl);

		const res: Response = await fetch(this.pictureCropped.dataUrl ?? '');
		const blob: Blob = await res.blob();
		const file = new File([blob], 'profile_picture.png', { type: 'image/png' });

		const formData = new FormData();
		formData.append('file', file, file.name);

		this.http
			.post(`${environment.API_URL}/users/picture/${this.activeRoute.snapshot.params['id']}`, formData, {
				headers: DEFAULT_HEADERS,
			})
			.subscribe({
				next: () => {
					if (this.userId !== this.u.user?.id) return;

					setTimeout(() => {
						this.u.refreshUserPicture();
					}, 1000);
				},
			});
	}
}
