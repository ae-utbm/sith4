import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangSelectorComponent } from './lang_selector.component';
import { MobileComponentsModule } from '../../mobile/mobile.module';
import { PageService } from 'src/app/services/page.service';

describe('MobileLangSelectorComponent', () => {
	let component: LangSelectorComponent;
	let fixture: ComponentFixture<LangSelectorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LangSelectorComponent],
			imports: [TranslateModule.forRoot(), MobileComponentsModule],
			providers: [TranslateService, PageService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LangSelectorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		localStorage.removeItem('lang');
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	describe('selection', () => {
		it('should return the default language when no language is set', () => {
			spyOnProperty(component.p, 'lang', 'get').and.returnValue('anything');
			expect(component.selection).toEqual({
				label: 'English',
				value: 'en-US',
				image: 'assets/flags/en-GB.svg',
			});
		});
	});
});
