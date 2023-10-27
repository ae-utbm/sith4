import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const WHITELIST = ['ae@utbm.fr', 'ae.info@utbm.fr'];

/**
 * Check if the given email is not a forbidden one.
 * @param {...string} emails Array of forbidden emails (e.g. '@utbm.fr')
 * @returns {ValidatorFn} The angular validator function
 */
export function forbiddenEmailValidator(...emails: string[]): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const forbidden = emails.find(
			(e) => control.value && control.value.endsWith(e) && !WHITELIST.includes(control.value),
		);

		return forbidden ? { forbidden_email: true } : null;
	};
}
