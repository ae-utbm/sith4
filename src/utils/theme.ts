import { Theme, ThemeEvent } from 'src/types';

export const getTheme = (): Theme => {
	return (localStorage.getItem('theme') ?? 'auto') as Theme;
};

export const setTheme = (theme: Theme): void => {
	localStorage.setItem('theme', theme);

	if (theme !== 'auto') document.documentElement.setAttribute('data-theme', theme);
	else {
		const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
		else document.documentElement.setAttribute('data-theme', 'light');
	}
};

export const getThemeEvent = (): ThemeEvent | null => {
	return localStorage.getItem('themeEvent') as ThemeEvent | null;
};

export const setThemeEvent = (theme: ThemeEvent | null): void => {
	if (theme === null) {
		localStorage.removeItem('themeEvent');
		document.documentElement.removeAttribute('data-event-theme');
	} else {
		localStorage.setItem('themeEvent', theme);
		document.documentElement.setAttribute('data-event-theme', theme);
	}
};

export const watchAutoTheme = (): void => {
	window.matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
		if (getTheme() !== 'auto' || !event.matches) return;
		document.documentElement.setAttribute('data-theme', 'dark');
	};

	window.matchMedia('(prefers-color-scheme: light)').onchange = (event) => {
		if (getTheme() !== 'auto' || !event.matches) return;
		document.documentElement.setAttribute('data-theme', 'light');
	};
};
