import type { base64, imageURL } from '#types';
import type { ImageCropperResult } from 'types';

import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter, Input } from '@angular/core';

import { ImageCropperComponent } from '@components/common/image_cropper/image-cropper.component';
import { SnackbarService } from '@services/snackbar.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-user-profile-picture-edit-modal',
	templateUrl: './picture-edit-modal.html',
	styleUrls: ['./picture-edit-modal.scss'],
})
export class UserProfilePictureEditModalComponent implements OnInit {
	public constructor(
		@Inject(UserService) private readonly userService: UserService,
		@Inject(SnackbarService) private readonly snackbarService: SnackbarService,
	) {
		if (this.userPictureId)
			this.userService.userFileData(this.userPictureId).subscribe({
				next: (data) => {
					console.warn(data);
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	@Input() public username?: string;
	@Input() public userId?: number;
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

	public open() {
		// Only the user can update his picture (or an admin)
		if (!this.self && !this.userCanEdit) return;

		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
	}

	public updateUncroppedPicture(file: base64) {
		this.pictureUncropped = file;
	}

	public async updateCroppedPicture(event: unknown) {
		this.pictureCropped = event as ImageCropperResult;
		if (!this.pictureCropped.dataUrl) return;

		const dataUrl: base64 = this.pictureCropped.dataUrl;
		const res: Response = await fetch(dataUrl);
		const blob: Blob = await res.blob();
		const file = new File([blob], 'profile_picture.png', { type: 'image/png' });

		const formData = new FormData();
		formData.append('file', file, file.name);

		this.userService.updateUserPicture(this.userId ?? 0, formData).subscribe({
			next: (data) => {
				console.warn(data);
				this.pictureUpdated.emit(dataUrl);
			},
			error: (err) => {
				console.error(err);
			},
		});
	}

	public deleteCurrentPicture() {
		this.userService.deleteUserPicture(this.userId ?? 0).subscribe({
			next: (data) => {
				this.pictureUpdated.emit();
				this.snackbarService.success(data.message, 'Success');
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
}
