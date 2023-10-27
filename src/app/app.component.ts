import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, getLanguageDirection } from 'src/utils';
import { getTheme, setTheme, watchAutoTheme } from 'src/utils/theme';
import { PageService } from './services/page.service';

@Component({
	selector: 'sith-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title = 'sith4';
	public alerts = {
		all: [],
	};

	public constructor(
		@Inject(TranslateService) public readonly translate: TranslateService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(DOCUMENT) public readonly document: Document,
	) {}

	public ngOnInit(): void {
		this.page.detectLanguage();
		this.page.detectTheme();
		this.page.detectFontSize();
	}
}
