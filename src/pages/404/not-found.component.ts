import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-not-found',
	templateUrl: './not-found.html',
	styleUrls: ['./not-found.scss'],
})
export class NotFoundComponent {
	public constructor(
		@Inject(Router) public readonly router: Router,
		@Inject(PageService) public readonly page: PageService,
		@Inject(TranslateService) public readonly t: TranslateService,
	) {}

	public async goHome(): Promise<void> {
		await this.router.navigate(['/']);
	}
}
