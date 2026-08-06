interface UserSignUp {
	name: string;
	email: string;
	password: string;
}

interface UserSignIn {
	email: string;
	password: string;
}

interface UserSignUpErrors {
	nameError: string;
	emailError: string;
	passwordError: string;
}

interface UserSignInErrors {
	emailError: string;
	passwordError: string;
}

export const enum TypeValidate {
	SIGNUP,
	SIGNIN
}

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

export async function signUp(user: UserSignUp): Promise<[string, boolean] | false> {
	console.log({ user, userStringify: JSON.stringify(user) });

	try {
		const response = await fetch('http://localhost:3000/api/auth/signup', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(user)
		});

		const json = await response.json();

		if (!json || typeof json.token !== 'string') {
			return false;
		}

		if (json.message && json.status === 400 && response.status) return [json.message, false];

		return [json.token, true];
	} catch (error) {
		console.error('Error during signup:', error);
		return false;
	}
}

export async function signIn(user: UserSignIn): Promise<[string, boolean] | false> {
	console.log({ user, userStringify: JSON.stringify(user) });

	try {
		const response = await fetch('http://localhost:3000/api/auth/signin', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(user)
		});

		const json = await response.json();

		if (!json || typeof json.token !== 'string') {
			return false;
		}

		if (json.message && json.status === 400 && response.status) return [json.message, false];

		return [json.token, true];
	} catch (error) {
		console.error('Error during signup:', error);
		return false;
	}
}
