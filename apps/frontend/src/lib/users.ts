interface Account {
	createdDate: Date;
	email: string;
	id: string;
	name: string;
	role: string;
}

export async function getAccount(token: string): Promise<Account | false> {
	try {
		const response = await fetch('http://localhost:3000/api/user/account', {
			headers: { authorization: `Bearer ${token}` }
		});

		const json = await response.json();

		if (!json || typeof json.token !== 'string') {
			return false;
		}

		if (json.status !== 200) return false;

		return json.account;
	} catch (error) {
		console.error('Error during signup:', error);
		return false;
	}
}

export async function checkSession(
	rawSession: string
): Promise<LocalStorageSession | void | false> {
	const session = JSON.parse(rawSession) as LocalStorageSession;

	if (session.token === null || !session.token.trim()) return;

	if (typeof session !== 'object') return;

	if (session.email && session.name) return session;

	const account = await getAccount(session.token);

	if (account === false) return false;

	return {
		email: account.email,
		name: account.name,
		token: session.token
	};
}
