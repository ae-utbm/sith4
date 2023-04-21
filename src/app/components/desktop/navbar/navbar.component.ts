import { Component, Inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-desktop-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class DesktopNavbarComponent {
	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
	) {}
}
