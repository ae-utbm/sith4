import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-subtitle',
	templateUrl: './subtitle.html',
	styleUrls: ['./subtitle.scss'],
})
export class SubtitleComponent {
	@Input() text = '';
	@Input() bordered = false;
	@Input() onDarkBackground = false;
}
