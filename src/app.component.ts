import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-root',
	templateUrl: './app.component.html',
	styleUrls: [],
})
export class AppComponent {
	public title = 'sith4';
	public alerts = {
		all: [],
	};

	public constructor(
		@Inject(TranslateService) public readonly translate: TranslateService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(DOCUMENT) public readonly document: Document,
	) {}
}
