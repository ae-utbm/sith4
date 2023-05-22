import { Component, Inject, Input } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'sith-mobile-subtitle',
	templateUrl: './subtitle.html',
	styleUrls: ['./subtitle.scss'],
})
export class MobileSubtitleComponent {
	@Input() public text = '';
	@Input() public bordered = false;
	@Input() public onDarkBackground = false;

	public constructor(@Inject(PageService) public readonly page: PageService) {}
}
