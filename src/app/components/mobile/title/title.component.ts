import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-mobile-title',
	templateUrl: './title.html',
	styleUrls: ['./title.scss'],
})
export class MobileTitleComponent {
	@Input() public text = '';
	@Input() public onDarkBackground = false;
	@Input() public isCentered = false;
}
