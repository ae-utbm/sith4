import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;
	let localStore: Record<string, string>;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserService);
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
		service.logout();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('isLoggedIn', () => {
		it('should return false if the local storage is empty', () => {
			expect(service.isLoggedIn).toEqual(false);
		});
	});

	describe('notifications', () => {
		it('should return undefined if the user is not logged in', () => {
			expect(service.notifications).toBeUndefined();
		});

		it('should return notifications array if the user is logged in', () => {
			service.login('fake-jwt');
			expect(service.notifications).toEqual([]);
		});
	});

	describe('notificationsCount', () => {
		it('should return undefined when the user is not logged in', () => {
			expect(service.notificationsCount).toBeUndefined();
		});

		it('should return number if the user is logged in', () => {
			service.login('fake-jwt');
			expect(service.notificationsCount).toEqual(0);
		});
	});
});
