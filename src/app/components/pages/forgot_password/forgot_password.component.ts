import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Validator } from 'src/types';
import { validateEmail } from 'src/utils';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot_password.html',
	styleUrls: ['./forgot_password.scss'],
})
export class ForgotPasswordComponent {
	public fields = {
		email: '',
	};

	public errors: Validator<typeof this.fields> = {
		email: undefined,
	};

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(UserService) public readonly u: UserService,
		@Inject(PageService) public readonly p: PageService,
	) {
		t.get('forgot_password.title').subscribe((title) => (p.title = title));
	}

	public emailUpdate(): void {
		this.errors['email'] = validateEmail(this.fields.email);
	}
}
