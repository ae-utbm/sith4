import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';

export function ageMinValidator(min = environment.REGISTER_AGE_MIN): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) return null;

		const year = new Date().getFullYear();
		const birthDateYear = new Date(control.value).getFullYear();
		return birthDateYear > year - min ? { age_minimum: true } : null;
	};
}

export function ageMaxValidator(max = environment.REGISTER_AGE_MAX): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!control.value) return null;

		const year = new Date().getFullYear();
		const birthDateYear = new Date(control.value).getFullYear();
		return birthDateYear < year - max ? { age_maximum: true } : null;
	};
}

export function notInFutureValidator(control: AbstractControl): ValidationErrors | null {
	if (!control.value) return null;

	const forbidden = new Date(control.value).getTime() > new Date().getTime();
	return forbidden ? { not_in_future: true } : null;
}
