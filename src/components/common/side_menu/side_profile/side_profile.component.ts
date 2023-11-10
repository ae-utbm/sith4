import type { imageURL } from '#types';
import type { OutputErrorResponseDto, OutputUserDto } from '#types/api';

import { Component, Inject } from '@angular/core';

import { ApiError } from '@services/api.service';
import { PageService } from '@services/page.service';
import { SnackbarService } from '@services/snackbar.service';
import { UserService } from '@services/user.service';

import { SideMenuComponent } from '../side_menu.component';

@Component({
	selector: 'sith-side-menu-profile',
	templateUrl: './side_profile.html',
	styleUrls: ['./side_profile.scss'],
})
export class SideMenuProfileComponent {
	public constructor(
		@Inject(UserService) public readonly userService: UserService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(SnackbarService) public readonly snackbar: SnackbarService,
		@Inject(SideMenuComponent) private readonly sideMenu: SideMenuComponent,
	) {
		if (this.userService.isLoggedIn()) {
			this.userService.user(this.userService.logged_user_id).subscribe({
				next: (user) => (this.user = user),
				error: (e: ApiError<OutputErrorResponseDto>) => {
					console.warn(e);
					this.snackbar.error(e.error.message, e.error.errors, e.error.statusCode);
				},
			});

			this.userService.userPicture(this.userService.logged_user_id).subscribe({
				next: (picture) => (this.userPicture = picture),
				error: (e: ApiError<OutputErrorResponseDto>) => {
					console.error(e);
					this.snackbar.error(e.error.message, e.error.errors, e.error.statusCode);
				},
			});

			this.userService.userBanner(this.userService.logged_user_id).subscribe({
				next: (banner) => (this.userBanner = banner),
				error: (e: ApiError<OutputErrorResponseDto>) => {
					console.error(e);
					this.snackbar.error(e.error.message, e.error.errors, e.error.statusCode);
				},
			});
		}
	}

	public user?: OutputUserDto;
	public userPicture?: imageURL;
	public userBanner?: imageURL;

	public logout(): void {
		this.sideMenu.triggerClose();
		this.userService.logout().subscribe({
			next: () => this.page.to(['home']),
		});
	}

	public to(page: string) {
		this.sideMenu.triggerClose();
		this.page.to(['users', `${this.userService.logged_user_id}`, page]);
	}
}
