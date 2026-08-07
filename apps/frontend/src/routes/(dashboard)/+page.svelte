<script lang="ts">
	import CPU from '$components/icons/CPU.svelte';
	import LED from '$components/icons/LED.svelte';
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
		<header class="mb-4 flex w-full items-center justify-between md:px-4">
			<h2 class="text-2xl font-bold text-ayu-orange">
				Cloud Platform <br /> <span>for Microcontrollers</span>
			</h2>
			<div class="w-full border-t border-ayu-line md:hidden"></div>
			<div class="items gap-1 max-md:px-4">
				<a href="/">
					<div class="card-section-link">
						<div class="box-border h-10 w-10">
							<CPU />
						</div>
						<div>
							<h3 class="font-semibold">Boards</h3>
							<p class="rounded-lg bg-ayu-line px-2">&#9679; <span>0</span> existing</p>
						</div>
					</div>
				</a>
				<div class="border-r border-ayu-line"></div>
				<a href="#red">
					<div class="card-section-link">
						<div class="box-border h-10 w-10">
							<LED />
						</div>
						<div>
							<h3 class="font-semibold">Things</h3>
							<p class="rounded-lg bg-ayu-line px-2">&#9679; <span>0</span> created</p>
						</div>
					</div>
				</a>
			</div>
		</header>
		<hr class="border-ayu-line max-md:mx-5" />
	</section>
</main>

<style lang="postcss">
	@reference 'layout.css';

	@layer components {
		.card-section-link {
			@apply flex h-full w-48 items-center rounded-lg py-2 text-ayu-fg transition-colors duration-300 hover:bg-ayu-muted/30;
		}

		@media (width >= 768px) {
			main {
				display: grid;
				grid-template-columns: 250px 1fr;
			}
		}

		@media (width >= 1200px) {
			.card-section-link {
				@apply p-2;

				& > div:first-child {
					@apply mr-4;
				}
			}

			main > section > header {
				@apply h-24;

				& > div.items {
					@apply flex h-24 pt-4;
				}
			}
		}

		@media (width <= 1200px) {
			.card-section-link {
				@apply h-full w-full flex-col justify-center;

				& > div:last-child {
					@apply flex flex-col items-center justify-center;
				}
			}
			main > section > header {
				@apply h-52 flex-col justify-around;

				& > div.items {
					display: grid;
					width: 100%;
					grid-template-columns: 1fr 1px 1fr;
				}
			}
		}
	}
</style>
