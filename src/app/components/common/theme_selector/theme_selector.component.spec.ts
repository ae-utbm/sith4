import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { ThemeSelectorComponent } from './theme_selector.component';
import { CommonComponentsModule } from '../common.module';

describe('ThemeSelectorComponent', () => {
	let component: ThemeSelectorComponent;
	let fixture: ComponentFixture<ThemeSelectorComponent>;

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
});
