import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from 'src/utils';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'sith4';

	constructor(
		@Inject(TranslateService) private readonly translate: TranslateService,
		@Inject(DOCUMENT) private readonly document: Document,
	) {}

	ngOnInit(): void {
		this.detectLanguage();
	}

	/**
	 * Detects the language of the browser and sets it as current language.
	 * If the language is not supported, it will be set to English.
	 */
	detectLanguage(): void {
		this.translate.setDefaultLang('en-US');
		const lang = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);

		this.document.documentElement.lang = lang;
		this.translate.use(lang);
		localStorage.setItem('lang', lang);
	}
}
