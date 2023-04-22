import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Validator } from 'src/types';
import { validateEmail } from 'src/utils';

@Component({
	selector: 'app-login',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginComponent {
	public fields = {
		email: '',
		password: '',
	};

	public errors: Validator<typeof this.fields> = {
		email: undefined,
		password: undefined,
	};

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
	) {
		t.get('login.title').subscribe((title) => (p.title = title));
	}

	public login(): void {
		// todo: call api & validate credentials
		// todo: if auth fails, set errors['password'] = 'login.errors.password.invalid';
		this.u.login('fake-jwt-token');
		this.p.route = '/';
	}

	public emailUpdate() {
		this.errors['email'] = validateEmail(this.fields.email);
	}
}
