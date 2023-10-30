import { Component, Inject } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-not-found',
	templateUrl: './not-found.html',
	styleUrls: ['./not-found.scss'],
})
export class NotFoundComponent {
	public constructor(@Inject(PageService) public readonly page: PageService) {}
}
