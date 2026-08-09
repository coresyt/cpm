<script lang="ts">
	import { goto } from '$app/navigation';
	import Sidebar from '$components/Sidebar.svelte';
	import { checkSession, getAccount } from '$lib/users';
	import type { Account } from '$lib/users';
	import { onMount } from 'svelte';

	let account: Account<string> = $state({ createdDate: '', email: '', id: '', name: '', role: '' });

	let isHidden = $state(true);
	let newName = $state('');
	let newEmail = $state('');

	onMount(async () => {
		const rawSession = localStorage.getItem('session');
		if (rawSession === null) return goto('/signin');

		const session = await checkSession(rawSession);

		if (session === false) return location.reload();
		if (typeof session !== 'object') return goto('/signin');

		localStorage.setItem('session', JSON.stringify(session));

		const res = await getAccount(session.token);
		if (res === false) return location.reload();

		account = { ...res, createdDate: new Date(res.createdDate.toString()).toDateString() };
	});
</script>

<Sidebar path="/account" name={account.name} email={account.email} />
<section class="account-settings">
	<h2 class="account-settings__title">Account</h2>
	<hr class="mb-4 border-ayu-line" />
	<div class="account-settings__properties">
		<div
			class={`account-settings__properties__propertie ${isHidden ? 'disabled cursor-not-allowed' : '[&>input]:text-ayu-fg'}`}
		>
			<h3 class="account-settings__properties__propertie__title">Name</h3>
			<p class="account-settings__properties__propertie__value" hidden={!isHidden}>
				{account.name}
			</p>
			<input
				type="text"
				bind:value={newName}
				class="account-settings__properties__propertie__value"
				hidden={isHidden}
			/>
		</div>
		<div class="account-settings__properties__propertie disabled cursor-not-allowed">
			<h3 class="account-settings__properties__propertie__title">Role</h3>
			<p class="account-settings__properties__propertie__value">{account.role}</p>
		</div>
		<div
			class={`account-settings__properties__propertie ${isHidden ? 'disabled cursor-not-allowed' : '[&>input]:text-ayu-fg'}`}
		>
			<h3 class="account-settings__properties__propertie__title">Email</h3>
			<p class="account-settings__properties__propertie__value" hidden={!isHidden}>
				{account.email}
			</p>
			<input
				type="email"
				bind:value={newEmail}
				class="account-settings__properties__propertie__value"
				hidden={isHidden}
			/>
		</div>
		<div class="account-settings__properties__propertie disabled cursor-not-allowed">
			<h3 class="account-settings__properties__propertie__title">Created At</h3>
			<p class="account-settings__properties__propertie__value">{account.createdDate}</p>
		</div>
		<div class="flex gap-4">
			<button
				class="account-settings__properties__edit"
				onclick={() => {
					isHidden = !isHidden;
				}}>{isHidden ? 'Edit' : 'Cancel'}</button
			>
			<button
				class="account-settings__properties__save"
				hidden={isHidden}
				onclick={() => {
					isHidden = !isHidden;
				}}>Save Changes</button
			>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference '../../layout.css';

	@layer components {
		.account-settings {
			@apply max-md:w-full md:px-5;
		}

		.account-settings__title {
			@apply mt-4 mb-4 h-12 text-4xl font-bold text-ayu-orange max-md:flex max-md:justify-center md:pl-4;
		}

		.account-settings__properties {
			display: grid;
			grid-template-rows: repeat(5, 1fr);
			@apply gap-4 rounded-lg border border-ayu-line p-4 max-md:mx-4;
		}

		.account-settings__properties__propertie {
			display: grid;
			gap: 16px;
			grid-template-columns: auto 1fr;
			@apply overflow-hidden rounded-lg border border-ayu-line transition-colors duration-300;

			&.disabled {
				@apply bg-ayu-muted/5;
			}
		}

		.account-settings__properties__edit {
			@apply flex h-full w-20 items-center justify-center rounded-lg border border-ayu-line bg-ayu-panel py-4 font-bold text-ayu-fg transition-all duration-300 hover:bg-ayu-panel/30 hover:text-ayu-line;
		}

		.account-settings__properties__save {
			@apply flex h-full w-32 items-center justify-center rounded-lg border border-ayu-accent bg-ayu-orange/75 py-4 font-bold text-ayu-accent transition-all duration-300 hover:bg-ayu-orange/55 hover:text-ayu-accent/90;
		}

		.account-settings__properties__propertie__title {
			@apply flex h-full w-32 items-center justify-start rounded-r-lg border-r border-r-ayu-line bg-ayu-panel p-4 font-semibold text-ayu-fg;
		}

		.account-settings__properties__propertie__value {
			@apply flex h-full items-center justify-end rounded-lg py-4 pr-4 text-end text-ayu-muted outline-none;
		}
	}
</style>
