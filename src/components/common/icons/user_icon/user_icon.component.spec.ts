import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUserComponent } from './user_icon.component';

describe('IconUserComponent', () => {
	let component: IconUserComponent;
	let fixture: ComponentFixture<IconUserComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IconUserComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(IconUserComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('hasPicture', () => {
		it('should return true if url is defined', () => {
			component.url = 'https://example.com/image.jpg';
			expect(component.hasPicture()).toBeTrue();
		});

		it('should return false if url is undefined', () => {
			component.url = undefined;
			expect(component.hasPicture()).toBeFalse();
		});
	});

	describe('notifications', () => {
		it('should show notification count if notifications are between 0 and 9', () => {
			component.notifications = 5;
			fixture.detectChanges();
			const notificationElement = (fixture.nativeElement as HTMLDivElement).querySelector('.notification');
			expect(notificationElement?.textContent).toContain('5');
		});

		it('should show a circle if notifications are 10 or more', () => {
			component.notifications = 10;
			fixture.detectChanges();
			const notificationElement = (fixture.nativeElement as HTMLDivElement).querySelector('.notification');
			expect(notificationElement?.querySelector('span')).toBeTruthy();
		});

		it('should not show any notification if notifications are 0', () => {
			component.notifications = 0;
			fixture.detectChanges();
			const notificationElement = (fixture.nativeElement as HTMLDivElement).querySelector('.notification');
			expect(notificationElement).toBeFalsy();
		});
	});
});
