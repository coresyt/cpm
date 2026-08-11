<script lang="ts">
	import Alert from '$components/icons/Alert.svelte';
	import { deleteThing } from '$lib/things';
	import { onMount } from 'svelte';

	interface Props {
		thingCtx: {
			isCreating: boolean;
			isUpdating: boolean;
			isDeleting: boolean;
			thingSelected: {
				id: string;
				name: string;
				type: string;
			};
			token: string;
		};
	}

	let { thingCtx = $bindable() }: Props = $props();

	let password = $state('');

	function setErrorMessage(message: string, el: HTMLElement) {
		el.removeAttribute('hidden');
		let elementErrorMessage = el.querySelector('div#error-message-delete');
		if (elementErrorMessage instanceof HTMLElement) {
			elementErrorMessage.textContent = message;
		}
	}

	onMount(() => {
		const elementFormErrorMessage = document.querySelector('div#error-message-delete-form');
		const elementFormPasswordErrorMessage = document.querySelector(
			'div#error-message-delete-password'
		);

		if (
			!(elementFormErrorMessage instanceof HTMLElement) ||
			!(elementFormPasswordErrorMessage instanceof HTMLElement)
		)
			return;

		elementFormErrorMessage.setAttribute('hidden', 'true');
		elementFormPasswordErrorMessage.setAttribute('hidden', 'true');

		let elementButtonDelete = document.querySelector('button.things__form-delete__button');

		if (!(elementButtonDelete instanceof HTMLButtonElement)) return;

		elementButtonDelete.addEventListener('click', async (e) => {
			e.preventDefault();

			if (!password || !password.trim())
				return setErrorMessage('Password is invalid', elementFormPasswordErrorMessage);

			const status = await deleteThing(thingCtx.token, thingCtx.thingSelected.id, password);

			if (status === false) {
				setErrorMessage('Invalid request', elementFormErrorMessage);
				setErrorMessage('Invalid password', elementFormPasswordErrorMessage);
				return;
			}

			password = '';
			thingCtx.isDeleting = false;
			location.reload();
		});
	});
</script>

<div class="flex h-[calc(100vh-116px)] items-center justify-center">
	<form
		class="things__form-delete"
		hidden={!(thingCtx.isDeleting === true && thingCtx.thingSelected.id.length > 0)}
	>
		<div>
			<h2 class="text-3xl font-bold text-ayu-fg">Delete Thing</h2>
			<div id="error-message-delete-form" hidden={true}>
				<div><Alert /></div>
				<div id="error-message-delete"></div>
				<div class="cube"></div>
			</div>
		</div>
		<h2 class="h-6 text-lg font-medium text-ayu-fg">With name: {thingCtx.thingSelected.name}</h2>
		<p class="h-6 text-lg font-medium text-ayu-fg">And type: {thingCtx.thingSelected.type}</p>
		<div>
			<input
				type="text"
				class="things__form-delete__input"
				placeholder="Password"
				bind:value={password}
			/>
			<div id="error-message-delete-password" hidden={true}>
				<div><Alert /></div>
				<div id="error-message-delete"></div>
				<div class="cube"></div>
			</div>
		</div>
		<button class="things__form-delete__button">Delete Thing</button>
	</form>
</div>

<style lang="postcss">
	@reference '../../routes/layout.css';

	@layer components {
		.things__form-delete {
			@apply flex w-100 flex-col gap-4 rounded-lg border-2 border-ayu-line p-4;
		}

		.things__form-delete > div > div {
			position: absolute;
			display: flex;
			top: -60%;
			transform: translateX(80%);
			gap: 5px;
			align-items: center;
			justify-content: center;
			background-color: theme(--color-ayu-line);
			padding: 2px 10px 4px;
			border-radius: 12px;
			color: theme(--color-ayu-red);
			font-weight: 600;
		}

		.things__form-delete > div > div > div.cube {
			position: absolute;
			z-index: 2;
			top: 22px;
			left: 0;
			right: 0;
			margin: 0 auto;
			rotate: 50deg;
			width: 15px;
			height: 15px;
			background-color: theme(--color-ayu-line);
		}

		.things__form-delete__input {
			@apply flex h-10 w-full items-center rounded-lg border-2 border-ayu-line pl-4 font-semibold text-ayu-fg outline-none;
		}

		.things__form-delete__button {
			@apply mx-auto h-10 w-30 rounded-xl bg-ayu-orange font-semibold text-ayu-yellow transition-colors duration-400 hover:cursor-pointer hover:bg-ayu-accent;
		}
	}
</style>
