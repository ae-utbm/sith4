import type { email } from '#types';

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CustomValidators, getErrors } from '@directives';
import { environment } from '@environments/environment';
import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';
type RegisterForm = typeof REGISTER_FORM_GROUP;
type RegisterFormKeys = keyof RegisterForm['controls'];
const REGISTER_FORM_GROUP = new FormGroup(
	{
		first_name: new FormControl('', {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.minLength(environment.USERS.MIN_NAME_LENGTH),
				Validators.maxLength(environment.USERS.MAX_NAME_LENGTH),
				CustomValidators.nameValidator,
			],
		}),
		last_name: new FormControl('', {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.minLength(environment.USERS.MIN_NAME_LENGTH),
				Validators.maxLength(environment.USERS.MAX_NAME_LENGTH),
				CustomValidators.nameValidator,
			],
		}),
		email: new FormControl<email>('' as email, {
			nonNullable: true,
			validators: [Validators.required, Validators.email, CustomValidators.forbiddenEmailValidator('@utbm.fr')],
		}),
		birth_date: new FormControl(new Date(), {
			nonNullable: true,
			validators: [
				Validators.required,
				CustomValidators.ageMinValidator(environment.USERS.MIN_AGE),
				CustomValidators.ageMaxValidator(environment.USERS.MAX_AGE),
				CustomValidators.notInFutureValidator,
			],
		}),
		password: new FormControl('', {
			nonNullable: true,
			validators: [
				Validators.required,
				Validators.minLength(8),
				CustomValidators.hasOneDigit,
				CustomValidators.hasOneSpecialCharacter,
				CustomValidators.hasOneUppercase,
				CustomValidators.hasOneLowercase,
				CustomValidators.hasNoDuplicateCharacters,
			],
		}),
		password_confirm: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
		captcha: new FormControl('', { nonNullable: true, validators: Validators.required }),
	},
	{ validators: CustomValidators.passwordsMatchValidator() },
);

@Component({
	selector: 'sith-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss'],
})
export class RegisterComponent {
	public constructor(
		@Inject(Router) private readonly router: Router,
		@Inject(PageService) public readonly page: PageService,
		@Inject(UserService) public readonly u: UserService,
		@Inject(FormBuilder) private readonly fb: FormBuilder,
		@Inject(TranslateService) private readonly t: TranslateService,
	) {}

	public readonly formGroup = REGISTER_FORM_GROUP;
	public readonly MIN_NAME = environment.USERS.MIN_NAME_LENGTH;
	public readonly MAX_NAME = environment.USERS.MAX_NAME_LENGTH;
	public readonly MIN_AGE = environment.USERS.MIN_AGE;
	public readonly MAX_AGE = environment.USERS.MAX_AGE;
	public readonly MIN_PASSWORD = environment.USERS.MIN_PASSWORD_LENGTH;

	public errors(field: RegisterFormKeys): string[] {
		if ('password_confirm' === field)
			return [...getErrors(this.formGroup.controls[field]), ...getErrors(this.formGroup)];

		return getErrors(this.formGroup.controls[field]);
	}

	public getError(key: string): string {
		return `global.errors.${key}`;
	}

	public register(): void {
		// this.apollo
		// 	.mutate<{ register: Token }>({
		// 		mutation: gql`
		// 			mutation (
		// 				$birthday: DateTime!
		// 				$email: String!
		// 				$first_name: String!
		// 				$last_name: String!
		// 				$password: String!
		// 			) {
		// 				register(
		// 					birthday: $birthday
		// 					email: $email
		// 					first_name: $first_name
		// 					last_name: $last_name
		// 					password: $password
		// 				) {
		// 					token
		// 					user_id
		// 				}
		// 			}
		// 		`,
		// 		variables: {
		// 			birthday: this.formGroup.controls['birthDate'].value,
		// 			email: this.formGroup.controls['email'].value,
		// 			first_name: this.formGroup.controls['firstName'].value,
		// 			last_name: this.formGroup.controls['lastName'].value,
		// 			password: this.formGroup.controls['password'].value,
		// 		},
		// 		errorPolicy: 'all',
		// 	})
		// 	.subscribe(({ data, errors }) => {
		// 		if (data && !errors) {
		// 			this.u.login(data['register'].token, data['register'].user_id);
		// 			this.page.route = '/';
		// 		} else if (errors) {
		// 			this.formGroup.controls['email'].setErrors({ api: errors[0].message });
		// 		}
		// 	});
	public async goto(path: string): Promise<void> {
		await this.router.navigate([path]);
	}
}
