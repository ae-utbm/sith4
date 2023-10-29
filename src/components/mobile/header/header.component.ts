import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-mobile-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class MobileHeaderComponent {
	public profileOpened = false;
	public optionsOpened = false;
	public connectionOpened = false;

	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(Router) private readonly router: Router,
		@Inject(PageService) public readonly page: PageService,
	) {}

	public triggerSideMenuProfile(): void {
		this.profileOpened = !this.profileOpened;
	}

	public triggerSideMenuConnection(): void {
		this.connectionOpened = !this.connectionOpened;
	}

	public triggerSideMenuOptions(): void {
		this.optionsOpened = !this.optionsOpened;
	}

	public async goto(path: string): Promise<void> {
		await this.router.navigate([path]);
	}
}
