<script lang="ts">
	import Alert from '$components/icons/Alert.svelte';
	import { createThing } from '$lib/things';
	import type { ThingCreating } from '$lib/things';
	import { validateForm } from '$lib/things';
	import { onMount } from 'svelte';

	interface Props {
		thingCtx: {
			isCreating: boolean;
			isUpdating: boolean;
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
	let thingCreated = $state({
		name: '',
		type: '',
		value: ''
	});

	function setErrorMessage(message: string, el: HTMLElement) {
		el.removeAttribute('hidden');
		let elementErrorMessage = el.querySelector('div#error-message-create');
		if (elementErrorMessage instanceof HTMLElement) {
			elementErrorMessage.textContent = message;
		}
	}

	onMount(() => {
		const elementFormErrorMessage = document.querySelector('div#error-message-create-form');
		const elementFormNameErrorMessage = document.querySelector('div#error-message-create-name');
		const elementFormTypeErrorMessage = document.querySelector('div#error-message-create-type');
		const elementFormValueErrorMessage = document.querySelector('div#error-message-create-value');
		const elementFormPasswordErrorMessage = document.querySelector(
			'div#error-message-create-password'
		);

		if (
			!(elementFormErrorMessage instanceof HTMLElement) ||
			!(elementFormNameErrorMessage instanceof HTMLElement) ||
			!(elementFormTypeErrorMessage instanceof HTMLElement) ||
			!(elementFormValueErrorMessage instanceof HTMLElement) ||
			!(elementFormPasswordErrorMessage instanceof HTMLElement)
		)
			return;

		elementFormErrorMessage.setAttribute('hidden', 'true');
		elementFormNameErrorMessage.setAttribute('hidden', 'true');
		elementFormTypeErrorMessage.setAttribute('hidden', 'true');
		elementFormValueErrorMessage.setAttribute('hidden', 'true');
		elementFormPasswordErrorMessage.setAttribute('hidden', 'true');

		let elementButtonCreate = document.querySelector('button.things__form-create__button');

		if (!(elementButtonCreate instanceof HTMLButtonElement)) return;

		elementButtonCreate.addEventListener('click', async (e) => {
			e.preventDefault();
			const thing: ThingCreating<string> = {
				name: thingCreated.name,
				type: thingCreated.type.toLowerCase(),
				value: thingCreated.value.trim().split(',')
			};

			const { isValid, errors } = validateForm(thing);

			if (isValid === false) {
				if (errors.nameError.length > 0)
					setErrorMessage(errors.nameError, elementFormNameErrorMessage);

				if (errors.typeError.length > 0)
					setErrorMessage(errors.typeError, elementFormTypeErrorMessage);

				if (errors.valueError.length > 0)
					setErrorMessage(errors.valueError, elementFormValueErrorMessage);

				if (!password || !password.trim())
					setErrorMessage('Password is invalid', elementFormPasswordErrorMessage);

				return;
			}

			const status = await createThing(thingCtx.token, password, thing);

			if (status === false) {
				setErrorMessage('Invalid request', elementFormErrorMessage);
				setErrorMessage('Invalid password', elementFormPasswordErrorMessage);
				return;
			}

			thingCreated = {
				name: '',
				type: '',
				value: ''
			};
			password = '';
			thingCtx.isCreating = false;
			location.reload();
		});
	});
</script>

<form class="things__form-create">
	<div>
		<h2 class="text-3xl font-bold text-ayu-fg">Create Thing</h2>
		<div id="error-message-create-form" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-create"></div>
			<div class="cube"></div>
		</div>
	</div>

	<div class="relative">
		<input
			class="things__form-create__input"
			type="text"
			placeholder="Name"
			bind:value={thingCreated.name}
		/>
		<div id="error-message-create-name" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-create">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<div class="relative">
		<input
			class="things__form-create__input"
			type="text"
			placeholder="Input/Output"
			bind:value={thingCreated.type}
		/>
		<div id="error-message-create-type" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-create">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<div class="relative">
		<input
			class="things__form-create__input"
			type="text"
			placeholder="Value"
			bind:value={thingCreated.value}
		/>
		<div id="error-message-create-value" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-create">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<div class="relative">
		<input
			class="things__form-create__input"
			type="text"
			placeholder="Your password"
			bind:value={password}
		/>
		<div id="error-message-create-password" hidden={true}>
			<div><Alert /></div>
			<div id="error-message-create">Error</div>
			<div class="cube"></div>
		</div>
	</div>
	<button class="things__form-create__button">Update</button>
</form>

<style lang="postcss">
	@reference '../../routes/layout.css';

	@layer components {
		.things__form-create {
			@apply mx-auto flex w-100 flex-col gap-4 rounded-lg border-2 border-ayu-line p-4;
		}

		.things__form-create > div > div {
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

		.things__form-create > div > div > div.cube {
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

		.things__form-create__input {
			@apply flex h-10 w-full items-center rounded-lg border-2 border-ayu-line pl-4 font-semibold text-ayu-fg outline-none;
		}

		.things__form-create__button {
			@apply mx-auto h-10 w-30 rounded-xl bg-ayu-orange font-semibold text-ayu-yellow transition-colors duration-400 hover:cursor-pointer hover:bg-ayu-accent;
		}
	}
</style>
