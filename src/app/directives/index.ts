import { AbstractControl } from '@angular/forms';
import { ageMinValidator, ageMaxValidator, notInFutureValidator } from './date.directive';
import { forbiddenEmailValidator } from './forbidden_email.directive';
import { nameValidator } from './name.directive';
import {
	hasOneDigit,
	hasOneSpecialCharacter,
	hasOneUppercase,
	hasOneLowercase,
	hasNoDuplicateCharacters,
	passwordsMatchValidator,
} from './password.directive';

export class CustomValidators {
	public static forbiddenEmailValidator = forbiddenEmailValidator;
	public static ageMinValidator = ageMinValidator;
	public static ageMaxValidator = ageMaxValidator;
	public static notInFutureValidator = notInFutureValidator;
	public static nameValidator = nameValidator;
	public static hasOneDigit = hasOneDigit;
	public static hasOneSpecialCharacter = hasOneSpecialCharacter;
	public static hasOneUppercase = hasOneUppercase;
	public static hasOneLowercase = hasOneLowercase;
	public static hasNoDuplicateCharacters = hasNoDuplicateCharacters;
	public static passwordsMatchValidator = passwordsMatchValidator;
}

export function getErrors(control: AbstractControl): string[] {
	if (!control.errors) return [];
	if (control.pristine && !control.touched) return [];
	return Object.keys(control.errors);
}
