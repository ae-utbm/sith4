import { Component, Input } from '@angular/core';

@Component({
	selector: 'icon-user-icon',
	templateUrl: './user_icon.html',
	styleUrls: ['../icons.scss', './user_icon.scss'],
})
export class IconUserIconComponent {
	@Input() public url?: string;
	@Input() public notifications = 0;

	public hasPicture(): boolean {
		return this.url !== undefined && this.url !== null;
	}
}
