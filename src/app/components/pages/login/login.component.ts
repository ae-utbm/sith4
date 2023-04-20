import { Component, Inject } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginComponent {
	public constructor(
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
	) {}

	public login(): void {
		// todo: call api & validate credentials
		this.u.login('fake-jwt-token');
		this.p.route = '/';
	}
}
