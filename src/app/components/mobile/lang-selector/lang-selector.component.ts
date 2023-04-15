import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, LANGUAGES } from 'src/utils';
import { ISelectOption } from '../../common/select/select.component';

@Component({
	selector: 'app-mobile-lang-selector',
	templateUrl: './lang-selector.html',
	styleUrls: ['./lang-selector.scss'],
})
export class MobileLangSelectorComponent {
	lang: string = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);
	langs: ISelectOption[] = LANGUAGES.map((lang) => ({
		value: lang.filename,
		label: lang.label,
		image: lang.image,
	}));

	constructor(
		@Inject(TranslateService) private readonly translate: TranslateService,
		@Inject(DOCUMENT) private document: Document,
	) {}

	/**
	 * Select a language and redirect to the same page
	 * @param {string} lang
	 */
	public selectLangage(lang: string): void {
		this.lang = getLanguage(lang);
		this.document.documentElement.lang = this.lang;
		this.translate.use(this.lang);
		localStorage.setItem('lang', this.lang);
	}

	public getLang(): ISelectOption {
		const code: string = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);
		return (
			LANGUAGES.map((lang) => ({
				label: lang.label,
				value: lang.filename,
				image: lang.image,
			})).find((lang) => lang.value === code) ?? {
				label: 'English',
				value: 'en-US',
				image: 'assets/icons/flags/gb.svg',
			}
		);
	}
}
