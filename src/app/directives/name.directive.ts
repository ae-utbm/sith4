import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
	if (!control.value) return null;

	// check if the name contains only letters (from any language), hyphens and apostrophes
	return /^[\p{L}'\-]+(?: [\p{L}'\-]+)*$/u.test(control.value) === false ? { invalid_name: true } : null;
}
