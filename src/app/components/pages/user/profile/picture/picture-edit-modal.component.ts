import type { DateObject, Objected } from 'src/types/objects';

import { OnInit, ViewChild, ElementRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { ImageCropperComponent } from 'src/app/components/common/image_cropper/image-cropper.component';
import { ImageCropperResult } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-profile-picture-edit-modal',
	templateUrl: './picture-edit-modal.html',
	styleUrls: ['./picture-edit-modal.scss'],
})
export class UserProfilePictureEditModalComponent implements OnInit {
	@ViewChild('picture', { static: true }) public pictureModal!: ElementRef<HTMLDialogElement>;
	@ViewChild('pictureInput', { static: true }) public inputPicture!: ElementRef<HTMLInputElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public pictureCropper!: ImageCropperComponent;

	public pictureUncropped?: string;
	public pictureCropped?: ImageCropperResult;

	public readonly pictureOptions: Cropper.Options = {
		aspectRatio: 1,
		rotatable: true,
		zoomable: true,
		scalable: true,
	};

	public timeLeft?: Date;

	public readonly pictureForm: FormGroup = this.fb.group({
		picture: [null, [Validators.required]],
	});

	public constructor(
		@Inject(FormBuilder) private readonly fb: FormBuilder,
		@Inject(Apollo) private readonly apollo: Apollo,
		@Inject(HttpClient) private readonly http: HttpClient,
		@Inject(UserService) private readonly u: UserService,
		private activeRoute: ActivatedRoute,
	) {}

	public ngOnInit(): void {
		this.pictureModal.nativeElement.addEventListener('click', (e) => {
			const dimensions = this.pictureModal.nativeElement.getBoundingClientRect();
			if (!dimensions) return;

			if (
				e.clientX < dimensions.left ||
				e.clientX > dimensions.right ||
				e.clientY < dimensions.top ||
				e.clientY > dimensions.bottom
			)
				this.closePictureModal();
		});

		this.apollo
			.query<Objected<DateObject>>({
				query: gql`
					query ($user_id: Int!) {
						lastPictureUpdate(id: $user_id) {
							date
						}
					}
				`,
				variables: {
					user_id: this.activeRoute.snapshot.params['id'],
				},
				fetchPolicy: 'cache-first',
				errorPolicy: 'all',
			})
			.subscribe(({ data }) => {
				if (!data) return;

				// The user can't update his picture more than once a week
				// TODO: move the value to config
				const diff = 604800000 - (new Date().getTime() - new Date(data['lastPictureUpdate'].date).getTime());
				if (diff > 0) this.timeLeft = new Date(diff);
			});
	}

	public openPictureModal() {
		this.pictureModal.nativeElement.showModal();
	}

	public closePictureModal() {
		this.pictureModal.nativeElement.close();
	}

	public updateUncroppedPicture(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input && input.files && input.files[0]) {
			const reader = new FileReader();

			reader.onload = (event: ProgressEvent) => {
				this.pictureUncropped = (<FileReader>event.target).result as string;
			};

			reader.readAsDataURL(input.files[0]);
		}
	}

	public async updateCroppedPicture(event: ImageCropperResult) {
		this.pictureCropped = event;

		const res: Response = await fetch(this.pictureCropped.dataUrl ?? '');
		const blob: Blob = await res.blob();
		const file = new File([blob], 'profile_picture.png', { type: 'image/png' });

		const formData = new FormData();
		formData.append('file', file, file.name);

		const userId = parseInt(sessionStorage.getItem('user_id') ?? '0', 10);

		this.http
			.post(`${environment.API_URL}/users/picture/${userId}`, formData, {
				headers: {
					Authorization: `${sessionStorage.getItem('token')}`,
					'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
				},
			})
			.subscribe(() => {
				setTimeout(() => {
					this.u.refreshUserPicture();
				}, 1000);
			});
	}
}
