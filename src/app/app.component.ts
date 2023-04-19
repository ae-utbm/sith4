import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, getLanguageDirection } from 'src/utils';
import { getTheme, setTheme, watchAutoTheme } from 'src/utils/theme';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [],
})
export class AppComponent implements OnInit {
	public title = 'sith4';

	public constructor(
		@Inject(TranslateService) public readonly translate: TranslateService,
		@Inject(DOCUMENT) public readonly document: Document,
	) {}

	public ngOnInit(): void {
		this.detectLanguage();
		this.detectTheme();
	}

	/**
	 * Detects the language of the browser and sets it as current language.
	 * If the language is not supported, it will be set to English.
	 */
	public detectLanguage(): void {
		this.translate.setDefaultLang('en-US');
		const lang = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);

		this.document.documentElement.lang = lang;
		this.document.documentElement.dir = getLanguageDirection(lang);
		this.translate.use(lang);
		this.translate.currentLang = lang; // because ngx-translate doesn't set it automatically
		localStorage.setItem('lang', lang);
	}

	public detectTheme(): void {
		watchAutoTheme();
		setTheme(getTheme());
	}
}
