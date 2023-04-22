/**
 * Check if the email is valid or not
 * @param {string} email The email to check
 * @param {boolean} utbm If the email shouldn't be a utbm.fr email (default: true)
 * @returns {string|undefined} The error message or undefined (if the email is valid)
 */
export const validateEmail = (email: string, utbm = true): string | undefined => {
	if (email === '') return 'global.errors.email.required';
	if (/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email) === false)
		return 'global.errors.email.invalid';
	if (utbm && /@utbm\.fr$/.test(email)) return 'global.errors.email.utbm';
	return undefined;
};

export const validateBirthDate = (birthDate: string, max = 64, min = 13): string | undefined => {
	const year = new Date().getFullYear();
	const birthDateYear = new Date(birthDate).getFullYear();

	if (birthDate === '') return 'global.errors.birth_date.required';
	if (new Date(birthDate).getTime() > new Date().getTime()) return 'global.errors.birth_date.future';
	if (birthDateYear < year - max || birthDateYear > year - min) return 'global.errors.birth_date.invalid';

	return undefined;
};

export const validatePassword = (password: string): string | undefined => {
	if (password === '') return 'global.errors.password.required';
	// at least 8 characters
	if (password.length < 8) return 'global.errors.password.length';

	// at least 1 digit
	if (/\d/.test(password) === false) return 'global.errors.password.digit';

	// at least 1 special character
	if (/[\W_]+/.test(password) === false) return 'global.errors.password.special';

	// at least 1 uppercase letter
	if (/[A-Z]/.test(password) === false) return 'global.errors.password.uppercase';

	// at least 1 lowercase letter
	if (/[a-z]/.test(password) === false) return 'global.errors.password.lowercase';

	// no duplicate characters (case insensitive)
	if (
		password.match(/([a-z])\1+/g) !== null ||
		password.match(/([A-Z])\1+/g) !== null ||
		password.match(/([0-9])\1+/g) !== null
	)
		return 'global.errors.password.duplicate';

	return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
	if (confirmPassword === '') return 'global.errors.password.confirm';
	if (password !== confirmPassword) return 'global.errors.password.confirm_mismatch';

	return undefined;
};
