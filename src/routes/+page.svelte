<script lang="ts">
	import { onMount } from 'svelte';
	import { isApiKeyConfigured, getCurrentWeatherUrl } from '$lib/weather';
	import type { WeatherData } from '$lib/types';
	import CurrentWeather from '$lib/components/CurrentWeather.svelte';

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

<div class="flex flex-col items-center justify-center py-10 px-4 gap-8">
	<!-- Hero -->
	<header class="text-center space-y-2">
		<h2
			class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 drop-shadow-sm"
		>
			Check the Weather
		</h2>
		<p class="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
			Real-time weather updates worldwide.
		</p>
	</header>

	<!-- Content Area -->
	<div class="w-full max-w-2xl transition-all duration-500 ease-in-out">
		{#if loading}
			<div
				class="flex flex-col items-center justify-center p-12 rounded-3xl bg-white/40 border border-white/40 shadow-lg backdrop-blur-md animate-pulse"
			>
				<div class="h-16 w-16 mb-4 rounded-full bg-slate-200"></div>
				<div class="h-6 w-48 rounded-full bg-slate-200"></div>
			</div>
		{:else if error}
			<div
				class="flex items-center gap-4 text-red-700 bg-red-50/90 backdrop-blur-md p-6 rounded-2xl border border-red-200 shadow-lg"
			>
				<span class="text-3xl">⚠️</span>
				<div>
					<h3 class="font-bold text-lg">Unable to load weather</h3>
					<p class="text-sm opacity-90">{error}</p>
				</div>
			</div>
		{:else if weatherData}
			<CurrentWeather data={weatherData} />
		{/if}
	</div>
</div>
