<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$components/Header.svelte';
	import CPU from '$components/icons/CPU.svelte';
	import LED from '$components/icons/LED.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import { checkSession } from '$lib/users';
	import { myListBoards, type Board } from '$lib/boards';
	import { myListThings, type Thing } from '$lib/things';
	import { onMount } from 'svelte';

	let name = $state('');
	let email = $state('');

	let things: Thing<never, string>[] = $state([]);
	let boards: Board<string>[] = $state([]);

	onMount(async () => {
		const rawSession = localStorage.getItem('session');
		if (rawSession === null) return goto('/signin');

		const session = await checkSession(rawSession);

		if (session === false) return location.reload();
		if (typeof session !== 'object') return goto('/signin');
		if (!session.name) return location.reload();

		localStorage.setItem('session', JSON.stringify(session));

		name = session.name;
		email = session.email;

		const results = await Promise.allSettled([
			myListBoards(session.token),
			myListThings(session.token)
		]);

		const boardsList = results[0];
		const thingsList = results[1];

		if (boardsList.status === 'rejected' || boardsList.value === false) return location.reload();
		if (thingsList.status === 'rejected' || thingsList.value === false) return location.reload();

		boards = boardsList.value.map((board) => ({
			...board,
			createdDate: new Date(board.createdDate.toString()).toDateString()
		}));
		things = thingsList.value.map((thing) => ({
			...thing,
			createdDate: new Date(thing.createdDate.toString()).toDateString()
		}));
	});
</script>

{#snippet item(type: 'thing' | 'board', itemName: string, createdDate: string)}
	<div class="{type}s__list__body__item">
		<div class="{type}s__list__body__item__name">
			<div class="{type}s__list__body__item__name__icon">
				{#if type === 'thing'}
					<LED />
				{:else}
					<CPU />
				{/if}
			</div>
			<span class="{type}s__list__body__item__name__tittle">{itemName}</span>
		</div>
		<div>{createdDate}</div>
		<div>{email}</div>
	</div>
{/snippet}

{#snippet emptyList(type: 'thing' | 'board')}
	<div class="{type}s__list__body__item--void">
		The {type}s list is empty
	</div>
{/snippet}

<Sidebar path="/" {name} {email} />

<section class="max-md:w-full md:px-5">
	<Header />
	<hr class="mt-2 mb-4 border-ayu-line max-md:mx-5" />
	<article class="things mb-4">
		<h2 class="things__title">Things</h2>
		<div class="things__list">
			<div class="things__list__header">
				<div>Name</div>
				<div>Created Date</div>
				<div>Owner</div>
			</div>
			<div class="things__list__body">
				{#if things.length === 0}
					{@render emptyList('thing')}
				{/if}
				{#each things as thing, i}
					{#if i !== 0}
						<hr class="border-ayu-line" />
						{@render item('thing', thing.name, thing.createdDate)}
					{:else}
						{@render item('thing', thing.name, thing.createdDate)}
					{/if}
				{/each}
			</div>
		</div>
	</article>
	<article class="boards">
		<h2 class="boards__title">Board</h2>
		<div class="boards__list">
			<div class="boards__list__header">
				<div>Name</div>
				<div>Created Date</div>
				<div>Owner</div>
			</div>
			<div class="boards__list__body">
				{#if boards.length === 0}
					{@render emptyList('board')}
				{/if}
				{#each boards as board, i}
					{#if i !== 0}
						<hr class="border-ayu-line" />
						{@render item('board', board.name, board.createdDate)}
					{:else}
						{@render item('board', board.name, board.createdDate)}
					{/if}
				{/each}
			</div>
		</div>
	</article>
</section>

<style lang="postcss">
	@reference '../layout.css';

	@layer components {
		.things,
		.boards {
			@apply flex w-full flex-col gap-4 rounded-lg;
		}

		.things__title,
		.boards__title {
			@apply text-xl font-bold text-ayu-fg;
		}

		.things__list,
		.boards__list {
			@apply rounded-lg border border-ayu-line p-2;
		}

		.things__list__header,
		.boards__list__header {
			@apply mb-1 grid h-10 w-full grid-cols-3 place-content-center rounded-lg bg-ayu-line pl-2 text-ayu-fg;
		}

		.things__list__body,
		.boards__list__body {
			@apply flex flex-col gap-1;
		}

		.things__list__body__item--void,
		.boards__list__body__item--void {
			@apply flex h-12 w-full items-center justify-center rounded-lg pl-2 font-semibold text-ayu-fg transition-colors duration-300;
		}

		.things__list__body__item,
		.boards__list__body__item {
			@apply grid h-12 w-full grid-cols-3 items-center rounded-lg pl-2 font-semibold text-ayu-fg transition-colors duration-300 hover:bg-ayu-cyan/30;
		}
		.things__list__body__item {
			@apply hover:bg-ayu-cyan/30;
		}

		.boards__list__body__item {
			@apply hover:bg-ayu-purple/30;
		}

		.things__list__body__item__name,
		.boards__list__body__item__name {
			@apply flex gap-2;
		}

		.things__list__body__item__name__icon,
		.boards__list__body__item__name__icon {
			@apply h-7 w-7 rounded-lg border p-1.5;
		}

		.things__list__body__item__name__icon {
			@apply border-ayu-cyan bg-ayu-cyan/60 text-ayu-cyan;
		}

		.boards__list__body__item__name__icon {
			@apply border-ayu-purple bg-ayu-purple/60 text-ayu-purple;
		}
	}
</style>
