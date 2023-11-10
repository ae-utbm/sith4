import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function hasOneDigit(control: AbstractControl<string>): ValidationErrors | null {
	if (!control.value) return null;
	return /\d/.test(control.value) === false ? { has_one_digit: true } : null;
}

export function hasOneSpecialCharacter(control: AbstractControl<string>): ValidationErrors | null {
	if (!control.value) return null;
	return /[\W_]+/.test(control.value) === false ? { has_one_special_character: true } : null;
}

export function hasOneUppercase(control: AbstractControl<string>): ValidationErrors | null {
	if (!control.value) return null;
	return /[A-Z]/.test(control.value) === false ? { has_one_uppercase: true } : null;
}

export function hasOneLowercase(control: AbstractControl<string>): ValidationErrors | null {
	if (!control.value) return null;
	return /[a-z]/.test(control.value) === false ? { has_one_lowercase: true } : null;
}

export function hasNoDuplicateCharacters(control: AbstractControl<string>): ValidationErrors | null {
	if (!control.value) return null;
	return control.value.match(/([a-z])\1+/g) !== null ||
		control.value.match(/([A-Z])\1+/g) !== null ||
		control.value.match(/([0-9])\1+/g) !== null
		? { has_no_duplicate_characters: true }
		: null;
}

export function passwordsMatchValidator(password_field = 'password', confirm_field = 'password_confirm'): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const password = control.get(password_field);
		const passwordConfirm = control.get(confirm_field);

		return password?.value === passwordConfirm?.value ? null : { passwords_match: true };
	};
}
