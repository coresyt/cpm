export interface Board<T = Date> {
	createdDate: T;
	id: string;
	name: string;
	origin: string;
	thingsIds: string[];
	userId: string;
}

export interface ListBoardsResponse {
	data: Board[];
	message: string;
	status: number;
}

export interface CreateBoardTokenResponse {
	status: number;
	message: string;
	token: string;
}

export interface GenericBoardResponse {
	status: number;
	message: string;
}
