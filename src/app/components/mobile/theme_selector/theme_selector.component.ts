import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Theme, ThemeEvent, getTheme, getThemeEvent, setTheme, setThemeEvent } from 'src/utils';

export interface ITheme<T> {
	name: string;
	value: T;
}

@Component({
	selector: 'app-mobile-theme-selector',
	templateUrl: './theme_selector.html',
	styleUrls: ['./theme_selector.scss'],
})
export class MobileThemeSelectorComponent {
	public themes: ITheme<Theme>[] = [
		{ name: 'header.options.themes.light', value: 'light' },
		{ name: 'header.options.themes.dark', value: 'dark' },
		{ name: 'header.options.themes.auto', value: 'auto' },
		{ name: 'header.options.themes.high_contrast', value: 'high_contrast' },
	];

	public eventThemes: ITheme<ThemeEvent>[] = [];

	public constructor(@Inject(TranslateService) public readonly translate: TranslateService) {
		const now = new Date();

		switch (now.getMonth()) {
			case 11:
				this.eventThemes.push({ name: 'header.options.event_themes.christmas', value: 'christmas' });
				if (this.eventTheme === null) this.eventTheme = 'christmas';
				break;
			case 9:
				this.eventThemes.push({ name: 'header.options.event_themes.pinktober', value: 'pinktober' });
				if (this.eventTheme === null) this.eventTheme = 'pinktober';
				break;
			default:
				this.eventTheme = null;
		}
	}

	public ngOnInit(): void {
		this.themes.forEach((theme) => {
			this.translate.get(theme.name).subscribe((name) => (theme.name = name));
		});
		this.eventThemes.forEach((theme) => {
			this.translate.get(theme.name).subscribe((name) => (theme.name = name));
		});
	}

	public set theme(theme: Theme) {
		setTheme(theme);
	}

	public get theme(): Theme {
		return getTheme();
	}

	public set eventTheme(theme: ThemeEvent | null) {
		setThemeEvent(this.eventTheme === theme ? 'unset' : theme);
	}

	public get eventTheme(): ThemeEvent | null {
		return getThemeEvent();
	}
}
