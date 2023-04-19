import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MobileLangSelectorComponent } from './lang_selector.component';
import { MobileComponentsModule } from '../mobile.module';
import { ISelectOption } from '../../common/select/select.component';
import { getLanguage } from 'src/utils';

describe('MobileLangSelectorComponent', () => {
	let component: MobileLangSelectorComponent;
	let fixture: ComponentFixture<MobileLangSelectorComponent>;
	let translateService: TranslateService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MobileLangSelectorComponent],
			imports: [TranslateModule.forRoot(), MobileComponentsModule],
			providers: [Document, TranslateService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MobileLangSelectorComponent);
		component = fixture.componentInstance;
		translateService = TestBed.inject(TranslateService);
		fixture.detectChanges();
	});

	afterEach(() => {
		localStorage.removeItem('lang');
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should return the language from the getLanguage method if no language is stored in localStorage', () => {
		localStorage.removeItem('lang');
		expect(component.lang).toEqual(getLanguage(window.navigator.language));
	});

	describe('getLang()', () => {
		it('should return the selected language from localStorage', () => {
			localStorage.setItem('lang', 'fr-FR');
			const expectedLang: ISelectOption = {
				label: 'Français',
				value: 'fr-FR',
				image: 'assets/flags/fr-FR.svg',
			};
			expect(component.getLang()).toEqual(expectedLang);
		});

		it('should return the browser language if no language is stored in localStorage', () => {
			spyOnProperty(window.navigator, 'language').and.returnValue('es-ES');
			const expectedLang: ISelectOption = {
				label: 'Español',
				value: 'es-ES',
				image: 'assets/flags/es-ES.svg',
			};
			expect(component.getLang()).toEqual(expectedLang);
		});

		it('should return the default language if the selected language is not in the LANGUAGES array', () => {
			localStorage.setItem('lang', 'does-not-exist');
			const expectedLang: ISelectOption = {
				label: 'English',
				value: 'en-US',
				image: 'assets/flags/en-GB.svg',
			};
			expect(component.getLang()).toEqual(expectedLang);
		});
	});

	describe('selectLangage(lang)', () => {
		it('should set the selected language and update the translate service', () => {
			spyOn(localStorage, 'setItem');
			spyOn(translateService, 'use');

			component.selectLangage('es-ES');

			expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'es-ES');
			expect(translateService.use).toHaveBeenCalledWith('es-ES');
		});

		it('should set the document language attribute to the selected language', () => {
			spyOnProperty(document.documentElement, 'lang', 'set').and.callThrough();

			component.selectLangage('es-ES');

			expect(document.documentElement.lang).toBe('es-ES');
		});

		it('should set the document direction attribute to rtl if the selected language should be read from right to left', () => {
			spyOnProperty(document.documentElement, 'dir', 'set').and.callThrough();

			component.selectLangage('ar-SA');

			expect(document.documentElement.dir).toBe('rtl');
		});

		it('should set the document direction attribute to ltr if the selected language is unknown', () => {
			spyOnProperty(document.documentElement, 'dir', 'set').and.callThrough();

			component.selectLangage('does-not-exist');

			expect(document.documentElement.dir).toBe('ltr');
		});
	});
});
