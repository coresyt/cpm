export interface Account<T = Date> {
	id: string;
	email: string;
	name: string;
	role: string;
	createdDate: T;
}
