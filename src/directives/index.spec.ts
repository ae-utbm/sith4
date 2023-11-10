import { FormControl } from '@angular/forms';

import { getErrors } from '.';

describe('getErrors', () => {
	it('should return empty array if the control does not have errors', () => {
		const control = new FormControl();
		expect(getErrors(control)).toEqual([]);
	});

	it('should return empty array if the control is not touched', () => {
		const control = new FormControl('');
		control.setErrors({ required: true });
		expect(getErrors(control)).toEqual([]);
	});

	it('should return array of errors if the control has errors', () => {
		const control = new FormControl('');
		control.setErrors({ required: true, minlength: true });
		control.markAsTouched();

		expect(getErrors(control)).toEqual(['required', 'minlength']);
	});
});
