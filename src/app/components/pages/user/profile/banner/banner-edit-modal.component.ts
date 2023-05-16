import type { ImageCropperResult, base64 } from 'src/types';

import { OnInit, ViewChild, ElementRef, Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { ImageCropperComponent } from 'src/app/components/common/image_cropper/image-cropper.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-profile-banner-edit-modal',
	templateUrl: './banner-edit-modal.html',
	styleUrls: ['./banner-edit-modal.scss'],
})
export class UserProfileBannerEditModalComponent implements OnInit {
	@ViewChild('banner', { static: true }) public modal!: ElementRef<HTMLDialogElement>;
	@ViewChild(ImageCropperComponent, { static: false }) public cropper!: ImageCropperComponent;

	@Input() public existingBanner = false;

	public bannerUncropped?: base64;
	public bannerCropped?: ImageCropperResult;

	private userId = 0;

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
		// TODO: take into account the user's role ("admin" can update any user's picture)
		if (this.userId !== this.u.user?.id) return;

		this.modal.nativeElement.showModal();
	}

	public close() {
		this.modal.nativeElement.close();
	}

	public updateUncroppedBanner(file: base64) {
		this.bannerUncropped = file;
	}

	public async deleteCurrentBanner() {
		this.http
			.delete(`${environment.API_URL}/users/banner/${this.activeRoute.snapshot.params['id']}`, {
				headers: {
					Authorization: `${sessionStorage.getItem('token')}`,
					'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
				},
			})
			.subscribe({
				next: () => {
					this.bannerUpdated.emit(undefined);
					this.u.refreshUserBanner();
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
				headers: {
					Authorization: `${sessionStorage.getItem('token')}`,
					'Accept-Language': localStorage.getItem('lang') ?? 'en-US',
				},
			})
			.subscribe({
				next: () => {
					if (this.userId !== this.u.user?.id) return;

					setTimeout(() => {
						this.u.refreshUserBanner();
					}, 1000);
				},
			});
	}
}
