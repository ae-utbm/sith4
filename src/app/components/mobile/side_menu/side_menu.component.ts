import { Component, EventEmitter, Output } from '@angular/core';
import { isRTL } from 'src/utils';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side_menu.html',
	styleUrls: ['./side_menu.scss'],
})
export class MobileSideMenuComponent {
	private _closing = false;

	@Output() public close = new EventEmitter();

	public triggerClose(): void {
		this._closing = true;

		setTimeout(() => {
			this._closing = false;
			this.close.emit();
		}, 500);
	}

	public get closing(): boolean {
		return this._closing;
	}

	public get isRTL(): boolean {
		return isRTL();
	}
}
