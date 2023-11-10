export interface LangFile {
	[key: string]: string | LangFile;
}

/**
 * A language
 */
export interface Language {
	/** The language codes @example ['en', 'en-US', 'en-GB'] */
	codes: Array<string>;
	/** The language filename in the 'assets/i18n/' directory */
	filename: string;
	/** The language label, translated in the language itself */
	label: string;
	/** The language flag */
	image: string;
	/** The language read direction */
	direction: 'ltr' | 'rtl';
}
