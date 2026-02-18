<script lang="ts">
	import { onMount } from 'svelte';
	import { isApiKeyConfigured, getCurrentWeatherUrl } from '$lib/weather';
	import type { WeatherData } from '$lib/types';

	let weatherData = $state<WeatherData | null>(null);
	let error = $state<string | null>(null);
	let loading = $state(true);

	// Hardcoded city for Day 3
	const DEFAULT_CITY = 'Colombo';

	onMount(async () => {
		if (!isApiKeyConfigured()) {
			error = 'API key is not configured. Please add your key to .env.local';
			loading = false;
			return;
		}

		try {
			console.log(`Fetching weather for ${DEFAULT_CITY}...`);
			const url = getCurrentWeatherUrl(DEFAULT_CITY);
			const res = await fetch(url);
			const data = await res.json();

			if (res.ok) {
				weatherData = data as WeatherData;
				console.log('Weather data received:', weatherData);
			} else {
				error = `Error: ${data.message}`;
				console.error('API Error:', data);
			}
		} catch (err) {
			error = `Network error: ${err instanceof Error ? err.message : 'Unknown error'}`;
			console.error('Fetch failed:', err);
		} finally {
			loading = false;
		}
	});
</script>

<div class="flex flex-col items-center justify-center text-center py-16 px-4 gap-8">
	<!-- Hero -->
	<h2
		class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 drop-shadow-sm"
	>
		Check the Weather
	</h2>
	<p class="text-lg text-slate-600 max-w-lg leading-relaxed">
		Get real-time weather updates and a 5-day forecast for any city worldwide.
	</p>

	<!-- Status & Data Display -->
	<div
		class="w-full max-w-lg rounded-2xl border border-white/40 bg-white/60 backdrop-blur-lg shadow-lg p-6 text-left space-y-4"
	>
		{#if loading}
			<div class="flex items-center gap-3 animate-pulse">
				<div class="h-4 w-4 rounded-full bg-blue-400"></div>
				<span class="text-slate-600 font-medium">Fetching weather data...</span>
			</div>
		{:else if error}
			<div
				class="flex items-start gap-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100"
			>
				<span class="text-xl">⚠️</span>
				<p class="font-medium">{error}</p>
			</div>
		{:else if weatherData}
			<div class="space-y-2">
				<div class="flex items-center gap-2 mb-4">
					<span class="h-3 w-3 rounded-full bg-emerald-500"></span>
					<span class="text-sm font-bold uppercase tracking-wider text-slate-500">
						Data Received for {weatherData.name}
					</span>
				</div>

				<div
					class="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner border border-slate-700"
				>
					<pre>{JSON.stringify(weatherData, null, 2)}</pre>
				</div>

				<p class="text-center text-sm text-slate-500 mt-2">
					Check the browser console (F12) for the object details!
				</p>
			</div>
		{/if}
	</div>
</div>
