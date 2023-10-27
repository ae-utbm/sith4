import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgHcaptchaModule } from 'ng-hcaptcha';

import { ComponentsModule } from '@components/components.module';
import { environment } from '@environments/environment.dev';
import { PagesModule } from '@pages/pages.module';
import { HttpLoaderFactory } from '@utils/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ComponentsModule,
		PagesModule,
		HttpClientModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en-US',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		NgHcaptchaModule.forRoot({
			siteKey: environment.HCAPTCHA_SITE_KEY,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
