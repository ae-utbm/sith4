import { Component, Inject } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-user-profile-desktop',
	templateUrl: './profile-desktop.html',
	styleUrls: ['./profile-desktop.scss'],
})
export class UserProfileDesktopComponent {
	public constructor(@Inject(PageService) public readonly page: PageService) {}
}
