import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarComponent } from './navbar.component';

describe('MobileMenuNavbarComponent', () => {
	let component: MobileNavbarComponent;
	let fixture: ComponentFixture<MobileNavbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MobileNavbarComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MobileNavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
