import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss'],
})
export class RegisterComponent {
	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
	) {
		t.get('register.title').subscribe((title) => (p.title = title));
	}
}
