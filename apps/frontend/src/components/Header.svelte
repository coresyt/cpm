<script lang="ts">
	import CPU from '$components/icons/CPU.svelte';
	import LED from '$components/icons/LED.svelte';
</script>

<header class="mb-4 flex w-full items-center justify-between md:px-4">
	<h2 class="text-2xl font-bold text-ayu-orange">
		Cloud Platform <br /> <span>for Microcontrollers</span>
	</h2>
	<div class="w-full border-t border-ayu-line md:hidden"></div>
	<div class="items gap-1 max-md:px-4">
		<a href="/boards">
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
		<a href="/things">
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

<style lang="postcss">
	@reference '../routes/layout.css';

	@layer components {
		.card-section-link {
			@apply flex h-full w-48 items-center rounded-lg py-2 text-ayu-fg transition-colors duration-300 hover:bg-ayu-muted/30;
		}

		@media (width >= 1200px) {
			.card-section-link {
				@apply p-2;

				& > div:first-child {
					@apply mr-4;
				}
			}

			header {
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
			header {
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
