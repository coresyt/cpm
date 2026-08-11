<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Sidebar from '$components/Sidebar.svelte';
	import ThingItem from '$components/things/ThingItem.svelte';
	import FormCreateThing from '$components/things/FormCreateThing.svelte';
	import FormUpdateThing from '$components/things/FormUpdateThing.svelte';
	import type { Thing } from '$lib/things';
	import { myListThings } from '$lib/things';
	import FormDeleteThing from '$components/things/FormDeleteThing.svelte';
	import { checkSession } from '$lib/users';

	let name = $state('');
	let email = $state('');
	let things: Thing<never, string>[] = $state([]);

	interface ThingContext {
		isCreating: boolean;
		isUpdating: boolean;
		isDeleting: boolean;
		thingSelected: {
			id: string;
			name: string;
			type: string;
		};
		token: string;
	}

	let thingCtx = $state<ThingContext>({
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		thingSelected: {
			id: '',
			name: '',
			type: ''
		},
		token: ''
	});

	function setActionMode(mode: 'create' | 'update' | 'delete') {
		thingCtx.isCreating = mode === 'create' ? !thingCtx.isCreating : false;
		thingCtx.isUpdating = mode === 'update' ? !thingCtx.isUpdating : false;
		thingCtx.isDeleting = mode === 'delete' ? !thingCtx.isDeleting : false;
	}

	onMount(async () => {
		const rawSession = localStorage.getItem('session');
		if (rawSession === null) return goto('/signin');

		const session = await checkSession(rawSession);

		if (session === false) return location.reload();
		if (typeof session !== 'object' || typeof session.name !== 'string') return goto('/signin');

		localStorage.setItem('session', JSON.stringify(session));
		name = session.name;
		email = session.email;

		thingCtx.token = session.token;

		const res = await myListThings(session.token);
		if (res === false) return location.reload();

		things = res.map((th) => ({
			...th,
			createdDate: new Date(th.createdDate.toString()).toLocaleString('es-MX', {
				dateStyle: 'full',
				timeStyle: 'short'
			})
		}));
	});
</script>

<Sidebar path="/things" {name} {email} />
<section class="things">
	<header class="things__header">
		<h2 class="things__header__title">Things</h2>
		<div class="things__header__options">
			<button
				class="things__header__options__option"
				data-button-create
				onclick={() => setActionMode('create')}>Create</button
			>
			<button
				class="things__header__options__option"
				data-button-update
				onclick={() => setActionMode('update')}>Update</button
			>
			<button
				class="things__header__options__option"
				data-button-delete
				onclick={() => setActionMode('delete')}>Delete</button
			>
		</div>
	</header>
	<hr class="mb-4 border-ayu-line" />
	<article
		class="things__table"
		hidden={thingCtx.isCreating === true ||
			(thingCtx.isUpdating === true && thingCtx.thingSelected.id.length > 0) ||
			(thingCtx.isDeleting === true && thingCtx.thingSelected.id.length > 0)}
	>
		<div class="px-2 pt-2">
			<div class="things__table__header">
				<div class="col-span-2 font-semibold">Name</div>
				<div class="font-semibold">Value</div>
				<div class="font-semibold">Input/Output</div>
				<div class="col-span-2 font-semibold">Created Date</div>
			</div>
		</div>
		<div class="things__table__body">
			{#each things as thing, i}
				{#if i !== 0}
					<hr class=" border-ayu-line" />
				{/if}
				<ThingItem bind:thingCtx {thing} {things} />
			{/each}
			{#if things.length === 0}
				<div class="col-span-6 flex h-10 items-center justify-center font-bold text-ayu-fg">
					Empty List
				</div>
			{/if}
		</div>
	</article>
	{#if thingCtx.isCreating}
		<FormCreateThing bind:thingCtx />
	{/if}
	{#if thingCtx.isUpdating}
		<FormUpdateThing bind:thingCtx />
	{/if}
	{#if thingCtx.isDeleting}
		<FormDeleteThing bind:thingCtx />
	{/if}
</section>

<style lang="postcss">
	@reference '../../layout.css';

	@layer components {
		.things {
			@apply mb-4 w-full md:px-5;
		}

		.things__header {
			@apply mb-1 flex h-18.75 w-full items-center max-lg:h-28 max-lg:flex-col max-md:flex max-md:justify-center md:justify-around md:px-4 lg:justify-between;
		}

		.things__header__title {
			@apply text-4xl font-bold text-ayu-orange;
		}

		.things__header__options {
			@apply flex items-center gap-3;
		}

		.things__header__options__option {
			@apply box-border cursor-pointer rounded-lg px-4 py-2 transition-all duration-200;

			&[data-button-create] {
				@apply bg-ayu-green/80 text-ayu-green hover:border hover:border-bs-ayu-green hover:bg-ayu-green/50 active:bg-ayu-green/80 active:text-ayu-green active:duration-100;
			}

			&[data-button-update] {
				@apply bg-ayu-purple/80 text-ayu-purple hover:border hover:border-bs-ayu-purple hover:bg-ayu-purple/50 active:bg-ayu-purple/80 active:text-ayu-purple active:duration-100;
			}

			&[data-button-delete] {
				@apply bg-ayu-red/80 text-ayu-red hover:border hover:border-bs-ayu-red hover:bg-ayu-red/50 active:bg-ayu-red/80 active:text-ayu-red active:duration-100;
			}
		}

		.things__table {
			@apply gap-2 overflow-hidden rounded-lg border-2 border-ayu-line;
		}

		.things__table__header {
			@apply grid h-12 grid-cols-6 rounded-lg bg-ayu-line;

			& > div {
				@apply flex h-full items-center pl-4 text-ayu-orange;
			}
		}

		.things__table__body {
			@apply flex flex-col gap-2 p-2;
		}
	}
</style>
