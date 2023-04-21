import { Component, Inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { getThemeEvent } from 'src/utils';

@Component({
	selector: 'app-desktop-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class DesktopHeaderComponent {
	public profileOpened = false;
	public optionsOpened = false;
	public connectionOpened = false;

	public constructor(
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
	) {}

	public triggerSideMenuProfile(): void {
		this.profileOpened = !this.profileOpened;
	}

	public triggerSideMenuConnection(): void {
		this.connectionOpened = !this.connectionOpened;
	}

	public triggerSideMenuOptions(): void {
		this.optionsOpened = !this.optionsOpened;
	}

	public get logo(): string {
		switch (getThemeEvent()) {
			case 'christmas':
				return 'assets/logo_ae_christmas.webp';
			case 'pinktober':
				return 'assets/logo_ae_pinktober.webp';
			default:
				return 'assets/logo_ae.webp';
		}
	}
}
