import type { imageURL } from '#types';
import type { ErrorResponseDto } from '#types/api';

import { Component, Inject } from '@angular/core';

import { ApiError } from '@services/api.service';
import { PageService } from '@services/page.service';
import { SnackbarService } from '@services/snackbar.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-desktop-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class DesktopHeaderComponent {
	public profileOpened = false;
	public optionsOpened = false;
	public connectionOpened = false;

	public constructor(
		@Inject(PageService) public readonly page: PageService,
		@Inject(UserService) public readonly userService: UserService,
		@Inject(SnackbarService) public readonly snackbar: SnackbarService,
	) {
		if (this.userService.isLoggedIn()) {
			this.userService.userPicture(this.userService.logged_user_id).subscribe({
				next: (picture) => (this.userPicture = picture),
				error: (err: ApiError<ErrorResponseDto>) => {
					console.error(err);
					this.snackbar.error(err.error.message, err.error.error, err.error.statusCode);
				},
			});
		}
	}

	public userPicture?: imageURL;

	public triggerSideMenuProfile(): void {
		this.profileOpened = !this.profileOpened;
	}

	public triggerSideMenuConnection(): void {
		this.connectionOpened = !this.connectionOpened;
	}

	public triggerSideMenuOptions(): void {
		this.optionsOpened = !this.optionsOpened;
	}
}
