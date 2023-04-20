import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

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
}
