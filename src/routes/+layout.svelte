<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Weather Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-800 font-sans">
	<header class="p-6 sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm">
		<div class="max-w-7xl mx-auto flex justify-center items-center">
			<h1 class="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
				Weather Dashboard
			</h1>
		</div>
	</header>

	<main class="w-full max-w-5xl mx-auto p-6 md:p-8 flex flex-col items-center gap-6">
		{@render children()}
	</main>
</div>
