import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';

/**
 * Check if the field is at least the min age
 * @param {number} min The minimum age to be accepted
 * @returns {ValidatorFn} The angular validator function
 */
export function ageMinValidator(min = environment.REGISTER_AGE_MIN): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
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
export function ageMaxValidator(max = environment.REGISTER_AGE_MAX): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
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
export function notInFutureValidator(control: AbstractControl): ValidationErrors | null {
	if (!control.value) return null;

	const forbidden = new Date(control.value).getTime() > new Date().getTime();
	return forbidden ? { not_in_future: true } : null;
}
