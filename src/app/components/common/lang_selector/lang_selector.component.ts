import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, getLanguageCompletion, getLanguageDirection, LANGUAGES } from 'src/utils';
import { ISelectOption } from '../select/select.component';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-lang-selector',
	templateUrl: './lang_selector.html',
	styleUrls: ['./lang_selector.scss'],
})
export class LangSelectorComponent {
	public lang: string = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);

	public langs: ISelectOption[] = LANGUAGES.map((lang) => ({
		value: lang.filename,
		label: lang.label,
		image: lang.image,
	}));

	public langsCompletion: Array<[string, Observable<number>]> = this.langs.map((lang) => [
		lang.label,
		getLanguageCompletion(lang.value),
	]);

	public constructor(@Inject(TranslateService) private readonly translate: TranslateService) {
		this.langsCompletion.forEach(([lang, completion$]) => {
			completion$.subscribe((completion) => {
				const found: ISelectOption | undefined = this.langs.find((l) => l.label === lang);
				if (found) found.label = `${lang} (${completion}%)`;
			});
		});
	}

	/**
	 * Select a language and redirect to the same page
	 * @param {string} lang The language to select
	 */
	public selectLangage(lang: string): void {
		this.lang = getLanguage(lang);
		document.documentElement.lang = this.lang;
		document.documentElement.dir = getLanguageDirection(lang);
		this.translate.use(this.lang);
		this.translate.currentLang = this.lang; // because ngx-translate doesn't set it automatically
		localStorage.setItem('lang', this.lang);
	}

	/**
	 * Get the stored language within the local storage or the browser language if not found
	 * @returns {ISelectOption} The found language or the default one (English)
	 */
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
				image: 'assets/flags/en-GB.svg',
			}
		);
	}
}
