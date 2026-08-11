<script lang="ts">
	import Alert from '$components/icons/Alert.svelte';
	import { updateThing } from '$lib/things';
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
	let thingUpdated = $state({
		name: thingCtx.thingSelected.name,
		type: thingCtx.thingSelected.type
	});

	$effect(() => {
		thingUpdated.name = thingCtx.thingSelected.name;
		thingUpdated.type = thingCtx.thingSelected.type;
	});

	function setErrorMessage(message: string, el: HTMLElement) {
		el.removeAttribute('hidden');
		let elementErrorMessage = el.querySelector('div#error-message-update');
		if (elementErrorMessage instanceof HTMLElement) {
			elementErrorMessage.textContent = message;
		}
	}

	onMount(() => {
		const elementFormErrorMessage = document.querySelector('div#error-message-update-form');
		const elementFormPasswordErrorMessage = document.querySelector(
			'div#error-message-update-password'
		);

		if (
			!(elementFormErrorMessage instanceof HTMLElement) ||
			!(elementFormPasswordErrorMessage instanceof HTMLElement)
		)
			return;

		elementFormErrorMessage.setAttribute('hidden', 'true');
		elementFormPasswordErrorMessage.setAttribute('hidden', 'true');

		let elementButtonUpdate = document.querySelector('button.things__form-update__button');

		if (!(elementButtonUpdate instanceof HTMLButtonElement)) return;

		elementButtonUpdate.addEventListener('click', async (e) => {
			e.preventDefault();
			const thing = {
				name: thingUpdated.name,
				type: thingUpdated.type.toLowerCase() as 'output' | 'input'
			};

			if (!password || !password.trim())
				return setErrorMessage('Password is invalid', elementFormPasswordErrorMessage);

			const status = await updateThing(
				thingCtx.token,
				thingCtx.thingSelected.id,
				password,
				thing.name,
				thing.type
			);

			if (status === false) {
				setErrorMessage('Invalid request', elementFormErrorMessage);
				setErrorMessage('Invalid password', elementFormPasswordErrorMessage);
				return;
			}

			thingUpdated.name = '';
			thingUpdated.type = '';

			password = '';
			thingCtx.isUpdating = false;
			location.reload();
		});
	});
</script>

<form
	class="things__form-update"
	hidden={!(thingCtx.isUpdating === true && thingCtx.thingSelected.id.length > 0)}
>
	<div>
		<h2 class="text-3xl font-bold text-ayu-fg">Update Thing</h2>
		<div id="error-message-update-form" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-update"></div>
			<div class="cube"></div>
		</div>
	</div>

	<div class="relative">
		<input
			class="things__form-update__input"
			type="text"
			placeholder="Name"
			bind:value={thingUpdated.name}
		/>
		<div id="error-message-update-name" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-update">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<div class="relative">
		<select class="things__form-update__input" bind:value={thingUpdated.type}>
			<option value="input">Input</option>
			<option value="output">Output</option>
		</select>
		<div id="error-message-update-type" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-update">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<div class="relative">
		<input
			class="things__form-update__input"
			type="text"
			placeholder="Your password"
			bind:value={password}
		/>
		<div id="error-message-update-password" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-update">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<button class="things__form-update__button">Update</button>
</form>

<style lang="postcss">
	@reference '../../routes/layout.css';

	@layer components {
		.things__form-update {
			@apply mx-auto flex w-100 flex-col gap-4 rounded-lg border-2 border-ayu-line p-4;
		}

		.things__form-update > div > div {
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

		.things__form-update > div > div > div.cube {
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

		.things__form-update__input {
			@apply flex h-10 w-full items-center rounded-lg border-2 border-ayu-line pl-4 font-semibold text-ayu-fg outline-none;
		}

		.things__form-update__button {
			@apply mx-auto h-10 w-30 rounded-xl bg-ayu-orange font-semibold text-ayu-yellow transition-colors duration-400 hover:cursor-pointer hover:bg-ayu-accent;
		}
	}
</style>
