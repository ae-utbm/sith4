export type Theme = 'auto' | 'light' | 'dark' | 'high_contrast';
export type ThemeEvent = {
	theme: 'none' | 'pinktober' | 'christmas';
	last_update: Date;
	disabled: boolean;
};

export type FontSize = '0.75' | '1' | '1.25';

export interface SelectComponentOption {
	/** Optional image to display next to the label */
	image?: string;
	/** The label to display */
	label: string;
	/** The value to return */
	value: string;
}
