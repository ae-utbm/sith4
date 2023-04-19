import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Theme, getTheme, setTheme } from 'src/utils/theme';

export interface ITheme {
	name: string;
	value: Theme;
}

@Component({
	selector: 'app-mobile-theme-selector',
	templateUrl: './theme_selector.html',
	styleUrls: ['./theme_selector.scss'],
})
export class MobileThemeSelectorComponent {
	public themes: ITheme[] = [
		{ name: 'navbar.options.theme.light', value: 'light' },
		{ name: 'navbar.options.theme.dark', value: 'dark' },
		{ name: 'navbar.options.theme.auto', value: 'auto' },
		{ name: 'navbar.options.theme.high_contrast', value: 'high_contrast' },
	];

	public constructor(@Inject(TranslateService) public readonly translate: TranslateService) {}

	public ngOnInit(): void {
		this.themes.forEach((theme) => {
			this.translate.get(theme.name).subscribe((name) => (theme.name = name));
		});
	}

	public set theme(theme: Theme) {
		setTheme(theme);
	}

	public get theme(): Theme {
		return getTheme();
	}
}
