import { getAccount } from './getAccount.users';

export async function checkSession(
	rawSession: string
): Promise<LocalStorageSession | void | false> {
	try {
		const session = JSON.parse(rawSession) as LocalStorageSession;

		if (!session || !session.token || !session.token.trim()) return false;

		if (session.email && session.name) return session;

		const account = await getAccount(session.token);

		if (account === false) return false;

		return {
			email: account.email,
			name: account.name,
			token: session.token
		};
	} catch (error) {
		console.error('Error during checkSession:', error);
		return false;
	}
}
