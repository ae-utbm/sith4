import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

import { SideMenuComponent } from '../side_menu.component';

@Component({
	selector: 'sith-side-menu-profile',
	templateUrl: './side_profile.html',
	styleUrls: ['./side_profile.scss'],
})
export class SideMenuProfileComponent {
	public constructor(
		@Inject(UserService) public readonly user: UserService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(Router) public readonly router: Router,
		private readonly sideMenu: SideMenuComponent,
	) {}

	public logout(event?: KeyboardEvent): void {
		if (event && event.key !== 'Enter') return;

		this.sideMenu.triggerClose();
		this.user.logout();
	}

	public async goto(page: string, event?: KeyboardEvent) {
		if (event && event.key !== 'Enter') return;

		this.sideMenu.triggerClose();
		await this.router.navigate(['users', this.user.id, page]);
	}
}
