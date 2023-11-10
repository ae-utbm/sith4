import type { base64, imageURL } from '#types';
import type { ImageCropperResult } from 'types';

import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter, Input } from '@angular/core';

import { ImageCropperComponent } from '@components/common/image_cropper/image-cropper.component';
import { SnackbarService } from '@services/snackbar.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-user-profile-banner-edit-modal',
	templateUrl: './banner-edit-modal.html',
	styleUrls: ['./banner-edit-modal.scss'],
})
export class UserProfileBannerEditModalComponent implements OnInit {
	public constructor(
		@Inject(UserService) private readonly userService: UserService,
		@Inject(SnackbarService) private readonly snackbarService: SnackbarService,
	) {
		if (this.userBannerId)
			this.userService.userFileData(this.userBannerId).subscribe({
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
	@Input() public userBanner?: base64 | imageURL;
	@Input() public userBannerId?: number;
	@Input() public userCanEdit = false;
	@Input() public userCanReadPrivate = false;

	@Input() public self = false;

	@Output() public bannerUpdated = new EventEmitter<base64>();

	@ViewChild('banner', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public cropper!: ImageCropperComponent;

	public bannerUncropped?: base64;
	public bannerCropped?: ImageCropperResult;

	public readonly options: Cropper.Options = {
		aspectRatio: 3,
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

	public updateUncroppedBanner(file: base64) {
		this.bannerUncropped = file;
	}

	public async updateCroppedBanner(event: unknown) {
		this.bannerCropped = event as ImageCropperResult;
		if (!this.bannerCropped.dataUrl) return;

		const dataUrl: base64 = this.bannerCropped.dataUrl;
		const res: Response = await fetch(dataUrl);
		const blob: Blob = await res.blob();
		const file = new File([blob], 'profile_picture.png', { type: 'image/png' });

		const formData = new FormData();
		formData.append('file', file, file.name);

		this.userService.updateUserBanner(this.userId ?? 0, formData).subscribe({
			next: (data) => {
				console.warn(data);
				this.bannerUpdated.emit(dataUrl);
			},
			error: (err) => {
				console.error(err);
			},
		});
	}

	public deleteCurrentBanner() {
		this.userService.deleteUserBanner(this.userId ?? 0).subscribe({
			next: (data) => {
				this.bannerUpdated.emit();
				this.snackbarService.success(data.message, 'Success');
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
}
