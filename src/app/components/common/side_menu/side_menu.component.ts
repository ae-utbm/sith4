import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side_menu.html',
	styleUrls: ['./side_menu.scss'],
})
export class SideMenuComponent {
	private _closing = false;
	@Output() public close = new EventEmitter<void>();

	public constructor(@Inject(PageService) public readonly p: PageService) {}

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
}
