import { Component } from '@angular/core';
import { ThemeEvent, getThemeEvent } from 'src/utils';

@Component({
	selector: 'app-mobile-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class MobileHeaderComponent {
	public profilOpened = false;
	public optionsOpened = false;

	public triggerSideMenuProfil(): void {
		this.profilOpened = !this.profilOpened;
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
