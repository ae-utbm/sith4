import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-not-found',
	templateUrl: './not-found.html',
	styleUrls: [],
})
export class NotFoundComponent {
	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly page: PageService,
	) {}
}
