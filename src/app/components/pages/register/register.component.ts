import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Validator } from 'src/types';
import { validateBirthDate, validateConfirmPassword, validateEmail, validateName, validatePassword } from 'src/utils';

@Component({
	selector: 'app-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss'],
})
export class RegisterComponent {
	public readonly MIN_AGE = environment.REGISTER_AGE_MIN;
	public readonly MAX_AGE = environment.REGISTER_AGE_MAX;

	public fields = {
		lastName: '',
		firstName: '',
		email: '',
		birthDate: '',
		password: '',
		passwordConfirm: '',
	};

	public errors: Validator<typeof this.fields> = {
		lastName: undefined,
		firstName: undefined,
		email: undefined,
		birthDate: undefined,
		password: undefined,
		passwordConfirm: undefined,
	};

	public constructor(
		@Inject(TranslateService) public readonly t: TranslateService,
		@Inject(PageService) public readonly p: PageService,
		@Inject(UserService) public readonly u: UserService,
	) {
		t.get('register.title').subscribe((title) => (p.title = title));
	}

	public lastNameUpdate(): void {
		this.errors['lastName'] = validateName(this.fields.lastName.trim());
		this.fields.lastName = this.fields.lastName.trim();
	}

	public firstNameUpdate(): void {
		this.errors['firstName'] = validateName(this.fields.firstName.trim());
		this.fields.firstName = this.fields.firstName.trim();
	}

	public emailUpdate(): void {
		this.errors['email'] = validateEmail(this.fields.email);
	}

	public birthDateUpdate(): void {
		this.errors['birthDate'] = validateBirthDate(this.fields.birthDate);
	}

	public passwordUpdate(): void {
		this.errors['password'] = validatePassword(this.fields.password);
		this.errors['passwordConfirm'] = validateConfirmPassword(this.fields.password, this.fields.passwordConfirm);
	}
}
