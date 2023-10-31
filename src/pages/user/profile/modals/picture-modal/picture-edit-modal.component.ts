import type { base64, imageURL } from '#types';
import type { ImageCropperResult } from '#types/sith';

import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter, Input } from '@angular/core';

import { ImageCropperComponent } from '@components/common/image_cropper/image-cropper.component';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-user-profile-picture-edit-modal',
	templateUrl: './picture-edit-modal.html',
	styleUrls: ['./picture-edit-modal.scss'],
})
export class UserProfilePictureEditModalComponent implements OnInit {
	public constructor(@Inject(UserService) private readonly userService: UserService) {
		this.userService.userPictureData(this.userPictureId ?? 0).subscribe({
			next: (data) => {
				console.log(data);
			},
			error: (err) => {
				console.error(err);
			},
		});
	}

	@Input() public username?: string;
	@Input() public userPicture?: base64 | imageURL;
	@Input() public userPictureId?: number;
	@Input() public userCanEdit = false;
	@Input() public userCanReadPrivate = false;

	@Input() public self = false;

	@Output() public pictureUpdated = new EventEmitter<base64>();

	@ViewChild('picture', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public cropper!: ImageCropperComponent;

	public pictureUncropped?: base64;
	public pictureCropped?: ImageCropperResult;

	public readonly options: Cropper.Options = {
		aspectRatio: 1,
		rotatable: true,
		zoomable: true,
		scalable: true,
	};

	public timeLeft?: Date;
	public pageUserId?: number;

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
		// if (!this.isOwner && !this.perms.hasPermissions(this.u.logged_user_id, ['CAN_EDIT_USER'])) return;

		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
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
