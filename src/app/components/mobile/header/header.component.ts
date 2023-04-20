import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeEvent, getThemeEvent } from 'src/utils';

@Component({
	selector: 'app-mobile-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class MobileHeaderComponent {
	public profileOpened = false;
	public optionsOpened = false;
	public connectionOpened = false;
	public userLoggedIn = false;

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
		switch (this.eventTheme) {
			case 'christmas':
				return 'assets/logo_ae_christmas.webp';
			case 'pinktober':
				return 'assets/logo_ae_pinktober.webp';
			default:
				return 'assets/logo_ae.webp';
		}
	}

	public get eventTheme(): ThemeEvent | null {
		return getThemeEvent();
	}
}
