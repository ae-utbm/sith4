import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '@services/page.service';
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
		@Inject(UserService) public readonly u: UserService,
		@Inject(Router) public readonly router: Router,
		@Inject(PageService) public readonly page: PageService,
	) {}
	public async goto(path: string): Promise<void> {
		await this.router.navigate([path]);
	}

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
