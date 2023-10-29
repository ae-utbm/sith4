import type { FontSize, Theme, ThemeEvent } from '#types/sith';

import { Inject, Injectable } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { RouteData } from '@app-routing.module';
import { getLanguage, getLanguageDirection } from '@utils/i18n';

@Injectable({
	providedIn: 'root',
})
export class PageService {
	public constructor(@Inject(TranslateService) public readonly t: TranslateService, private router: Router) {
		// if language not set
		if (localStorage.getItem('lang') === null) this.lang = this.DEFAULT_LANG;

		// if font size not set
		if (localStorage.getItem('font_size') === null) this.font_size = '1';

		// if theme not set
		if (localStorage.getItem('theme') === null) this.theme = 'auto';
		if (localStorage.getItem('theme_event') === null) this.theme_event = this.DEFAULT_THEME_EVENT;
		// or last update was yesterday and not disabled
		else if (new Date().getDate() !== new Date(this.theme_event.last_update).getDate() && !this.theme_event.disabled)
			this.theme_event = this.DEFAULT_THEME_EVENT;

		this.updateHTML();

		this.resizeObservable$ = fromEvent(window, 'resize');
		this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
			this.width = (evt.target as Window).innerWidth;
			this.height = (evt.target as Window).innerHeight;
		});

		this.router.events.subscribe((event) => {
			if (event instanceof ActivationStart) {
				const data = event.snapshot.data as RouteData;

				if (data.title) t.get(data.title).subscribe((title: string) => (this.title = title));
				this.headless = data.headless ?? false;
				this.full_width = data.full_width ?? false;
			}
		});
	}

	resizeObservable$: Observable<Event>;
	resizeSubscription$: Subscription;

	private updateHTML() {
		document.documentElement.setAttribute('dir', this.isRTL() ? 'rtl' : 'ltr');
		document.documentElement.setAttribute('lang', this.lang);
		document.documentElement.style.setProperty('--font-size', this.font_size);

		if (!this.theme_event.disabled) document.documentElement.setAttribute('data-event-theme', this.theme_event.theme);
		else document.documentElement.removeAttribute('data-event-theme');

		if (this.theme !== 'auto') document.documentElement.setAttribute('data-theme', this.theme);
		else {
			const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

			if (prefersDark) document.documentElement.setAttribute('data-theme', 'dark');
			else document.documentElement.setAttribute('data-theme', 'light');
		}
	}

	public get theme(): Theme {
		return localStorage.getItem('theme') || 'auto';
	}

	public set theme(value: Theme) {
		localStorage.setItem('theme', value);
		this.updateHTML();
	}

	public get theme_event(): ThemeEvent {
		const local = localStorage.getItem('theme_event');
		if (local === null) {
			this.theme_event = this.DEFAULT_THEME_EVENT;
			return this.DEFAULT_THEME_EVENT;
		}

		return JSON.parse<ThemeEvent>(local);
	}

	public set theme_event(value: ThemeEvent) {
		localStorage.setItem('theme_event', JSON.stringify(value));
		if (!value.disabled) document.documentElement.setAttribute('data-event-theme', value.theme);
		else document.documentElement.removeAttribute('data-event-theme');
	}

	private get DEFAULT_THEME_EVENT() {
		return {
			theme: this.getCurrentThemeEvent(),
			last_update: new Date(),
			disabled: false,
		};
	}

	public toggleThemeEvent(theme: ThemeEvent['theme']) {
		this.theme_event = {
			...this.theme_event,
			theme,
			disabled: this.theme_event.theme === theme ? !this.theme_event.disabled : this.theme_event.disabled,
		};
	}

	public getCurrentThemeEvent(): ThemeEvent['theme'] {
		switch (new Date().getMonth()) {
			case 11:
				return 'christmas';
			case 9:
				return 'pinktober';
			default:
				return 'none';
		}
	}

	public get logo() {
		this.updateFavicon();

		switch (this.theme_event.theme) {
			case 'christmas':
				return 'assets/logo/ae_christmas.webp';
			case 'pinktober':
				return 'assets/logo/ae_pinktober.webp';
			default:
				return 'assets/logo/ae.webp';
		}
	}

	private updateFavicon() {
		const type = this.theme_event.theme === 'none' ? 'base' : this.theme_event.theme ?? 'base';

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
		if (icons) icons.forEach((icon) => (icon.href = `assets/favicon/${type}/favicon-${icon.sizes.value}.png`));
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

	public get font_size(): FontSize {
		return localStorage.getItem('font_size') || '1';
	}

	public set font_size(value: FontSize) {
		localStorage.setItem('font_size', value);
		document.documentElement.style.setProperty('--font-size', value);
	}

	public get lang(): string {
		return localStorage.getItem('lang') || this.DEFAULT_LANG;
	}

	public set lang(value: string) {
		this.setLang(value, true);
	}

	private setLang(value: string, store = false) {
		const parsed = getLanguage(value);

		document.documentElement.lang = parsed;
		document.documentElement.dir = getLanguageDirection(parsed);

		this.t.use(parsed);
		this.t.currentLang = parsed; // because ngx-translate doesn't set it automatically

		if (store) localStorage.setItem('lang', parsed);
		return parsed;
	}

	private get DEFAULT_LANG() {
		this.t.setDefaultLang('en-US');
		return this.setLang(window.navigator.language);
	}

	/**
	 * Set the browser title of the page
	 * @param {string} title The title to set
	 * @example p.title = 'Home'; // will set the title to 'Home - AE UTBM'
	 */
	public set title(title: string) {
		document.title = `${title.trim()} - AE UTBM`;
	}

	/**
	 * Get the browser title of the page
	 * @returns {string} The title of the page
	 */
	public get title(): `${string} - AE UTBM` {
		return document.title.trim() as `${string} - AE UTBM`;
	}

	public isRTL(): boolean {
		return document.documentElement.dir === 'rtl';
	}

	/**
	 * Control if the page is in headless mode or not
	 * - If the page is in headless mode, the header, navbar will be hidden
	 */
	public headless = false;

	/**
	 * Control if the page is in full width mode or not
	 * - Will make the navbar centered if false
	 */
	public full_width = false;

	/**
	 * Check if the device used by the user is a mobile device
	 * @return {boolean} True if the device is a mobile device, false otherwise
	 */
	public isMobile(): boolean {
		return this.width <= 768 || this.height <= 768;
	}

	private __width: number = window.innerWidth;
	private __height: number = window.innerHeight;

	public get width(): number {
		return this.__width;
	}

	private set width(value: number) {
		this.__width = value;
	}

	public get height(): number {
		return this.__height;
	}

	private set height(value: number) {
		this.__height = value;
	}
}
