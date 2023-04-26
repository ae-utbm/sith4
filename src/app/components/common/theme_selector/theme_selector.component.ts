import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { Theme, ThemeEvent, ThemeSelectorComponentTheme } from 'src/types';

@Component({
	selector: 'app-theme-selector',
	templateUrl: './theme_selector.html',
	styleUrls: ['./theme_selector.scss'],
})
export class ThemeSelectorComponent {
	public themes: ThemeSelectorComponentTheme<Theme>[] = [
		{ name: 'header.options.themes.light', value: 'light' },
		{ name: 'header.options.themes.dark', value: 'dark' },
		{ name: 'header.options.themes.auto', value: 'auto' },
		{ name: 'header.options.themes.high_contrast', value: 'high_contrast' },
	];

	public eventThemes: ThemeSelectorComponentTheme<ThemeEvent>[] = [];

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
	) {}

	public ngOnInit(): void {
		const now = new Date();

		switch (now.getMonth()) {
			case 11:
				this.eventThemes.push({ name: 'header.options.event_themes.christmas', value: 'christmas' });
				if (this.p.eventTheme !== 'christmas' && this.p.eventTheme !== null) this.p.eventTheme = 'christmas';
				break;
			case 9:
				this.eventThemes.push({ name: 'header.options.event_themes.pinktober', value: 'pinktober' });
				if (this.p.eventTheme !== 'pinktober' && this.p.eventTheme !== null) this.p.eventTheme = 'pinktober';
				break;
			default:
				this.p.eventTheme = 'base';
				break;
		}

		this.themes.forEach((theme) => {
			this.t.get(theme.name).subscribe((name) => (theme.name = name));
		});
		this.eventThemes.forEach((theme) => {
			this.t.get(theme.name).subscribe((name) => (theme.name = name));
		});
	}
}
