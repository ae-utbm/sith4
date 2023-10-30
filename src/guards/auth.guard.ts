import { Inject, Injectable } from '@angular/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Injectable()
export class AuthGuard {
	constructor(
		@Inject(PageService) private readonly page: PageService,
		@Inject(UserService) private readonly userService: UserService,
	) {}

	public isLoggedIn(): boolean {
		if (this.userService.isLoggedIn()) return true;

		this.page.to(['login']);
		return false;
	}

	public isLoggedOut(): boolean {
		if (!this.userService.isLoggedIn()) return true;

		this.page.to(['home']);
		return false;
	}
}
