import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from 'src/utils';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'sith4';

	constructor(private readonly translate: TranslateService, @Inject(DOCUMENT) private document: Document) {}

	ngOnInit(): void {
		this.detectLanguage();
	}

	detectLanguage(): void {
		this.translate.setDefaultLang('en-US');
		const lang = localStorage.getItem('lang') ?? getLanguage(window.navigator.language);

		this.document.documentElement.lang = lang;
		this.translate.use(lang);
		localStorage.setItem('lang', lang);
	}
}
