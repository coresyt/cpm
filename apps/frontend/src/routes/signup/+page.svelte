<script lang="ts">
	import { onMount } from 'svelte';
	import Alert from '$components/icons/Alert.svelte';
	import { signUp, TypeValidate, validateForm } from '$lib/auth';
	import { goto } from '$app/navigation';
	import HiddenEye from '$components/icons/HiddenEye.svelte';
	import Eye from '$components/icons/Eye.svelte';

	function setErrorMessage(message: string, el: HTMLElement) {
		console.log(message);
		el.removeAttribute('hidden');
		let elementErrorMessage = el.querySelector('div#error-message');
		if (elementErrorMessage instanceof HTMLElement) {
			elementErrorMessage.textContent = message;
		}
	}

	onMount(() => {
		const token = localStorage.getItem('token');

		if (token !== null && token.length > 0) location.assign('/');

		const elementEye = document.querySelector('button#eye');
		const elementHiddenEye = document.querySelector('button#hidden-eye');
		const elementPassowrd = document.querySelector('input#form-password');

		if (!(elementEye instanceof HTMLButtonElement)) return;

		if (!(elementHiddenEye instanceof HTMLButtonElement)) return;

		if (!(elementPassowrd instanceof HTMLInputElement)) return;

		elementEye.addEventListener('click', (ev) => {
			ev.preventDefault();

			if (!document.startViewTransition()) return;

			document.startViewTransition(() => {
				elementEye.hidden = true;
				elementHiddenEye.hidden = false;
				elementPassowrd.setAttribute('type', 'text');
			});
		});

		elementHiddenEye.addEventListener('click', (ev) => {
			ev.preventDefault();
			if (!document.startViewTransition()) return;

			document.startViewTransition(() => {
				elementHiddenEye.hidden = true;
				elementEye.hidden = false;
				elementPassowrd.setAttribute('type', 'password');
			});
		});

		const elementFormName = document.querySelector('input#form-name');
		const elementFormEmail = document.querySelector('input#form-email');
		const elementFormPassword = document.querySelector('input#form-password');
		const elementFormButton = document.querySelector('button#form-button');

		const elementFormErrorMessage = document.querySelector('div#error-message-form');
		const elementFormNameErrorMessage = document.querySelector('div#error-message-name');
		const elementFormEmailErrorMessage = document.querySelector('div#error-message-email');
		const elementFormPasswordErrorMessage = document.querySelector('div#error-message-password');

		if (elementFormButton instanceof HTMLButtonElement) {
			elementFormButton.addEventListener('click', async (ev) => {
				ev.preventDefault();
				if (
					!(elementFormErrorMessage instanceof HTMLElement) ||
					!(elementFormNameErrorMessage instanceof HTMLElement) ||
					!(elementFormPasswordErrorMessage instanceof HTMLElement) ||
					!(elementFormEmailErrorMessage instanceof HTMLElement)
				)
					return;

				elementFormErrorMessage.setAttribute('hidden', 'true');
				elementFormNameErrorMessage.setAttribute('hidden', 'true');
				elementFormEmailErrorMessage.setAttribute('hidden', 'true');
				elementFormPasswordErrorMessage.setAttribute('hidden', 'true');

				if (
					!(elementFormName instanceof HTMLInputElement) ||
					!(elementFormEmail instanceof HTMLInputElement) ||
					!(elementFormPassword instanceof HTMLInputElement)
				) {
					return;
				}

				const name = elementFormName.value;
				const email = elementFormEmail.value;
				const password = elementFormPassword.value;

				const user = { name, email, password };

				const { isValid, errors } = validateForm(TypeValidate.SIGNUP, user);

				if (isValid === false) {
					if (errors.nameError.trim())
						setErrorMessage(errors.nameError, elementFormNameErrorMessage);

					if (errors.emailError.trim())
						setErrorMessage(errors.emailError, elementFormEmailErrorMessage);

					if (errors.passwordError.trim())
						setErrorMessage(errors.passwordError, elementFormPasswordErrorMessage);

					return;
				}

				const token = await signUp(user);

				if (token === false || !Array.isArray(token)) return;

				if (token[1] === false) {
					setErrorMessage(token[0], elementFormErrorMessage);
					return;
				}

				localStorage.setItem(
					'session',
					JSON.stringify({ email, name, token: token[0] } as LocalStorageSession)
				);
				goto('/');
			});
		}
	});
</script>

<form
	class="mx-[calc(calc(100vw-400px)/2)] my-[calc(calc(100vh-400px)/2)] h-100 w-100 gap-2 rounded-2xl bg-ayu-panel p-8 [&>div]:flex [&>div]:flex-col [&>div]:justify-center"
>
	<div>
		<h2 class="text-3xl font-bold text-ayu-fg">Sign Up</h2>
		<div id="error-message-form" hidden={true}>
			<div><Alert /></div>
			<div id="error-message"></div>
			<div class="cube"></div>
		</div>
	</div>

	<div>
		<input type="text" id="form-name" placeholder="Enter your name" />

		<div id="error-message-name" hidden={true}>
			<div><Alert /></div>
			<div id="error-message"></div>
			<div class="cube"></div>
		</div>
	</div>

	<div>
		<input type="email" id="form-email" placeholder="Enter your email" />

		<div id="error-message-email" hidden={true}>
			<div><Alert /></div>
			<div id="error-message"></div>
			<div class="cube"></div>
		</div>
	</div>

	<div>
		<input type="password" id="form-password" placeholder="Choose a password" />
		<button class="eye" id="eye">
			<Eye />
		</button>
		<button hidden class="eye" id="hidden-eye">
			<HiddenEye />
		</button>

		<div id="error-message-password" hidden={true}>
			<div><Alert /></div>
			<div id="error-message"></div>
			<div class="cube"></div>
		</div>
	</div>

	<div class="row-span-2 grid grid-rows-2">
		<button
			type="submit"
			id="form-button"
			class="h-full rounded-xl bg-ayu-orange font-semibold text-ayu-yellow transition-colors duration-400 hover:cursor-pointer hover:bg-ayu-accent"
			>Create</button
		>

		<section class="flex h-full w-full items-center justify-center text-ayu-fg">
			Already have an account? &nbsp;
			<a href="/signin" class="text-ayu-orange transition-colors duration-400 hover:text-ayu-accent"
				>Sign in →</a
			>
		</section>
	</div>
</form>

<style lang="postcss">
	@reference "../layout.css";
	@layer components {
		form {
			display: grid;
			grid-template-rows: 40px repeat(3, 1fr) repeat(2, 40px);
			view-transition-name: auth-form;
		}

		form > * {
			height: 100%;
		}

		form > div {
			width: 100%;
			display: grid;
			gap: 5px;
			margin-bottom: 10px;
			position: relative;
			z-index: 3;
		}

		form > div > div {
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

		form > div > div > div.cube {
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

		form > div > button.eye {
			position: absolute;
			transform: translateX(-70%);
			right: 0;
			width: 20px;
			height: 20px;
			color: theme(--color-ayu-fg);
			view-transition-name: eye;
		}

		form > div > button.eye:hover {
			cursor: pointer;
		}

		form > div > button.eye > svg {
			width: 100%;
			height: 100%;
		}

		form > div > input {
			@apply h-12 rounded-xl border border-ayu-line px-2.5 text-ayu-fg;
		}

		form > div > input#form-password {
			view-transition-name: form-password;
		}

		form > div > input:enabled {
			outline: none;
		}
	}
</style>
