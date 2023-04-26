import { FormControl } from '@angular/forms';
import { ageMaxValidator, ageMinValidator, notInFutureValidator } from './date.directive';

describe('ageMinValidator', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(ageMinValidator()(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('2000-01-01');
		expect(ageMinValidator()(control)).toBeNull();
	});

	it('should return an error if the control is invalid', () => {
		const control = new FormControl('2000-01-01');
		expect(ageMinValidator(1000)(control)).toEqual({ age_minimum: true });
	});
});

describe('ageMaxValidator', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(ageMaxValidator()(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('2000-01-01');
		expect(ageMaxValidator()(control)).toBeNull();
	});

	it('should return an error if the control is invalid', () => {
		const control = new FormControl('2001-01-01');
		expect(ageMaxValidator(1)(control)).toEqual({ age_maximum: true });
	});
});

describe('notInFutureValidator', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(notInFutureValidator(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('2000-01-01');
		expect(notInFutureValidator(control)).toBeNull();
	});

	it('should return an error if the control is invalid', () => {
		const control = new FormControl('3000-01-01');
		expect(notInFutureValidator(control)).toEqual({ not_in_future: true });
	});
});
