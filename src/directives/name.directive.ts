import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
	if (!control.value) return null;

	// check if the name contains only letters (from any language), hyphens and apostrophes
	const regex = new RegExp(/^[\p{L}'\-]+(?: [\p{L}'\-]+)*$/u);
	return regex.test(control.value) === false ? { invalid_name: true } : null;
}
