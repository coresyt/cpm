<script lang="ts">
	import { onMount, type Component } from 'svelte';
	import LED from './icons/LED.svelte';
	import CPU from './icons/CPU.svelte';
	import House from './icons/House.svelte';
	import User from './icons/User.svelte';
	import Menu from './icons/Menu.svelte';
	import Close from './icons/Close.svelte';

	type NavigationRoutes = '/account' | '/' | '/things' | '/boards';
	interface RoutesList {
		name: string;
		path: NavigationRoutes;
		icon: Component;
	}

	let { path, name, email }: { path: NavigationRoutes; name: string; email: string } = $props();
	let routes: RoutesList[] = [
		{
			name: 'Home',
			path: '/',
			icon: House
		},
		{
			name: 'Things',
			path: '/things',
			icon: LED
		},
		{
			name: 'Boards',
			path: '/boards',
			icon: CPU
		}
	];

	onMount(() => {
		const elementMenuButton = document.querySelector('button#menu-button');
		const elementPannel = document.querySelector('div#panel');

		if (
			!(elementMenuButton instanceof HTMLButtonElement) ||
			!(elementPannel instanceof HTMLElement)
		)
			return;

		const svgs = Array.from(elementMenuButton.querySelectorAll('svg').values());

		elementMenuButton.addEventListener('click', (ev) => {
			ev.preventDefault();

			elementPannel.classList.toggle('max-md:hidden');
			svgs[1].classList.toggle('max-md:hidden');
			svgs[0].classList.toggle('max-md:hidden');
		});
	});
</script>

<section>
	<button
		class="absolute top-0 left-0 size-12 translate-x-[35%] translate-y-[35%] rounded-lg bg-ayu-panel p-1 text-ayu-line transition-colors duration-200 hover:bg-ayu-orange/45 hover:text-ayu-accent md:hidden"
		id="menu-button"><Menu /> <Close className="max-md:hidden" /></button
	>
	<div class="bg-ayu-panel p-2 max-md:hidden max-md:pt-17.5" id="panel">
		<a href="/account">
			{#if path === '/account'}
				<div class="link link-account" x-path>
					<div class="icon"><User /></div>
					<div>
						<h3>{name}</h3>
						<p>{email}</p>
					</div>
				</div>
			{:else}
				<div class="link link-account">
					<div class="icon"><User /></div>
					<div>
						<h3>{name}</h3>
						<p>{email}</p>
					</div>
				</div>
			{/if}
		</a>

		{#each routes as route}
			<a href={route.path}>
				{#if path === route.path}
					<div class="link link-any" x-path>
						<div><route.icon /></div>
						&nbsp;
						{route.name}
					</div>
				{:else}
					<div class="link link-any">
						<div><route.icon /></div>
						&nbsp;
						{route.name}
					</div>
				{/if}
			</a>
		{/each}
	</div>
</section>

<style lang="postcss">
	@reference '../routes/layout.css';

	@layer components {
		section > div {
			height: 100%;

			& > a > div.link {
				@apply w-full rounded-lg text-ayu-fg transition-colors duration-300;

				&.link-account {
					height: 80px;
					width: 100%;
					display: grid;
					padding: 8px;
					grid-template-columns: 40px 1fr;
					@apply mb-4 gap-2;

					& > div.icon {
						width: 40px;
						height: 100%;
						align-items: center;
						justify-content: center;
					}

					& > div:last-child {
						flex-direction: column;
						justify-content: center;

						& > h3 {
							display: block;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							font-weight: 600;
						}

						& > p {
							display: block;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					& > div {
						box-sizing: border-box;
						display: flex;
						overflow: hidden;
					}
				}

				&.link-any {
					height: 40px;
					margin-bottom: 15px;
					@apply flex items-center p-4;

					& > div {
						color: currentColor;
						width: 20px;
						height: 20px;
					}
				}

				&:hover {
					@apply bg-ayu-orange/45;
				}

				&[x-path] {
					@apply bg-ayu-orange/60 text-ayu-accent;
				}
			}
		}
	}
</style>
