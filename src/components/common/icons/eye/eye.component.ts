import { Component, Input } from '@angular/core';

@Component({
	selector: 'sith-icon-eye',
	templateUrl: './eye.svg',
	styleUrls: ['../icons.scss'],
})
export class IconEyeComponent {
	@Input() public open = true;
}
