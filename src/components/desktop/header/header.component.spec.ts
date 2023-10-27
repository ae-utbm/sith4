import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

import { DesktopHeaderComponent } from './header.component';
import { CommonComponentsModule } from '../../common/common.module';

describe('DesktopHeaderComponent', () => {
	let component: DesktopHeaderComponent;
	let fixture: ComponentFixture<DesktopHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DesktopHeaderComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule],
			providers: [PageService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DesktopHeaderComponent);
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
