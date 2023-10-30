import { Component, Inject } from '@angular/core';

import { PageService } from '@services/page.service';

@Component({
	selector: 'sith-verify',
	templateUrl: './verify.html',
	styleUrls: ['./verify.scss'],
})
export class VerifyComponent {
	public constructor(@Inject(PageService) public readonly page: PageService) {}
}
