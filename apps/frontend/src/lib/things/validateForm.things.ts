import type { ThingCreating, ThingCreatingErrors } from './things.d';

export function validateForm<T>(thing: ThingCreating<T>): {
	errors: ThingCreatingErrors;
	isValid: boolean;
} {
	let isValid = true;
	const errors: ThingCreatingErrors = {
		nameError: '',
		typeError: '',
		valueError: ''
	};

	if (!thing.name || !thing.name.trim()) {
		errors.nameError = 'Name is invalid';
		isValid = false;
	}

	if (!thing.type || !thing.type.trim()) {
		errors.typeError = 'Type is invalid';
		isValid = false;
	}

	if (!thing.value) {
		errors.typeError = 'value is invalid';
		isValid = false;
	}

	return {
		errors,
		isValid
	};
}
