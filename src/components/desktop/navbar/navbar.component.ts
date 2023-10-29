import { Component, Inject } from '@angular/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-desktop-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class DesktopNavbarComponent {
	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly page: PageService,
	) {}
	public openFavorites() {
		window.alert('Not implemented yet');
	}
}
