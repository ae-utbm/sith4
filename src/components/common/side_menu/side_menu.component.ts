import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-side-menu',
	templateUrl: './side_menu.html',
	styleUrls: ['./side_menu.scss'],
})
export class SideMenuComponent {
	public constructor(@Inject(PageService) public readonly page: PageService) {}

	@Output() public sideMenuClose = new EventEmitter<void>();
	private _closing = false;

	public triggerClose(event?: KeyboardEvent): void {
		if (event && event.key !== 'Escape') return;

		this._closing = true;

		setTimeout(() => {
			this.sideMenuClose.emit();
			this._closing = false;
		}, 500);
	}

	public get closing(): boolean {
		return this._closing;
	}
}
