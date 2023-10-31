import { Injectable } from '@angular/core';

import { SnackbarComponent } from '@components/common/snackbar/snackbar.component';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	private snackbarComponent: SnackbarComponent | undefined;

	registerSnackbarComponent(snackbarComponent: SnackbarComponent) {
		this.snackbarComponent = snackbarComponent;
	}

	private show(message: string, title: string, type?: 'error' | 'success') {
		if (this.snackbarComponent) this.snackbarComponent.show(message, title, type);
	}

	success(message: string, title: string) {
		this.show(message, title, 'success');
	}

	error(message = 'Error', title: string, status_code: number) {
		this.show(message, `${status_code}: ${title}`, 'error');
	}
}
