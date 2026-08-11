<script lang="ts">
	import type { Thing } from '$lib/things';
	import LED from '../icons/LED.svelte';

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
		things: Thing<never, string>[];
		thing: Thing<never, string>;
	}

	let { thingCtx = $bindable(), things, thing }: Props = $props();

	function selectThing(id: string) {
		const th = things.find((thing) => thing.id === id);
		if (!th) return;
		thingCtx.thingSelected.id = id;
		thingCtx.thingSelected.name = th.name;
		thingCtx.thingSelected.type = th.type;
	}
</script>

<button
	class="w-full"
	onclick={() => {
		selectThing(thing.id);
	}}
>
	<div class="things__table__body__item {thing.id === thingCtx.thingSelected.id ? 'selected' : ''}">
		<div class="col-span-2">
			<div
				class="mr-4 h-7 w-7 rounded-lg border border-ayu-cyan bg-ayu-cyan/60 p-1.5 text-ayu-cyan"
			>
				<LED />
			</div>
			<span>{thing.name}</span>
		</div>
		<div>{thing.value}</div>
		<div class="capitalize">{thing.type}</div>
		<div class="col-span-2 capitalize">{thing.createdDate}</div>
	</div>
</button>

<style lang="postcss">
	@reference '../../routes/layout.css';

	@layer components {
		.things__table__body__item {
			@apply grid min-h-16 grid-cols-6 transition-all duration-200;

			& > div {
				@apply flex items-center p-4 text-wrap wrap-anywhere text-ayu-fg;
			}
		}

		.selected {
			@apply rounded-lg bg-ayu-muted/30!;
		}
	}
</style>
