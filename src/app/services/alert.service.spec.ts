import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { Alert } from 'src/types';

describe('AlertService', () => {
	let service: AlertService;
	let localStore: Record<string, string>;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AlertService);
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

	it('should be able to dismiss an alert', (done) => {
		const testAlert: Alert = service.all[0];
		service.dismiss(testAlert, 100);
		const a: Record<string, boolean> = {};
		a[testAlert.id] = false;

		setTimeout(() => {
			expect(localStorage.getItem('alerts')).toEqual(JSON.stringify(a));
			expect(service.all.find((alert) => alert.id === testAlert.id)).toBeUndefined();
			done();
		}, 100);
	});
});
