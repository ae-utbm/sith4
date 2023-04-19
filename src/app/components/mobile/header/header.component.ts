import { Component } from '@angular/core';

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
}
