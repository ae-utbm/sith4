import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-side-menu-profile',
	templateUrl: './side_profile.html',
	styleUrls: ['./side_profile.scss'],
})
export class SideMenuProfileComponent {
	public constructor(
		@Inject(UserService) public readonly user: UserService,
		@Inject(PageService) public readonly page: PageService,
	) {}

	@Output() public sideMenuProfileClose = new EventEmitter<void>();

	public logout(): void {
		this.sideMenuProfileClose.emit();
		this.user.logout();
	}

	public goto(route: 'profile' | 'payments' | 'pictures'): void {
		// this.page.route = `users/${this.user.id}${route === 'profile' ? '' : `/${route}`}`;
		this.sideMenuProfileClose.emit();
	}
}
