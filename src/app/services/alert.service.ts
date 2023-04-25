import { Injectable } from '@angular/core';
import { Alert } from 'src/types';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private alerts: Array<Alert> = [];

	public get all(): Array<Alert> {
		return this.alerts;
	}

	/**
	 * Dismisses an alert.
	 * If timeout is set, the alert will be removed after the timeout.
	 * This allows for animations to finish before removing the alert.
	 * @param {Alert} alert the alert to dismiss
	 * @param {number} timeout the timeout in milliseconds (default: 0)
	 */
	// TODO: use API instead of localStorage
	public dismiss(alert: Alert, timeout = 0): void {
		const alerts = JSON.parse(localStorage.getItem('alerts') ?? '{}');
		alerts[alert.id] = false;
		localStorage.setItem('alerts', JSON.stringify(alerts));

		setTimeout(() => {
			this.removeDismissed();
		}, timeout);
	}

	/**
	 * Determines whether an alert is visible.
	 * @param {Alert} alert the alert to check
	 * @returns {boolean} true if the alert should be visible, false otherwise
	 */
	// TODO: use API instead of localStorage
	public isVisible(alert: Alert): boolean {
		const alerts = JSON.parse(localStorage.getItem('alerts') ?? '{}');
		return alerts[alert.id] ?? true;
	}

	/**
	 * Removes all dismissed alerts from the list of alerts.
	 */
	public removeDismissed(): void {
		this.alerts = this.alerts.filter((alert) => this.isVisible(alert));
	}

	/**
	 * Fetches alerts from the API.
	 */
	public constructor() {
		// TODO: use API instead
		this.alerts = [
			{
				title: 'Alert info',
				message: 'Info >>> others branches',
				type: 'info',
				id: 'alert-id',
			},
			{
				title: 'Alert warning',
				message: 'This is a warning message',
				id: 'alert-id2',
				type: 'warning',
			},
			{
				title: 'Alert danger',
				message: 'This is a very dangerous message',
				id: 'alert-id3',
				type: 'danger',
			},
		];

		this.removeDismissed();
	}
}
