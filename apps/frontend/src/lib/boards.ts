export interface myListBoardsResponse {
	data: Board[];
	message: string;
	status: number;
}

export interface Board<T = Date> {
	createdDate: T;
	id: string;
	name: string;
	origin: string;
	thingsIds: string[];
	userId: string;
}

export async function myListBoards(token: string): Promise<Board[] | false> {
	try {
		const response = await fetch('http://192.168.100.42:3000/api/boards/my-list', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const json: myListBoardsResponse = await response.json();
		if (!json || typeof json.data !== 'object') return false;

		return json.data;
	} catch (err) {
		console.error(err);
		return false;
	}
}
