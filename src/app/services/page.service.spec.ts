import { TestBed } from '@angular/core/testing';
import { PageService } from './page.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { getLanguage, getLanguageDirection } from 'src/utils';

describe('PageService', () => {
	let service: PageService;
	let localStore: Record<string, string>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TranslateModule.forRoot(), RouterModule],
			providers: [Router, DeviceDetectorService, TranslateService],
		});
		service = TestBed.inject(PageService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

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

	describe('route', () => {
		it('should be able to get the current route', () => {
			expect(service.route).toBe('');
		});
	});

	describe('fontSize', () => {
		it('should be able to get the current font size', () => {
			localStorage.setItem('fontSize', '1');
			expect(service.fontSize).toEqual('1');
		});

		it('should return the default font size if none is set', () => {
			expect(service.fontSize).toEqual('1');
		});

		it('should return the default value if local storage value is wrong', () => {
			localStorage.setItem('fontSize', '4');
			expect(service.fontSize).toEqual('1');
		});

		it('should update the document font size when the font size is changed', () => {
			service.fontSize = '1.25';
			expect(document.documentElement.style.getPropertyValue('--font-size')).toEqual('1.25');
			expect(localStorage.getItem('fontSize')).toEqual('1.25');
		});
	});

	describe('detectLanguage', () => {
		it('should set the browser language if no language is set', () => {
			service.detectLanguage();
			expect(localStorage.getItem('lang')).toEqual(window.navigator.language);
		});
	});

	describe('lang', () => {
		it('should parse given language and set it inside the local storage', () => {
			service.lang = 'en';
			const parsed = getLanguage('en');
			expect(localStorage.getItem('lang')).toEqual(parsed);
			expect(document.documentElement.lang).toEqual(parsed);
			expect(document.documentElement.dir).toEqual(getLanguageDirection(parsed));
		});

		it('should return the browser language if local storage is empty', () => {
			expect(service.lang).toEqual(getLanguage(window.navigator.language));
		});
	});

	describe('logo', () => {
		it('should return the christmas logo when the event theme is christmas', () => {
			service.eventTheme = 'christmas';
			expect(service.logo).toEqual('assets/logo/ae_christmas.webp');
		});

		it('should return the pinktober logo when the event theme is pinktober', () => {
			service.eventTheme = 'pinktober';
			expect(service.logo).toEqual('assets/logo/ae_pinktober.webp');
		});

		it('should return the default logo when the event theme is not christmas', () => {
			service.eventTheme = 'base';
			expect(service.logo).toEqual('assets/logo/ae_base.webp');
		});
	});
});
