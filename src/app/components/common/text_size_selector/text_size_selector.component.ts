import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { FontSize } from 'src/types';

@Component({
	selector: 'app-text-size-selector',
	templateUrl: './text_size_selector.html',
	styleUrls: ['./text_size_selector.scss'],
})
export class FontSizeSelectorComponent {
	public readonly sizes: Array<{ class: string; label: string; value: FontSize }> = [
		{ class: 'small', label: 'header.options.font_size.small', value: '50' },
		{ class: 'medium', label: 'header.options.font_size.medium', value: '100' },
		{ class: 'large', label: 'header.options.font_size.large', value: '150' },
	];

	public constructor(
		@Inject(PageService) public readonly p: PageService,
		@Inject(TranslateService) public readonly t: TranslateService,
	) {
		this.sizes.forEach((size) => {
			t.get(size.label).subscribe((label) => (size.label = label));
		});
	}
}
