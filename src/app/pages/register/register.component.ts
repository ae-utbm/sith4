import type { Token } from 'src/types/objects';

import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, getErrors } from 'src/app/directives';
import { Apollo, gql } from 'apollo-angular';

@Component({
	selector: 'app-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss'],
})
export class RegisterComponent {
	public readonly MIN_AGE = environment.REGISTER_AGE_MIN;
	public readonly MAX_AGE = environment.REGISTER_AGE_MAX;
	public readonly MIN_NAME = 2;
	public readonly MIN_PASSWORD = 8;

	public readonly formGroup: FormGroup = this.fb.group(
		{
			lastName: [null, [Validators.required, Validators.minLength(this.MIN_NAME), CustomValidators.nameValidator]],
			firstName: [null, [Validators.required, Validators.minLength(this.MIN_NAME), CustomValidators.nameValidator]],
			email: [null, [Validators.required, Validators.email, CustomValidators.forbiddenEmailValidator('@utbm.fr')]],
			birthDate: [
				null,
				[
					Validators.required,
					CustomValidators.ageMinValidator(),
					CustomValidators.ageMaxValidator(),
					CustomValidators.notInFutureValidator,
				],
			],
			password: [
				null,
				[
					Validators.required,
					Validators.minLength(this.MIN_PASSWORD),
					CustomValidators.hasOneDigit,
					CustomValidators.hasOneSpecialCharacter,
					CustomValidators.hasOneUppercase,
					CustomValidators.hasOneLowercase,
					CustomValidators.hasNoDuplicateCharacters,
				],
			],
			passwordConfirm: [null, [Validators.required]],
			captcha: [null, Validators.required],
		},
		{ validators: CustomValidators.passwordsMatchValidator() },
	);

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly page: PageService,
		@Inject(UserService) public readonly u: UserService,
		@Inject(FormBuilder) private readonly fb: FormBuilder,
		@Inject(Apollo) private readonly apollo: Apollo,
	) {
		t.get('register.title').subscribe((title) => (page.title = title));
	}

	public errors(field: string): string[] {
		if ('passwordConfirm' === field)
			return [...getErrors(this.formGroup.controls[field]), ...getErrors(this.formGroup)];

		return getErrors(this.formGroup.controls[field]);
	}

	public getError(field: string, control = ''): string {
		if (field === 'api') return this.formGroup.controls[control].getError(field);
		return `global.errors.${field}`;
	}

	public register(): void {
		this.apollo
			.mutate<{ register: Token }>({
				mutation: gql`
					mutation (
						$birthday: DateTime!
						$email: String!
						$first_name: String!
						$last_name: String!
						$password: String!
					) {
						register(
							birthday: $birthday
							email: $email
							first_name: $first_name
							last_name: $last_name
							password: $password
						) {
							token
							user_id
						}
					}
				`,
				variables: {
					birthday: this.formGroup.controls['birthDate'].value,
					email: this.formGroup.controls['email'].value,
					first_name: this.formGroup.controls['firstName'].value,
					last_name: this.formGroup.controls['lastName'].value,
					password: this.formGroup.controls['password'].value,
				},
				errorPolicy: 'all',
			})
			.subscribe(({ data, errors }) => {
				if (data && !errors) {
					this.u.login(data['register'].token, data['register'].user_id);
					this.page.route = '/';
				} else if (errors) {
					this.formGroup.controls['email'].setErrors({ api: errors[0].message });
				}
			});
	}
}
