export type Theme = 'light' | 'dark' | 'auto' | 'high_contrast';

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
