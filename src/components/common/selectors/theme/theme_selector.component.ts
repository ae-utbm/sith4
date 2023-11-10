import type { Theme, ThemeEvent } from 'types';

import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

type ThemeSelector<T> = {
	index: number;
	name: string;
	value: T;
};

@Component({
	selector: 'sith-theme-selector',
	templateUrl: './theme_selector.html',
	styleUrls: ['./theme_selector.scss'],
})
export class ThemeSelectorComponent {
	public themes: ThemeSelector<Theme>[] = [
		{ index: 1, name: 'header.options.themes.auto', value: 'auto' },
		{ index: 2, name: 'header.options.themes.light', value: 'light' },
		{ index: 3, name: 'header.options.themes.dark', value: 'dark' },
		{ index: 4, name: 'header.options.themes.high_contrast', value: 'high_contrast' },
	];

	public themes_event: ThemeSelector<ThemeEvent['theme']>[] = [];

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly page: PageService,
	) {
		switch (new Date().getMonth()) {
			case 11:
				this.themes_event.push({ index: 1, name: 'header.options.themes_event.christmas', value: 'christmas' });
				break;
			case 9:
				this.themes_event.push({ index: 1, name: 'header.options.themes_event.pinktober', value: 'pinktober' });
				break;
			default:
				break;
		}
	}

	public updateTheme(theme: Theme): void {
		this.page.theme = theme;
	}

	public updateThemeEvent(theme: ThemeEvent['theme']): void {
		this.page.toggleThemeEvent(theme);
	}
}
