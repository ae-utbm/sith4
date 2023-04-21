import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { getThemeEvent } from 'src/utils';

@Injectable({
	providedIn: 'root',
})
export class PageService {
	private currentRoute = '';

	public constructor(
		@Inject(DeviceDetectorService) private readonly deviceService: DeviceDetectorService,
		@Inject(Router) private readonly router: Router,
	) {
		router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.currentRoute = val.url;
			}
		});
	}

	public set route(route: string) {
		this.router.navigateByUrl(route);
	}

	public get route(): string {
		return this.currentRoute;
	}

	public get isHeadless(): boolean {
		return ['/forgot_password', '/login', '/register'].includes(this.currentRoute);
	}

	public get isMobile(): boolean {
		return this.deviceService.isMobile() || this.deviceService.isTablet();
	}

	public get isDesktop(): boolean {
		return this.deviceService.isDesktop();
	}

	public get isRTL(): boolean {
		return document.documentElement.dir === 'rtl';
	}

	public get logo(): string {
		switch (getThemeEvent()) {
			case 'christmas':
				this.favicon = 'christmas';
				return 'assets/logo/ae_christmas.webp';
			case 'pinktober':
				this.favicon = 'pinktober';
				return 'assets/logo/ae_pinktober.webp';
			default:
				this.favicon = 'base';
				return 'assets/logo/ae.webp';
		}
	}

	private set favicon(type: 'christmas' | 'pinktober' | 'base') {
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
