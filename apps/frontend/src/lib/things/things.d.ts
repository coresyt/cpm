export interface ListThingsResponse {
	data: Thing[];
	message: string;
	status: number;
}

export interface GenericThingResponse {
	message: string;
	status: number;
}

export interface Thing<T = never, K = Date> {
	createdDate: K;
	id: string;
	name: string;
	type: string;
	userId: string;
	value: T[];
}

export interface ThingCreating<T = never> {
	name: string;
	type: string;
	value: T[];
}

export interface ThingCreatingErrors {
	nameError: string;
	typeError: string;
	valueError: string;
}
