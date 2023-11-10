import { Component, Inject } from '@angular/core';

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
		private readonly sideMenu: SideMenuComponent,
	) {}

	public to(page: string) {
		this.sideMenu.triggerClose();
		this.page.to(page);
	}
}
