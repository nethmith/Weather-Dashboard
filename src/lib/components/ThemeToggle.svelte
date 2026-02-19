<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(false);

	onMount(() => {
		// Sync with actual DOM state
		isDark = document.documentElement.classList.contains('dark');
	});

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	}
</script>

<button
	onclick={toggleTheme}
	aria-label="Toggle Dark Mode"
	class="p-2 rounded-full transition-all duration-300 hover:bg-white/20 active:scale-95 text-slate-600 dark:text-slate-200"
>
	{#if isDark}
		<!-- Moon Icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="animate-in spin-in-180 fade-in duration-300"
			><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg
		>
	{:else}
		<!-- Sun Icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="animate-in spin-in-180 fade-in duration-300"
			><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path
				d="m4.93 4.93 1.41 1.41"
			/><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path
				d="m6.34 17.66-1.41 1.41"
			/><path d="m19.07 4.93-1.41 1.41" /></svg
		>
	{/if}
</button>
