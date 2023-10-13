import { Component, Input } from '@angular/core';
import { isRTL } from 'src/utils/document';

@Component({
	selector: 'sith-mobile-subtitle',
	templateUrl: './subtitle.html',
	styleUrls: ['./subtitle.scss'],
})
export class MobileSubtitleComponent {
	@Input() public text = '';
	@Input() public bordered = false;
	@Input() public onDarkBackground = false;

	public get isRTL(): boolean {
		return isRTL();
	}
}
