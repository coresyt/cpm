// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface LocalStorageSession {
		token: string;
		name?: string;
		email: string;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'svelte/elements' {
	export interface HTMLAttributes {
		'x-path'?: boolean;
	}
}

export {};
