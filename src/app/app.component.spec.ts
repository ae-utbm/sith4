import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpLoaderFactory } from 'src/utils';
import { UserService } from './services/user.service';
import { PageService } from './services/page.service';
import { DesktopComponentsModule } from './components/desktop/desktop.module';
import { MobileComponentsModule } from './components/mobile/mobile.module';

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
				DesktopComponentsModule,
				MobileComponentsModule,
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
			providers: [Document, TranslateService, UserService, PageService],
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
});
