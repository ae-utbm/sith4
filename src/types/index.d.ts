export interface SelectComponentOption {
	/** Optional image to display next to the label */
	image?: string;
	/** The label to display */
	label: string;
	/** The value to return */
	value: string;
}

export interface ThemeSelectorComponentTheme<TTheme> {
	/** The name of the theme to display */
	name: string;
	/** The internal value of the theme */
	value: TTheme;
}

export type Theme = 'light' | 'dark' | 'auto' | 'high_contrast';
export type ThemeEvent = 'base' | 'pinktober' | 'christmas';

/** Font size in percentage */
export type FontSize = '.75' | '1' | '1.25';

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

export type Validator<T> = Record<keyof T, string | undefined>;
