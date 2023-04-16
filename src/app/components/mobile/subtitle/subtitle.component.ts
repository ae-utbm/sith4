import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-mobile-subtitle',
	templateUrl: './subtitle.html',
	styleUrls: ['./subtitle.scss'],
})
export class MobileSubtitleComponent {
	@Input() public text = '';
	@Input() public bordered = false;
	@Input() public onDarkBackground = false;

	// detect if the text is ltr or rtl
	public isRTL(): boolean {
		return document.documentElement.dir === 'rtl';
	}
}
