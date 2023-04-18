import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpLoaderFactory, TranslateHttpLoader, getAllKeysOfObject, getLanguage, getLanguageDirection } from './i18n';

describe('i18n', () => {
	let httpTestingController: HttpTestingController;
	let translateHttpLoader: TranslateHttpLoader;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [{ provide: TranslateHttpLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }],
		});

		httpTestingController = TestBed.inject(HttpTestingController);
		translateHttpLoader = TestBed.inject(TranslateHttpLoader);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	describe('getLanguage', () => {
		it('should return the language filename for the given language code', () => {
			expect(getLanguage('en')).toBe('en-US');
		});

		it('should return the default language filename if no matching language is found', () => {
			expect(getLanguage('does-not-exist')).toBe('en-US');
		});
	});

	describe('getLanguageDirection', () => {
		it('should return the direction of the given language', () => {
			expect(getLanguageDirection('ar-SA')).toBe('rtl');
		});

		it('should return the default language direction if no matching language is found', () => {
			expect(getLanguageDirection('does-not-exist')).toBe('ltr');
		});
	});

	describe('getAllKeysOfObject', () => {
		it('should return all keys of the object and its nested objects', () => {
			const obj = { a: 1, b: { c: 2, d: 3 } };
			expect(getAllKeysOfObject(obj)).toEqual(['a', 'b.c', 'b.d']);
		});
	});

	describe('TranslateHttpLoader', () => {
		it('should load the base language file and merge it with the given language file', () => {
			const langData = {
				greeting: 'Hello',
				farewell: 'Goodbye',
			};

			const baseLangData = {
				greeting: 'Hello',
				question: 'How are you?',
			};

			translateHttpLoader.getTranslation('fr-FR').subscribe((mergedData) => {
				expect(mergedData).toEqual(Object.merge(baseLangData, langData));
			});

			const langRequest = httpTestingController.expectOne('./assets/i18n/fr-FR.json');
			langRequest.flush(langData);

			const baseLangRequest = httpTestingController.expectOne('./assets/i18n/en-US.json');
			baseLangRequest.flush(baseLangData);
		});

		it('should gracefully handle errors when loading the language file', () => {
			const baseLangData = {
				greeting: 'Hello',
				question: 'How are you?',
			};

			translateHttpLoader.getTranslation('invalid').subscribe((mergedData) => {
				expect(mergedData).toEqual(Object.merge(baseLangData));
			});

			const langRequest = httpTestingController.expectOne('./assets/i18n/invalid.json');
			langRequest.error(new ProgressEvent('error'), { status: 404 });

			const baseLangRequest = httpTestingController.expectOne('./assets/i18n/en-US.json');
			baseLangRequest.flush(baseLangData);
		});
	});
});
