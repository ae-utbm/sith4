import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

import { ThemeSelectorComponent } from './theme_selector.component';
import { CommonComponentsModule } from '../../common.module';

describe('ThemeSelectorComponent', () => {
	let component: ThemeSelectorComponent;
	let fixture: ComponentFixture<ThemeSelectorComponent>;
	let localStore: Record<string, string>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ThemeSelectorComponent],
			imports: [TranslateModule.forRoot(), CommonComponentsModule],
			providers: [PageService, TranslateService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ThemeSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	beforeEach(() => {
		localStore = {};

		spyOn(window.localStorage, 'getItem').and.callFake((key: string) => (key in localStore ? localStore[key] : null));
		spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string) => (localStore[key] = value));
		spyOn(window.localStorage, 'removeItem').and.callFake((key) => delete localStore[key]);
		spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
	});

	afterEach(() => {
		localStorage.clear();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize themes and eventThemes', () => {
		expect(component.themes.length).toBe(4);
		expect(component.themes_event.length).toBeGreaterThanOrEqual(0);
	});

	it('should change page theme on click', () => {
		const li = (fixture.nativeElement as HTMLLIElement).querySelector('.themes li') as HTMLLIElement;
		li.click();
		expect(component.page.theme).toBe(component.themes[0].value);
	});
});
