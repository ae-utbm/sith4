import { Component, Inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-mobile-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class MobileNavbarComponent {
	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly page: PageService,
	) {}
}
