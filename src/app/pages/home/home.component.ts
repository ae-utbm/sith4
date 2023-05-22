import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'sith-home',
	templateUrl: './home.html',
	styleUrls: [],
})
export class HomeComponent {
	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly page: PageService,
	) {
		t.get('home.title').subscribe((title) => (page.title = title));
	}
}
