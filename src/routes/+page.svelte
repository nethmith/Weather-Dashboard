<script lang="ts">
	import { onMount } from 'svelte';
	import { isApiKeyConfigured, getCurrentWeatherUrl } from '$lib/weather';

	let apiStatus = $state<'checking' | 'configured' | 'missing'>('checking');
	let testResult = $state<string>('');

	onMount(async () => {
		if (!isApiKeyConfigured()) {
			apiStatus = 'missing';
			testResult = 'API key is not configured. Please add your key to .env.local';
			return;
		}

		apiStatus = 'configured';

		// Quick test fetch with a known city
		try {
			const url = getCurrentWeatherUrl('Colombo');
			const res = await fetch(url);
			const data = await res.json();

			if (res.ok) {
				testResult = `✅ API connected! Current temp in ${data.name}: ${Math.round(data.main.temp)}°C — ${data.weather[0].description}`;
				console.log('OpenWeatherMap response:', data);
			} else {
				testResult = `⚠️ API responded with error: ${data.message}`;
				console.error('API error:', data);
			}
		} catch (err) {
			testResult = `❌ Network error: ${err instanceof Error ? err.message : 'Unknown error'}`;
			console.error('Fetch failed:', err);
		}
	});
</script>

<div class="flex flex-col items-center justify-center text-center py-16 px-4 gap-8">
	<!-- Hero -->
	<h2 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 drop-shadow-sm">
		Check the Weather
	</h2>
	<p class="text-lg text-slate-600 max-w-lg leading-relaxed">
		Get real-time weather updates and a 5-day forecast for any city worldwide.
	</p>

	<!-- API Status Card -->
	<div class="w-full max-w-md rounded-2xl border border-white/40 bg-white/60 backdrop-blur-lg shadow-lg p-6 text-left space-y-4">
		<h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400">API Status</h3>

		{#if apiStatus === 'checking'}
			<div class="flex items-center gap-3">
				<span class="relative flex h-3 w-3">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
					<span class="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
				</span>
				<span class="text-slate-600">Checking API connection…</span>
			</div>
		{:else if apiStatus === 'configured'}
			<div class="flex items-center gap-3">
				<span class="relative flex h-3 w-3">
					<span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
				</span>
				<span class="text-slate-700 font-medium">API key detected</span>
			</div>
		{:else}
			<div class="flex items-center gap-3">
				<span class="relative flex h-3 w-3">
					<span class="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
				</span>
				<span class="text-slate-700 font-medium">API key missing</span>
			</div>
		{/if}

		{#if testResult}
			<p class="text-sm text-slate-600 bg-slate-100/80 rounded-lg p-3 leading-relaxed">
				{testResult}
			</p>
		{/if}
	</div>
</div>
