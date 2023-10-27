import { Component, Inject, Input } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-subtitle',
	templateUrl: './subtitle.html',
	styleUrls: ['./subtitle.scss'],
})
export class SubtitleComponent {
	@Input() public text = '';
	@Input() public bordered = false;
	@Input() public onDarkBackground = false;

	public constructor(@Inject(PageService) public readonly page: PageService) {}
}
