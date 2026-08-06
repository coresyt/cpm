<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const authSection = document.getElementById('auth');

		if (authSection !== null) {
			const token = localStorage.getItem('token');
      
			if (token === null || token.length < 0)
        return location.assign('/signin')

      location.assign('/')
		}
	});
</script>
