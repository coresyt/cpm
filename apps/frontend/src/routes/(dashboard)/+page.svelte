<script lang="ts">
	import Header from '$components/Header.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import { getAccount } from '$lib/users';
	import { onMount } from 'svelte';

	let name = $state('');
	let email = $state('');

	onMount(async () => {
		const rawSession = localStorage.getItem('session');

		if (rawSession === null) return location.assign('/signin');

		const session = JSON.parse(rawSession) as LocalStorageSession;

		if (session.token === null || !session.token.trim) return location.assign('/signin');

		if (!session.email || !session.name) {
			const account = await getAccount(session.token);

			if (account === false) return location.reload();

			const newSession = {
				email: account.email,
				name: account.name,
				token: session.token
			};
			localStorage.setItem('session', JSON.stringify(newSession));

			email = account.email;
			name = account.name;
			return;
		}

		email = session.email;
		name = session.name;
	});
</script>

<main class="h-dvh w-full">
	<Sidebar path="/" {name} {email} />
	<section class="max-md:w-full md:px-5">
		<Header />
		<hr class="border-ayu-line max-md:mx-5" />
	</section>
</main>

<style lang="postcss">
	@reference 'layout.css';

	@layer components {
		@media (width >= 768px) {
			main {
				display: grid;
				grid-template-columns: 250px 1fr;
			}
		}
	}
</style>
