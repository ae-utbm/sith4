import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';

@Component({
	selector: 'sith-not-found',
	templateUrl: './not-found.html',
	styleUrls: [],
})
export class NotFoundComponent {
	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
	) {
		t.get('404.title').subscribe((title) => (p.title = title));
	}
}
