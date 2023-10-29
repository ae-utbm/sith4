import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { environment } from 'src/environments/environment';

/**
 * Check if the date is required if the age is below the minAge
 ** Used to check if the user is a minor & make the field required
 * @param {number} minAge The minimum age for the field to be not required
 * @param {number} age The age of the user to check
 * @returns {ValidatorFn} The angular validator function
 */
export function requiredIfBelow(minAge: number, age: number): ValidatorFn | null {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) return null;

		return minAge > age ? { required_under: true } : null;
	};
}

/**
 * Check if the field is at least the min age
 * @param {number} min The minimum age to be accepted
 * @returns {ValidatorFn} The angular validator function
 */
export function ageMinValidator(min = environment.USERS.MIN_AGE): ValidatorFn {
	return (control: AbstractControl<Date>): ValidationErrors | null => {
		if (!control.value) return null;

		const year = new Date().getFullYear();
		const birthDateYear = new Date(control.value).getFullYear();
		return birthDateYear > year - min ? { age_minimum: true } : null;
	};
}

/**
 * Check if the field is at most the max age
 * @param {number} max The maximum age to be accepted
 * @returns {ValidatorFn} The angular validator function
 */
export function ageMaxValidator(max = environment.USERS.MAX_AGE): ValidatorFn {
	return (control: AbstractControl<Date>): ValidationErrors | null => {
		if (!control.value) return null;

		const year = new Date().getFullYear();
		const birthDateYear = new Date(control.value).getFullYear();
		return birthDateYear < year - max ? { age_maximum: true } : null;
	};
}

/**
 * Check that the field is not set in the future
 * @param {AbstractControl} control The control to check
 * @returns {ValidationErrors | null} The error if the field is in the future
 */
export function notInFutureValidator(control: AbstractControl<Date>): ValidationErrors | null {
	if (!control.value) return null;

	const forbidden = new Date(control.value).getTime() > new Date().getTime();
	return forbidden ? { not_in_future: true } : null;
}
