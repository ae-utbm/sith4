import { Component } from '@angular/core';
import { Alert } from 'src/types';

@Component({
	selector: 'app-mobile-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class MobileAlertComponent {
	public alerts: Array<Alert> = [];

	public filterClosedAlerts(): void {
		this.alerts = this.alerts.filter((alert) => this.isAlertVisible(alert));
	}

	public closeAlert(alert: Alert): void {
		const alerts = JSON.parse(localStorage.getItem('alerts') ?? '{}');
		alerts[alert.id] = false;
		localStorage.setItem('alerts', JSON.stringify(alerts));

		setTimeout(() => {
			this.filterClosedAlerts();
		}, 500);
	}

	public isAlertVisible(alert: Alert): boolean {
		const alerts = JSON.parse(localStorage.getItem('alerts') ?? '{}');
		return alerts[alert.id] ?? true;
	}

	public ngOnInit(): void {
		// todo: API call to get alerts to display
		this.alerts = [
			{
				title: 'Alert title',
				message: 'Alert message',
				id: 'alert-id',
			},
			{
				title: 'Alert title',
				message: 'Alert message',
				id: 'alert-id2',
			},
		];

		this.filterClosedAlerts();
	}
}
