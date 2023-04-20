import { Component } from '@angular/core';
import { getThemeEvent } from 'src/utils';

@Component({
	selector: 'app-desktop-header',
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class DesktopHeaderComponent {
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
