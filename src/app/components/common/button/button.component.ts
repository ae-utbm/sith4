import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() public text = '';
	@Input() public height: 'medium' | 'large' | 'small' = 'medium';
	@Input() public disabled = false;
	@Input() public aspect: 'normal' | 'danger' = 'normal';
}
