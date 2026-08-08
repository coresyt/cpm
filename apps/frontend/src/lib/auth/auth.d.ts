export interface UserSignUp {
	name: string;
	email: string;
	password: string;
}

export interface UserSignIn {
	email: string;
	password: string;
}

export interface UserSignUpErrors {
	nameError: string;
	emailError: string;
	passwordError: string;
}

export interface UserSignInErrors {
	emailError: string;
	passwordError: string;
}

export interface UserChangePassword {
	password: string;
	newpassword: string;
}

export interface UserSignOut {
	email: string;
	password: string;
}
