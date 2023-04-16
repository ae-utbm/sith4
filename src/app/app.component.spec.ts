import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpLoaderFactory } from './app.module';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				AppRoutingModule,
				BrowserModule,
				ComponentsModule,
				HttpClientModule,
				TranslateModule.forRoot({
					defaultLanguage: 'en-US',
					loader: {
						provide: TranslateLoader,
						useFactory: HttpLoaderFactory,
						deps: [HttpClient],
					},
				}),
			],
			providers: [Document, TranslateService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});

	it('should detect the browser language', () => {
		spyOnProperty(window.navigator, 'language', 'get').and.returnValue('fr-FR');
		spyOn(localStorage, 'getItem').and.returnValue(null);
		spyOn(localStorage, 'setItem');

		component.detectLanguage();

		expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'fr-FR');
		expect(component.document.documentElement.lang).toEqual('fr-FR');
		expect(component.document.documentElement.dir).toEqual('ltr');
		expect(component.translate.currentLang).toEqual('fr-FR');
	});

	it('should use the stored language preference if available', () => {
		spyOn(localStorage, 'getItem').and.returnValue('fr-FR');
		spyOn(localStorage, 'setItem');

		component.detectLanguage();

		expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'fr-FR');
		expect(component.document.documentElement.lang).toEqual('fr-FR');
		expect(component.document.documentElement.dir).toEqual('ltr');
		expect(component.translate.currentLang).toEqual('fr-FR');
	});

	it('should fallback to en-US if the browser language is not supported', () => {
		spyOn(localStorage, 'getItem').and.returnValue(null);
		spyOn(localStorage, 'setItem');
		spyOnProperty(window.navigator, 'language', 'get').and.returnValue('unsupported-lang');

		component.detectLanguage();

		expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en-US');
		expect(component.document.documentElement.lang).toEqual('en-US');
		expect(component.document.documentElement.dir).toEqual('ltr');
		expect(component.translate.currentLang).toEqual('en-US');
	});
});
