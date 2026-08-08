export interface myListThingsResponse {
	data: Thing[];
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

export async function myListThings(token: string): Promise<Thing[] | false> {
	try {
		const response = await fetch('http://192.168.100.42:3000/api/things/my-list', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const json: myListThingsResponse = await response.json();
		if (!json || typeof json.data !== 'object') return false;

		return json.data;
	} catch (err) {
		console.error(err);
		return false;
	}
}
