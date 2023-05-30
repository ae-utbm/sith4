import { Component, Input } from '@angular/core';

@Component({
	selector: 'icon-eye',
	templateUrl: './eye.svg',
	styleUrls: ['../icons.scss'],
})
export class IconEyeComponent {
	@Input() public visible = true;
}
