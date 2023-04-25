import { Component, Inject } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/types';

@Component({
	selector: 'app-desktop-alert',
	templateUrl: './alert.html',
	styleUrls: ['./alert.scss'],
})
export class DesktopAlertComponent {
	public constructor(@Inject(AlertService) public readonly alerts: AlertService) {}

	public dismiss(alert: Alert): void {
		this.alerts.dismiss(alert, 400);
	}
}
