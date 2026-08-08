import { TypeValidate } from '.';
import type { UserSignIn, UserSignInErrors, UserSignUp, UserSignUpErrors } from './auth';

export function validateForm(
	type: TypeValidate.SIGNIN,
	user: UserSignIn
): { errors: UserSignInErrors; isValid: boolean };
export function validateForm(
	type: TypeValidate.SIGNUP,
	user: UserSignUp
): { errors: UserSignUpErrors; isValid: boolean };
export function validateForm(
	type: TypeValidate,
	user: UserSignIn | UserSignUp
): { errors: UserSignInErrors | UserSignUpErrors; isValid: boolean } | false {
	let isValid = true;

	if (type === TypeValidate.SIGNIN) {
		const errors = {
			emailError: '',
			passwordError: ''
		} as UserSignInErrors;
		const data = user as UserSignIn;

		errors.emailError = '';
		errors.passwordError = '';

		if (!data.email || !data.email.trim()) {
			errors.emailError = 'Email is invalid';
			isValid = false;
		}

		if (!data.password || !data.password.trim()) {
			errors.passwordError = 'Password is invalid';
			isValid = false;
		}

		return {
			errors,
			isValid
		};
	} else if (type === TypeValidate.SIGNUP) {
		const errors = {
			nameError: '',
			emailError: '',
			passwordError: ''
		} as UserSignUpErrors;
		const data = user as UserSignUp;

		errors.nameError = '';
		errors.emailError = '';
		errors.passwordError = '';

		if (!data.name || !data.name.trim()) {
			errors.nameError = 'Name is invalid';
			isValid = false;
		}

		if (!data.email || !data.email.trim()) {
			errors.emailError = 'Email is invalid';
			isValid = false;
		}

		if (!data.password || !data.password.trim()) {
			errors.passwordError = 'Password is invalid';
			isValid = false;
		}
		return {
			errors,
			isValid
		};
	}
	return false;
}
