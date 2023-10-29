import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '@services/page.service';

import { SideMenuComponent } from '../side_menu.component';

@Component({
	selector: 'sith-side-menu-disconnected',
	templateUrl: './side_disconnected.html',
	styleUrls: ['./side_disconnected.scss'],
})
export class SideMenuDisconnectedComponent {
	public constructor(
		@Inject(PageService) public readonly page: PageService,
		@Inject(Router) public readonly router: Router,
		private readonly sideMenu: SideMenuComponent,
	) {}

	public async goto(page: string, event?: KeyboardEvent) {
		if (event && event.key !== 'Enter') return;

		this.sideMenu.triggerClose();
		await this.router.navigate([page]);
	}
}
