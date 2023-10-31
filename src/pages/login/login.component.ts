import type { email } from '#types';
import type { ErrorResponseDto, UserSignInDto, UserTokenDto } from '#types/api';

import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { getErrors } from '@directives';
import { APIService, ApiError } from '@services/api.service';
import { PageService } from '@services/page.service';
import { SnackbarService } from '@services/snackbar.service';
import { UserService } from '@services/user.service';

type LoginForm = typeof LOGIN_FORM_GROUP;
type LoginFormKeys = keyof LoginForm['controls'];
const LOGIN_FORM_GROUP = new FormGroup({
	email: new FormControl<email>('' as email, {
		nonNullable: true,
		validators: [Validators.required, Validators.email],
	}),
	password: new FormControl('', {
		nonNullable: true,
		validators: [Validators.required],
	}),
});

@Component({
	selector: 'sith-login',
	templateUrl: './login.html',
	styleUrls: ['./login.scss'],
})
export class LoginComponent {
	public constructor(
		@Inject(PageService) public readonly page: PageService,
		@Inject(UserService) public readonly user: UserService,
		@Inject(APIService) private readonly api: APIService,
		@Inject(SnackbarService) private readonly snackbar: SnackbarService,
	) {}

	public readonly formGroup = LOGIN_FORM_GROUP;

	public login(): void {
		this.api
			.post<UserTokenDto, UserSignInDto>(`/auth/login`, {
				email: this.formGroup.controls['email'].value,
				password: this.formGroup.controls['password'].value,
			})
			.subscribe({
				next: (data) => {
					this.user.login(data.token, data.user_id);

					// Wait for the user to be logged in before redirecting
					// -> avoid race condition with the user token
					// FIXME: this does not always work, 401 errors may be thrown!
					setTimeout(() => {
						this.page.to(['users', `${data.user_id}`, 'profile']);
					}, 1000);
				},
				error: (e: ApiError<ErrorResponseDto>) => {
					switch (e.error.statusCode) {
						case 401:
							this.formGroup.controls['password'].setErrors({ password_wrong: true });
							break;

						case 403:
							setTimeout(() => {
								this.page.to('verify');
							}, 500);
							break;

						case 404:
							this.formGroup.controls['email'].setErrors({ email_not_found: true });
							break;

						default:
							this.snackbar.error(e.error.message, e.error.error, e.error.statusCode);
					}
				},
			});
	}

	public errors(field: LoginFormKeys): string[] {
		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string): string {
		return `global.errors.${field}`;
	}
}
