import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
	hasNoDuplicateCharacters,
	hasOneDigit,
	hasOneLowercase,
	hasOneSpecialCharacter,
	hasOneUppercase,
	passwordsMatchValidator,
} from './password.directive';

describe('hasOneDigit', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(hasOneDigit(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('123');
		expect(hasOneDigit(control)).toBeNull();
	});

	it('should return error if the control is not valid', () => {
		const control = new FormControl('abc');
		expect(hasOneDigit(control)).toEqual({ has_one_digit: true });
	});
});

describe('hasOneSpecialCharacter', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(hasOneSpecialCharacter(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('@bc');
		expect(hasOneSpecialCharacter(control)).toBeNull();
	});

	it('should return error if the control is not valid', () => {
		const control = new FormControl('abc');
		expect(hasOneSpecialCharacter(control)).toEqual({ has_one_special_character: true });
	});
});

describe('hasOneLowercase', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(hasOneLowercase(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('abc');
		expect(hasOneLowercase(control)).toBeNull();
	});

	it('should return error if the control is not valid', () => {
		const control = new FormControl('ABC');
		expect(hasOneLowercase(control)).toEqual({ has_one_lowercase: true });
	});
});

describe('hasOneUppercase', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(hasOneUppercase(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('ABC');
		expect(hasOneUppercase(control)).toBeNull();
	});

	it('should return error if the control is not valid', () => {
		const control = new FormControl('abc');
		expect(hasOneUppercase(control)).toEqual({ has_one_uppercase: true });
	});
});

describe('hasNoDuplicateCharacters', () => {
	it('should return null if the control is empty', () => {
		const control = new FormControl();
		expect(hasNoDuplicateCharacters(control)).toBeNull();
	});

	it('should return null if the control is valid', () => {
		const control = new FormControl('abc');
		expect(hasNoDuplicateCharacters(control)).toBeNull();
	});

	it('should return error if the control is not valid', () => {
		const control = new FormControl('aabc');
		expect(hasNoDuplicateCharacters(control)).toEqual({ has_no_duplicate_characters: true });
	});
});

describe('passwordsMatchValidator', () => {
	const fb = new FormBuilder();
	const control: FormGroup = fb.group({
		password: ['', [Validators.required]],
		passwordConfirm: ['', [Validators.required]],
	});

	it('should return error if the passwords do not match', () => {
		control.get('password')?.setValue('abc');
		control.get('passwordConfirm')?.setValue('def');
		expect(passwordsMatchValidator()(control)).toEqual({ passwords_match: true });
	});

	it('should return null if the passwords match', () => {
		control.get('password')?.setValue('abc');
		control.get('passwordConfirm')?.setValue('abc');
		expect(passwordsMatchValidator()(control)).toBeNull();
	});
});
