<script lang="ts">
	import '../layout.css';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style lang="postcss">
	@reference '../layout.css';

	@layer components {
		main {
			height: 100svh;
			width: 100%;

			@media (width >= 768px) {
				display: grid;
				grid-template-columns: 250px 1fr;
			}
		}
	}
</style>
