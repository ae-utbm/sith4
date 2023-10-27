import { Component, Inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'sith-side-menu-disconnected',
	templateUrl: './side_disconnected.html',
	styleUrls: ['./side_disconnected.scss'],
})
export class SideMenuDisconnectedComponent {
	public constructor(@Inject(PageService) public readonly page: PageService) {}
}
