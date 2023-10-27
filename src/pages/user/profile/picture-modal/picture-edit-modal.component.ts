import type { base64 } from '#types';
import type { ImageCropperResult } from '@__old/types/index';
import type { Time } from '@__old/types/objects';

import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ImageCropperComponent } from '@components/common/image_cropper/image-cropper.component';
import { environment } from '@environments/environment';
import { UserPermissionService } from '@services/user-permissions.service';
import { UserService } from '@services/user.service';
import { DEFAULT_HEADERS } from '@utils/http';

@Component({
	selector: 'sith-user-profile-picture-edit-modal',
	templateUrl: './picture-edit-modal.html',
	styleUrls: ['./picture-edit-modal.scss'],
})
export class UserProfilePictureEditModalComponent implements OnInit {
	@ViewChild('picture', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public cropper!: ImageCropperComponent;

	public pictureUncropped?: base64;
	public pictureCropped?: ImageCropperResult;

	private userId = 0;

	@Input() public username = '';
	@Input() public existingPicture = false;
	@Output() public pictureUpdated = new EventEmitter<base64>();

	public readonly options: Cropper.Options = {
		aspectRatio: 1,
		rotatable: true,
		zoomable: true,
		scalable: true,
	};

	public timeLeft?: Date;

	public constructor(
		@Inject(HttpClient) private readonly http: HttpClient,
		@Inject(UserService) private readonly u: UserService,
		@Inject(UserPermissionService) private readonly perms: UserPermissionService,
		private activeRoute: ActivatedRoute,
	) {
		this.activeRoute.params.subscribe((params) => {
			this.userId = parseInt(params['id'] as string, 10); //FIXME params['id'] might be undefined
			this.perms.ready$.subscribe(() => this.fetchData(this.userId));
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
		// this.apollo
		// 	.query<{ lastPictureUpdate: Time }>({
		// 		query: gql`
		// 			query ($user_id: Int!) {
		// 				lastPictureUpdate(id: $user_id) {
		// 					date
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			user_id: id,
		// 		},
		// 		fetchPolicy: 'cache-first',
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data }) => {
		// 		if (!data) return;

		// 		// The user can't update his picture more than once a week
		// 		const diff =
		// 			environment.DELAY_UPDATE_PROFILE_PICTURE * 1000 -
		// 			(new Date().getTime() - new Date(data['lastPictureUpdate'].date).getTime());

		// 		if (diff > 0) this.timeLeft = new Date(new Date().getTime() + diff);
		// 		if (!this.isOwner || this.perms.hasPermission('CAN_EDIT_USER')) this.timeLeft = undefined;
		// 	});
	}

	public open() {
		// Only the user can update his picture (or an admin)
		if (!this.isOwner && !this.perms.hasPermission('CAN_EDIT_USER')) return;

		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
	}

	public get isOwner(): boolean {
		return this.userId === this.u.id;
	}

	public get hasPermissions(): boolean {
		return this.perms.hasPermission('CAN_EDIT_USER');
	}

	public updateUncroppedPicture(file: base64) {
		this.pictureUncropped = file;
	}

	public async updateCroppedPicture(event: unknown) {
		//ImageCropperResult) {
		// this.pictureCropped = event;
		// if (this.pictureCropped.dataUrl) this.pictureUpdated.emit(this.pictureCropped.dataUrl);
		// const res: Response = await fetch(this.pictureCropped.dataUrl ?? '');
		// const blob: Blob = await res.blob();
		// const file = new File([blob], 'profile_picture.png', { type: 'image/png' });
		// const formData = new FormData();
		// formData.append('file', file, file.name);
		// this.http
		// 	.post(`${environment.API_URL}/users/picture/${this.activeRoute.snapshot.params['id']}`, formData, {
		// 		headers: DEFAULT_HEADERS,
		// 	})
		// 	.subscribe({
		// 		next: () => {
		// 			if (!this.isOwner) return;
		// 			setTimeout(() => {
		// 				this.u.refreshUserPicture();
		// 			}, 1000);
		// 		},
		// 	});
	}

	public deleteCurrentPicture() {
		// this.http
		// 	.delete(`${environment.API_URL}/users/picture/${this.activeRoute.snapshot.params['id']}`, {
		// 		headers: DEFAULT_HEADERS,
		// 	})
		// 	.subscribe({
		// 		next: () => {
		// 			this.pictureUpdated.emit(undefined);
		// 			if (this.isOwner) this.u.refreshUserPicture();
		// 		},
		// 	});
	}
}
