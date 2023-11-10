import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

import { MobileHeaderComponent } from './header.component';
import { MobileComponentsModule } from '../mobile.module';

describe('MobileHeaderComponent', () => {
	let component: MobileHeaderComponent;
	let fixture: ComponentFixture<MobileHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MobileHeaderComponent],
			imports: [TranslateModule.forRoot(), MobileComponentsModule],
			providers: [PageService, UserService, TranslateService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MobileHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('triggerSideMenuProfile', () => {
		it('should open the profile menu when triggered', () => {
			component.triggerSideMenuProfile();
			expect(component.profileOpened).toBeTrue();
		});
	});

	describe('triggerSideMenuConnection', () => {
		it('should open the connection menu when triggered', () => {
			component.triggerSideMenuConnection();
			expect(component.connectionOpened).toBeTrue();
		});
	});

	describe('triggerSideMenuOptions', () => {
		it('should open the options menu when triggered', () => {
			component.triggerSideMenuOptions();
			expect(component.optionsOpened).toBeTrue();
		});
	});
});
