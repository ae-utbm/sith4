import { getTheme, getThemeEvent, setTheme, setThemeEvent } from './theme';

describe('Theme', () => {
	let localStore: Record<string, string>;

	beforeEach(() => {
		localStore = {};

		spyOn(window.localStorage, 'getItem').and.callFake((key) => (key in localStore ? localStore[key] : null));
		spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value));
		spyOn(window.localStorage, 'removeItem').and.callFake((key) => delete localStore[key]);
		spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
	});

	afterEach(() => {
		localStorage.clear();
	});

	describe('getTheme', () => {
		it('should return the theme from localStorage', () => {
			localStorage.setItem('theme', 'light');
			expect(getTheme()).toEqual('light');
		});

		it('should return the default theme if localStorage is empty', () => {
			expect(getTheme()).toEqual('auto');
		});
	});

	describe('setTheme', () => {
		it('should set theme in the local store', () => {
			setTheme('dark');
			expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
			expect(localStorage.getItem('theme')).toEqual('dark');
		});

		it('should set check for browser theme when "auto" theme is selected (dark)', () => {
			spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);

			setTheme('auto');
			expect(document.documentElement.getAttribute('data-theme')).toEqual('dark');
		});

		it('should set check for browser theme when "auto" theme is selected (light)', () => {
			spyOn(window, 'matchMedia').and.returnValue({ matches: false } as MediaQueryList);

			setTheme('auto');
			expect(document.documentElement.getAttribute('data-theme')).toEqual('light');
		});
	});

	describe('getThemeEvent', () => {
		it('should return the theme event from localStorage', () => {
			localStorage.setItem('themeEvent', 'christmas');
			expect(getThemeEvent()).toEqual('christmas');
		});

		it('should return null if localStorage is empty', () => {
			expect(getTheme()).toEqual('auto');
		});
	});

	describe('setThemeEvent', () => {
		it('should set theme event in the local storage if not null', () => {
			setThemeEvent('christmas');
			expect(localStorage.setItem).toHaveBeenCalledWith('themeEvent', 'christmas');
			expect(localStorage.getItem('themeEvent')).toEqual('christmas');
			expect(document.documentElement.getAttribute('data-event-theme')).toEqual('christmas');
		});

		it('should remove theme event from the local storage if null', () => {
			setThemeEvent(null);
			expect(localStorage.removeItem).toHaveBeenCalledWith('themeEvent');
			expect(localStorage.getItem('themeEvent')).toEqual(null);
			expect(document.documentElement.getAttribute('data-event-theme')).toEqual(null);
		});
	});

	// TODO
	// describe('watchAutoTheme', () => {});
});
