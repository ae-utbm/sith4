import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/404/not-found.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LangSelectorComponent } from './components/mobile/lang-selector/lang-selector.component';
import { SubtitleComponent } from './components/mobile/subtitle/subtitle.component';
import { SelectComponent } from './components/any/select/select.component';
import { CommonModule } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NotFoundComponent,
		LangSelectorComponent,
		SubtitleComponent,
		SelectComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
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
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	lang = this.route.snapshot.params['lang'];
	constructor(private route: ActivatedRoute) {}
}
