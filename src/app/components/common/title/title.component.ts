import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-title',
	templateUrl: './title.html',
	styleUrls: ['./title.scss'],
})
export class TitleComponent {
	@Input() public text = '';
	@Input() public onDarkBackground = false;
	@Input() public adaptColor = false;
	@Input() public isCentered = false;
}
