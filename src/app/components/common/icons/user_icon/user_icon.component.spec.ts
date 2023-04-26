import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconUserIconComponent } from './user_icon.component';

describe('IconUserIconComponent', () => {
	let component: IconUserIconComponent;
	let fixture: ComponentFixture<IconUserIconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IconUserIconComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(IconUserIconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('hasPicture', () => {
		it('should return false when url is undefined', () => {
			component.url = undefined;
			expect(component.hasPicture()).toBeFalse();
		});

		it('should return true when url is not undefined', () => {
			component.url = 'anything';
			expect(component.hasPicture()).toBeTrue();
		});
	});
});
