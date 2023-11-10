import type { FontSize } from 'types';

import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-font-size-selector',
	templateUrl: './font_size_selector.html',
	styleUrls: ['./font_size_selector.scss'],
})
export class FontSizeSelectorComponent {
	public constructor(
		@Inject(PageService) public readonly page: PageService,
		@Inject(TranslateService) public readonly t: TranslateService,
	) {
		this.sizes.forEach((size) => {
			t.get(size.label).subscribe((label: string) => (size.label = label));
		});
	}

	public readonly sizes: Array<{ class: string; label: string; value: FontSize }> = [
		{ class: 'small', label: 'header.options.font_size.small', value: '0.75' },
		{ class: 'medium', label: 'header.options.font_size.medium', value: '1' },
		{ class: 'large', label: 'header.options.font_size.large', value: '1.25' },
	];
}
