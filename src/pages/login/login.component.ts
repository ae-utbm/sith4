import type { UserTokenDto } from '#types/api';

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { getErrors } from '@directives';
import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'sith-login',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginComponent {
	public readonly formGroup: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(UserService) public readonly user: UserService,
		@Inject(FormBuilder) private readonly fb: FormBuilder,
	) {
		t.get('login.title').subscribe((title: string) => (page.title = title));
	}

	public login(): void {
		// if (this.user.isLoggedIn) return;

		// this.apollo
		// 	.mutate<{ login: Token }>({
		// 		mutation: gql`
		// 			mutation ($email: String!, $password: String!) {
		// 				login(email: $email, password: $password) {
		// 					token
		// 					user_id
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			email: this.formGroup.controls['email'].value,
		// 			password: this.formGroup.controls['password'].value,
		// 		},
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data, errors }) => {
		// 		if (data) {
		// 			this.user.login(data['login'].token, data['login'].user_id);
		// 		}

		// 		if (errors && !data) {
		// 			this.formGroup.controls['password'].setValue(undefined);
		// 			this.formGroup.controls['password'].setErrors({ login_fail: true });
		// 		}
		// 	});
	}

	public errors(field: string): string[] {
		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string): string {
		return `global.errors.${field}`;
	}
}
