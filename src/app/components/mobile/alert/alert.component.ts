import { Component } from '@angular/core';

@Component({
	selector: 'app-mobile-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class MobileAlertComponent {
	public isAlertVisible = false;

	public closeAlert(): void {
		this.isAlertVisible = !this.isAlertVisible;
	}
}
