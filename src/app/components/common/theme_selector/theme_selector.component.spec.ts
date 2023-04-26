import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { ThemeSelectorComponent } from './theme_selector.component';
import { CommonComponentsModule } from '../common.module';

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

		spyOn(window.localStorage, 'getItem').and.callFake((key) => (key in localStore ? localStore[key] : null));
		spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value));
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
		expect(component.eventThemes.length).toBeGreaterThanOrEqual(0);
	});

	it('should change page theme on click', () => {
		const li = fixture.nativeElement.querySelector('.themes li');
		li.click();
		expect(component.p.theme).toBe(component.themes[0].value);
	});

	it('should add christmas theme to events theme when its December', () => {
		jasmine.clock().install();
		jasmine.clock().mockDate(new Date(2020, 11, 1));
		localStorage.setItem('themeEvent', 'base');

		component.ngOnInit();

		expect(component.eventThemes.length).toBe(1);
		expect(component.eventThemes[0].value).toBe('christmas');

		jasmine.clock().uninstall();
	});

	it('should add pinktober theme to events theme when its October', () => {
		jasmine.clock().install();
		jasmine.clock().mockDate(new Date(2020, 9, 1));
		localStorage.setItem('themeEvent', 'base');

		component.ngOnInit();

		expect(component.eventThemes.length).toBe(1);
		expect(component.eventThemes[0].value).toBe('pinktober');

		jasmine.clock().uninstall();
	});

	it('should not add any theme to events theme when its not December nor October', () => {
		jasmine.clock().install();
		jasmine.clock().mockDate(new Date(2020, 10, 1));
		localStorage.setItem('themeEvent', 'base');

		component.ngOnInit();

		expect(component.eventThemes.length).toBe(0);

		jasmine.clock().uninstall();
	});
});
