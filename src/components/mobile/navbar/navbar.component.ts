import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-mobile-navbar',
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.scss'],
})
export class MobileNavbarComponent {
	public constructor(
		@Inject(Router) private readonly router: Router,
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly page: PageService,
	) {}

	public async goto(path: string): Promise<void> {
		await this.router.navigate([path]);
	}
}
