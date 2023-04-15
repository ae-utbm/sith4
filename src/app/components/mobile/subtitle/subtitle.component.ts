import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-mobile-subtitle',
	templateUrl: './subtitle.html',
	styleUrls: ['./subtitle.scss'],
})
export class MobileSubtitleComponent {
	@Input() text = '';
	@Input() bordered = false;
	@Input() onDarkBackground = false;
}
