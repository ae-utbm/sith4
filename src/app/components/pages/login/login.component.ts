import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { getErrors } from 'src/app/directives';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { Apollo } from 'apollo-angular';
import { LoginObject } from 'src/types/objects';

import gql from 'graphql-tag';

@Component({
	selector: 'app-login',
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
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
		@Inject(FormBuilder) private readonly fb: FormBuilder,
		@Inject(Apollo) private readonly apollo: Apollo,
	) {
		t.get('login.title').subscribe((title) => (p.title = title));
	}

	public login(): void {
		this.apollo
			.mutate<LoginObject>({
				mutation: gql`
					mutation ($email: String!, $password: String!) {
						login(email: $email, password: $password) {
							token
							user_id
						}
					}
				`,
				variables: {
					email: this.formGroup.controls['email'].value,
					password: this.formGroup.controls['password'].value,
				},
				errorPolicy: 'all',
			})
			.subscribe(({ data }) => {
				if (data) {
					this.u.login(data.login.user_id, data.login.token);
					this.p.route = '/';
				} else {
					this.formGroup.controls['email'].setErrors({ login_fail: true });
					this.formGroup.controls['password'].setErrors({ login_fail: true });
				}
			});
	}

	public errors(field: string): string[] {
		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string): string {
		return `global.errors.${field}`;
	}
}
