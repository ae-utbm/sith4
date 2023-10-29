import type { LangFile, Language } from '#types/sith';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, catchError, forkJoin, from, map, of, switchMap } from 'rxjs';

import DEfAULT_LANG from '@assets/i18n/en-US.json';
import LANGS from '@assets/i18n/languages.json';

export const LANGUAGES: Language[] = LANGS as unknown as Language[];
export const DEFAULT_LANGUAGE = 'en-US';

/**
 * Get the language filename from the given language code
 * @param {string} lang language code to be analyzed
 * @returns {string} The filename of the language within the i18n asset folder
 *
 * @example getLanguage('en-US') // en-US.json
 * @example getLanguage('en') // en-US.json
 * @example getLanguage('does-not-exist') // en-US.json
 */
export function getLanguage(lang: string): string {
	const language = LANGUAGES.filter((l) => l.codes.includes(lang))[0];
	return language?.filename ?? DEFAULT_LANGUAGE;
}

/**
 * Get the read direction of the given language
 * @param {string} lang language code to be analyzed
 * @returns {Language['direction']} The read direction of the language
 */
export function getLanguageDirection(lang: string): Language['direction'] {
	const language: Language | undefined = LANGUAGES.filter((l) => l.codes.includes(lang))[0];
	return language?.direction ?? getLanguageDirection(DEFAULT_LANGUAGE);
}

/**
 * Get the completion of a language based on the default language (English)
 * @param {string} lang the language to get the completion of
 * @returns {Observable<number>} The completion of the language in percentage
 */
export function getLanguageCompletion(lang: string): Observable<number> {
	return from(import(`../assets/i18n/${DEFAULT_LANGUAGE}.json`)).pipe(
		switchMap((base: typeof DEfAULT_LANG) =>
			from(import(`../assets/i18n/${getLanguage(lang)}.json`)).pipe(
				map((language: typeof DEfAULT_LANG) => {
					const baseKeys = Object.keysRecursive(base);
					const languageKeys = Object.keysRecursive(language);
					const missingKeys = baseKeys.filter((key) => !languageKeys.includes(key));
					return Math.floor((1 - missingKeys.length / baseKeys.length) * 100);
				}),
				catchError(() => of(0)),
			),
		),
	);
}

/**
 * Reimplement the TranslateHttpLoader to load the base language (English)
 * and merge it with the given language
 */
@Injectable()
export class TranslateHttpLoader implements TranslateLoader {
	public constructor(
		private http: HttpClient,
		@Inject(String) public prefix: string,
		@Inject(String) public suffix: string,
	) {}

	public getTranslation(lang: string): Observable<object> {
		const langFile = `${this.prefix}${lang}${this.suffix}`;
		const baseLangFile = `${this.prefix}${DEFAULT_LANGUAGE}${this.suffix}`;

		const langFile$ = this.http.get<LangFile | NonNullable<unknown>>(langFile).pipe(catchError(() => of({})));
		const baseLangFile$ = this.http.get<LangFile>(baseLangFile);

		return forkJoin([langFile$, baseLangFile$]).pipe(
			map(([langData, baseLangData]) => Object.merge(baseLangData, langData)),
		);
	}
}

/**
 * Factory function to create the TranslateHttpLoader
 * @param {HttpClient} http the HttpClient to be used by the TranslateHttpLoader
 * @returns {TranslateHttpLoader} The TranslateHttpLoader
 */
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
