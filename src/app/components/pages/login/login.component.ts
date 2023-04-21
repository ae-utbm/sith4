import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginComponent {
	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
	) {
		t.get('login.title').subscribe((title) => (p.title = title));
	}

	public login(): void {
		// todo: call api & validate credentials
		this.u.login('fake-jwt-token');
		this.p.route = '/';
	}
}
