import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgHcaptchaModule } from 'ng-hcaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './components/components.module';
import { HttpLoaderFactory } from 'src/utils';
import { MobileComponentsModule } from './components/mobile/mobile.module';
import { DesktopComponentsModule } from './components/desktop/desktop.module';

import { environment } from 'src/environments/environment.dev';
import { GraphQLModule } from './graphql.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		ComponentsModule,
		MobileComponentsModule,
		DesktopComponentsModule,
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
		GraphQLModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
