import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators, getErrors } from 'src/app/directives';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginComponent {
	public formGroup: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email, CustomValidators.forbiddenEmailValidator('@utbm.fr')]],
		password: ['', [Validators.required]],
	});

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
		@Inject(FormBuilder) private readonly fb: FormBuilder,
	) {
		t.get('login.title').subscribe((title) => (p.title = title));
	}

	public login(): void {
		// todo: call api & validate credentials
		// todo: if auth fails, set errors['password'] = 'login.errors.password.invalid';
		this.u.login('fake-jwt-token');
		this.p.route = '/';
	}

	public errors(field: string): string[] {
		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string): string {
		return `global.errors.${field}`;
	}
}
