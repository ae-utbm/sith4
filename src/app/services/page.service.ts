import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FontSize, Theme, ThemeEvent } from 'src/types';
import {
	getLanguage,
	getLanguageDirection,
	getTheme,
	getThemeEvent,
	setTheme,
	setThemeEvent,
	watchAutoTheme,
} from 'src/utils';

@Injectable({
	providedIn: 'root',
})
export class PageService {
	private currentRoute = '';

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(DeviceDetectorService) private readonly deviceService: DeviceDetectorService,
		@Inject(Router) private readonly router: Router,
	) {
		// watch for route changes
		router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.currentRoute = val.url;
			}
		});
	}

	/**
	 * Set the current route
	 * @param {string} route The route to set
	 * @example p.route = '/login'; // set the route to '/login' (login page)
	 */
	public set route(route: string) {
		this.router.navigateByUrl(route);
	}

	/**
	 * Get the current route
	 * @returns {string} The current route
	 */
	public get route(): string {
		return this.currentRoute;
	}

	/**
	 * Check whether the actual route is headless or not
	 * @returns {boolean} True if the actual route is headless, false otherwise
	 */
	public get isHeadless(): boolean {
		return ['/forgot_password', '/login', '/register'].includes(this.currentRoute);
	}

	/**
	 * Check if the device used by the user is a mobile device
	 * @return {boolean} True if the device is a mobile device, false otherwise
	 */
	public get isMobile(): boolean {
		return this.deviceService.isMobile() || this.deviceService.isTablet();
	}

	/**
	 * Check if the device used by the user is a desktop device
	 * @return {boolean} True if the device is a desktop device, false otherwise
	 */
	public get isDesktop(): boolean {
		return this.deviceService.isDesktop() && !this.isMobile;
	}

	/**
	 * Check if the actual language is a right to left language
	 * @return {boolean} True if the actual language is a right to left language, false otherwise
	 */
	public get isRTL(): boolean {
		return document.documentElement.dir === 'rtl';
	}

	/**
	 * Set the browser title of the page
	 * @param {string} title The title to set
	 * @example p.title = 'Home'; // will set the title to 'Home - AE UTBM'
	 */
	public set title(title: string) {
		document.title = `${title} - AE UTBM`;
	}

	/**
	 * Detects the font size of the browser and sets it as current font size.
	 * This trigger the `fontSize` setter and getter. This method is called only once, on page load.
	 */
	public detectFontSize(): void {
		this.fontSize = this.fontSize;
	}

	/**
	 * Get the current font size
	 * @returns {FontSize} The current font size
	 */
	public get fontSize(): FontSize {
		let size = localStorage.getItem('fontSize');
		if (size === null || (size !== '0.75' && size !== '1' && size !== '1.25')) size = '1';
		return size as FontSize;
	}

	/**
	 * Set the current font size
	 * @param {FontSize} size The font size to set
	 * @example p.fontSize = '0.75'; // will set the font size to 75% of its original size
	 */
	public set fontSize(size: FontSize) {
		document.documentElement.style.setProperty('--font-size', size);
		localStorage.setItem('fontSize', size);
	}

	/**
	 * Detects the language of the browser and sets it as current language.
	 * If the language is not supported, it will be set to English.
	 */
	public detectLanguage(): void {
		this.t.setDefaultLang('en-US');
		const lang = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);

		document.documentElement.lang = lang;
		document.documentElement.dir = getLanguageDirection(lang);
		this.t.use(lang);
		this.t.currentLang = lang; // because ngx-translate doesn't set it automatically
		localStorage.setItem('lang', lang);
	}

	/**
	 * Set a language as current language
	 * @param {string} lang The language to select
	 */
	public set lang(lang: string) {
		const parsedLang = getLanguage(lang);
		document.documentElement.lang = parsedLang;
		document.documentElement.dir = getLanguageDirection(lang);
		this.t.use(parsedLang);
		this.t.currentLang = parsedLang; // because ngx-translate doesn't set it automatically
		localStorage.setItem('lang', parsedLang);
	}

	/**
	 * Get the stored language within the local storage or the browser language if not found
	 * @returns {SelectComponentOption} The found language or the default one (English)
	 */
	public get lang(): string {
		return localStorage.getItem('lang') ?? getLanguage(window.navigator.language);
	}

	/**
	 * Detects the theme of the browser and sets it as current theme.
	 * This method will also set up a watcher for theme changes and update the theme accordingly when auto theme is enabled.
	 */
	public detectTheme(): void {
		watchAutoTheme();
		setTheme(getTheme());
		setThemeEvent(getThemeEvent());
	}

	/**
	 * Set the theme of the website
	 * @param {Theme} theme The theme to set
	 */
	public set theme(theme: Theme) {
		setTheme(theme);
	}

	/**
	 * Get the current theme of the website
	 */
	public get theme(): Theme {
		return getTheme();
	}

	/**
	 * Get the current event theme of the website
	 */
	public get eventTheme(): ThemeEvent | null {
		return getThemeEvent();
	}

	/**
	 * Set the event theme of the website, if the theme is already set, it will be reset to the base theme
	 * @param {ThemeEvent | null} theme The theme to set
	 */
	public set eventTheme(theme: ThemeEvent | null) {
		setThemeEvent(this.eventTheme === theme ? null : theme);
	}

	/**
	 * Get the current logo of the website depending on the event theme
	 * @returns {string} The path to the logo
	 *
	 * TODO: its a bit wonky to set the favicon on a getter (if its not called, the favicon wont be set)
	 */
	public get logo(): `assets/logo/ae_${ThemeEvent}.webp` {
		switch (getThemeEvent()) {
			case 'christmas':
				this.favicon = 'christmas';
				return 'assets/logo/ae_christmas.webp';
			case 'pinktober':
				this.favicon = 'pinktober';
				return 'assets/logo/ae_pinktober.webp';
			default:
				this.favicon = 'base';
				return 'assets/logo/ae_base.webp';
		}
	}

	/**
	 * Set the favicon of the website depending on the event theme
	 * @param {ThemeEvent} type The type of favicon to set
	 */
	private set favicon(type: ThemeEvent) {
		const appleTouchIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
		const icons = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]');
		const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
		const maskIcon = document.querySelector<HTMLLinkElement>('link[rel="mask-icon"]');
		const shortcutIcon = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');

		const metaMSAppTileColor = document.querySelector<HTMLMetaElement>('meta[name="msapplication-TileColor"]');
		const metaMSAppConfig = document.querySelector<HTMLMetaElement>('meta[name="msapplication-config"]');
		const metaThemeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

		const colors = {
			christmas: '#095228',
			pinktober: '#e891dc',
			base: '#ffffff',
		};

		if (appleTouchIcon) appleTouchIcon.href = `assets/favicon/${type}/apple-touch-icon.png`;
		if (icons) icons.forEach((icon) => (icon.href = `assets/favicon/${type}/favicon-${icon.sizes}.png`));
		if (manifest) manifest.href = `assets/favicon/${type}/site.webmanifest`;
		if (maskIcon) {
			maskIcon.href = `assets/favicon/${type}/safari-pinned-tab.svg`;
			(maskIcon as HTMLLinkElement & { color: string }).color = colors[type];
		}
		if (shortcutIcon) shortcutIcon.href = `assets/favicon/${type}/favicon.ico`;
		if (metaMSAppTileColor) metaMSAppTileColor.content = colors[type];
		if (metaMSAppConfig) metaMSAppConfig.content = `assets/favicon/${type}/browserconfig.xml`;
		if (metaThemeColor) metaThemeColor.content = colors[type];
	}
}
