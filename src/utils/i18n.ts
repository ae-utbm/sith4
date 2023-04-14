import * as LANGS from '../assets/i18n/languages.json';
export const LANGUAGES: ILanguages[] = (LANGS as any).default;
export const DEFAULT_LANGUAGE = 'en-US';

export interface ILanguages {
	/** Accepted codes for the language, ex: 'en-US', 'en', 'en-GB' */
	codes: string[];
	/** The name of the file within the i18n asset folder */
	filename: string;
	/** The label to display in the language selector */
	label: string;
	/** The image to display in the language selector */
	image: string;
}

/**
 * Get the language filename from the given language code
 * @param {string} lang language code to be analyzed
 * @returns The filename of the language within the i18n asset folder
 *
 * @example getLanguage('en-US') // en-US.json
 * @example getLanguage('en') // en-US.json
 * @example getLanguage('does-not-exist') // en-US.json
 */
export function getLanguage(lang: string): string {
	const language = LANGUAGES.filter((l) => l.codes.includes(lang))[0];
	return language?.filename ?? DEFAULT_LANGUAGE;
}
