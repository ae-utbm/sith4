import { FormControl } from '@angular/forms';
import { nameValidator } from './name.directive';

describe('nameValidator', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(nameValidator(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const values = ['John', 'John Doe', 'John-Doe', "John D'oe"];
		values.forEach((value) => {
			const control = new FormControl(value);
			expect(nameValidator(control)).toEqual(null);
		});
	});

	it('should return an error if the control is invalid', () => {
		const values = ['John ', ' John', 'John  Doe', 'John.Doe', 'John_Doe', '!John'];
		values.forEach((value) => {
			const control = new FormControl(value);
			expect(nameValidator(control)).toEqual({ invalid_name: true });
		});
	});
});
