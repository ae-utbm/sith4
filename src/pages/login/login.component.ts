import type { email } from '#types';
import type { ErrorResponseDto, UserSignInDto, UserTokenDto } from '#types/api';

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getErrors } from '@directives';
import { environment } from '@environments/environment';
import { APIService, ApiError } from '@services/api.service';
import { PageService } from '@services/page.service';
import { SnackbarService } from '@services/snackbar.service';
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
		@Inject(Router) private readonly router: Router,
		@Inject(APIService) private readonly api: APIService,
		@Inject(SnackbarService) private readonly snackbar: SnackbarService,
	) {}

	public goto(page: string[] | string) {
		this.router.navigate(typeof page === 'string' ? [page] : page).catch(() => ({}));
	}

	public login(): void {
		this.api
			.post<UserTokenDto, UserSignInDto>(`${environment.API_URL}/auth/login`, {
				email: this.formGroup.controls['email'].value as email,
				password: this.formGroup.controls['password'].value as string,
			})
			.subscribe({
				next: (data) => {
					this.user.login(data.token, data.user_id);

					// Wait for the user to be logged in before redirecting
					// -> avoid race condition with the user token
					setTimeout(() => {
						this.goto(['users', `${data.user_id}`, 'profile']);
					}, 500);
				},
				error: (e: ApiError<ErrorResponseDto>) => {
					this.snackbar.error(e.error.message, e.error.error, e.error.statusCode);
					this.formGroup.controls['password'].setValue(undefined);
					this.formGroup.controls['email'].setValue(undefined);
				},
			});
	}

	public errors(field: string): string[] {
		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string): string {
		return `global.errors.${field}`;
	}
}
