import { Component, Inject, OnInit } from '@angular/core';

import { SnackbarService } from '@services/snackbar.service';

@Component({
	selector: 'sith-snackbar',
	templateUrl: './snackbar.html',
	styleUrls: ['./snackbar.scss'],
})
export class SnackbarComponent implements OnInit {
	public constructor(@Inject(SnackbarService) private readonly snackbarService: SnackbarService) {}

	public shown = false;
	public message = '';
	public type: 'success' | 'error' = 'success';
	public title = '';
	public hiding = false;

	ngOnInit() {
		this.snackbarService.registerSnackbarComponent(this);
	}

	public show(message: string, title: string, type: 'success' | 'error' = 'success'): void {
		this.message = message;
		this.type = type;
		this.shown = true;
		this.title = title;
		this.hiding = true;

		setTimeout(() => {
			this.hide();
		}, 3000);
	}

	public hide(event?: KeyboardEvent) {
		if (event && event.key !== 'Enter') return;

		this.shown = false;
		this.hiding = false;
	}
}
