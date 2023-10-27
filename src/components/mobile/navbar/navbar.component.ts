import { Component, Inject } from '@angular/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-mobile-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class MobileNavbarComponent {
	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly page: PageService,
	) {}
}
