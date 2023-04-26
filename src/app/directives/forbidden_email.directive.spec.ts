import { FormControl } from '@angular/forms';
import { forbiddenEmailValidator } from './forbidden_email.directive';

describe('forbiddenEmailValidator', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(forbiddenEmailValidator('@utbm.fr')(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('@gmail.com');
		expect(forbiddenEmailValidator('@utbm.fr')(control)).toBeNull();
	});

	it('should return error if the control is not valid', () => {
		const control = new FormControl('someone@utbm.fr');
		expect(forbiddenEmailValidator('@utbm.fr')(control)).toEqual({ forbidden_email: true });
	});
});
