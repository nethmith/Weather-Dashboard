<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	// @ts-ignore
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Weather Dashboard</title>
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-500"
>
	<header
		class="p-6 sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/20 dark:border-white/5 shadow-sm transition-colors duration-500"
	>
		<div class="max-w-7xl mx-auto flex justify-between items-center">
			<h1
				class="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
			>
				Weather Dashboard
			</h1>
			<ThemeToggle />
		</div>
	</header>

	<main class="w-full max-w-5xl mx-auto p-6 md:p-8 flex flex-col items-center gap-6">
		{@render children()}
	</main>
</div>
