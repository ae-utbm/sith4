import type { base64, imageURL } from '#types';
import type { OutputUserDto } from '#types/api';

import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '@services/page.service';
import { PermissionService } from '@services/permissions.service';
import { UserService } from '@services/user.service';

import { UserProfileBannerEditModalComponent } from './modals/banner-modal/banner-edit-modal.component';
import { UserProfileInfosEditModalComponent } from './modals/infos-modal/infos-edit-modal.component';
import { UserProfilePictureEditModalComponent } from './modals/picture-modal/picture-edit-modal.component';

@Component({
	selector: 'sith-user-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
})
export class UserProfileComponent {
	public constructor(
		@Inject(PageService) public readonly page: PageService,
		@Inject(UserService) public readonly userService: UserService,
		@Inject(ActivatedRoute) private readonly activeRoute: ActivatedRoute,
		@Inject(PermissionService) public readonly permsService: PermissionService,
	) {
		this.activeRoute.params.subscribe((params) => {
			const { id } = params;
			this.pageUserId = parseInt(id as string, 10);

			this.permsService
				.hasPermissions(this.userService.logged_user_id, ['CAN_EDIT_USER', 'CAN_READ_USER_PRIVATE'])
				.subscribe({
					next: (perms) => {
						this.userCanEdit = perms.CAN_EDIT_USER;
						this.userCanReadPrivate = perms.CAN_READ_USER_PRIVATE;

						this.userService.user(this.pageUserId, perms.CAN_READ_USER_PRIVATE).subscribe({
							next: (user) => {
								this.user = user;
							},
							error: (err) => {
								console.error(err);
							},
						});

						this.userService.userPicture(this.pageUserId).subscribe({
							next: (picture) => {
								this.userPicture = picture;
							},
							error: (err) => {
								console.error(err);
							},
						});

						this.userService.userBanner(this.pageUserId).subscribe({
							next: (banner) => {
								this.userBanner = banner;
							},
							error: (err) => {
								console.error(err);
							},
						});
					},
					error: () => ({}), // silently fail (default values are false)
				});
		});
	}

	@ViewChild('infosModal') public infosModal!: UserProfileInfosEditModalComponent;
	@ViewChild('bannerModal') public bannerModal!: UserProfileBannerEditModalComponent;
	@ViewChild('pictureModal') public pictureModal!: UserProfilePictureEditModalComponent;

	openModal(modal: 'infos' | 'banner' | 'picture'): void {
		switch (modal) {
			case 'infos':
				this.infosModal.open();
				break;
			case 'banner':
				this.bannerModal.open();
				break;
			case 'picture':
				this.pictureModal.open();
				break;
		}
	}

	private pageUserId = 0;

	public user?: OutputUserDto;
	public userPicture?: base64 | imageURL;
	public userBanner?: base64 | imageURL;

	public userCanEdit = false;
	public userCanReadPrivate = false;

	public currentTab: 'about' | 'contact' = 'about';

	public canEditPage(): boolean {
		return this.isOwner() || this.userCanEdit;
	}

	public isOwner(): boolean {
		return this.userService.logged_user_id === this.pageUserId;
	}
}
