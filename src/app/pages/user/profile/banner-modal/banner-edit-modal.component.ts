import type { ImageCropperResult, base64 } from 'src/types';

import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { ImageCropperComponent } from 'src/app/components/common/image_cropper/image-cropper.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_HEADERS } from 'src/utils/http';
import { UserPermissionService } from 'src/app/services/user-permissions.service';

@Component({
	selector: 'app-user-profile-banner-edit-modal',
	templateUrl: './banner-edit-modal.html',
	styleUrls: ['./banner-edit-modal.scss'],
})
export class UserProfileBannerEditModalComponent implements OnInit {
	@ViewChild('banner', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public cropper!: ImageCropperComponent;

	public bannerUncropped?: base64;
	public bannerCropped?: ImageCropperResult;

	private userId = 0;

	@Input() public username = '';
	@Input() public existingBanner = false;
	@Output() public bannerUpdated = new EventEmitter<base64>();

	public readonly options: Cropper.Options = {
		aspectRatio: 3,
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
			this.userId = parseInt(params['id'], 10);
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

	public open() {
		// Only the user can update his picture
		if (!this.isSelf() && !this.perms.hasPermission('EDIT_USER')) return;

		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
	}

	public isSelf() {
		return this.userId === this.u.id;
	}

	public updateUncroppedBanner(file: base64) {
		this.bannerUncropped = file;
	}

	public async deleteCurrentBanner() {
		this.http
			.delete(`${environment.API_URL}/users/banner/${this.activeRoute.snapshot.params['id']}`, {
				headers: DEFAULT_HEADERS,
			})
			.subscribe({
				next: () => {
					this.bannerUpdated.emit(undefined);
					if (this.isSelf()) this.u.refreshUserBanner();
				},
			});
	}

	public async updateCroppedBanner(event: ImageCropperResult) {
		this.bannerCropped = event;
		if (this.bannerCropped.dataUrl) this.bannerUpdated.emit(this.bannerCropped.dataUrl);

		const res: Response = await fetch(this.bannerCropped.dataUrl ?? '');
		const blob: Blob = await res.blob();
		const file = new File([blob], 'profile_picture.png', { type: 'image/png' });

		const formData = new FormData();
		formData.append('file', file, file.name);

		this.http
			.post(`${environment.API_URL}/users/banner/${this.activeRoute.snapshot.params['id']}`, formData, {
				headers: DEFAULT_HEADERS,
			})
			.subscribe({
				next: () => {
					if (!this.isSelf()) return;

					setTimeout(() => {
						this.u.refreshUserBanner();
					}, 1000);
				},
			});
	}
}
