<script lang="ts">
	import { onMount } from 'svelte';
	import { isApiKeyConfigured, getCurrentWeatherUrl, getForecastUrl } from '$lib/weather';
	import type { WeatherData, ForecastResponse } from '$lib/types';
	import CurrentWeather from '$lib/components/CurrentWeather.svelte';
	import Forecast from '$lib/components/Forecast.svelte';

	let weatherData = $state<WeatherData | null>(null);
	let forecastData = $state<ForecastResponse | null>(null);
	let error = $state<string | null>(null);
	let loading = $state(true); // Initial load is true
	let query = $state('');

	const DEFAULT_CITY = 'Colombo';

	async function fetchWeather(city: string) {
		if (!city.trim()) return;

		loading = true;
		error = null;

		if (!isApiKeyConfigured()) {
			error = 'API key is not configured. Please add your key to .env.local';
			loading = false;
			return;
		}

		try {
			// Fetch both current weather and forecast in parallel
			const [currentRes, forecastRes] = await Promise.all([
				fetch(getCurrentWeatherUrl(city)),
				fetch(getForecastUrl(city))
			]);

			const currentJson = await currentRes.json();
			const forecastJson = await forecastRes.json();

			if (currentRes.ok && forecastRes.ok) {
				weatherData = currentJson as WeatherData;
				forecastData = forecastJson as ForecastResponse;
				query = '';
			} else {
				// Use error message from whichever failed
				const msg = currentJson.message || forecastJson.message || 'City not found';
				error = msg;
				weatherData = null;
				forecastData = null;
			}
		} catch (err) {
			error = `Network error: ${err instanceof Error ? err.message : 'Unknown error'}`;
		} finally {
			loading = false;
		}
	}

	function handleSearch(e: Event) {
		e.preventDefault();
		fetchWeather(query);
	}

	onMount(() => {
		fetchWeather(DEFAULT_CITY);
	});
</script>

<div class="flex flex-col items-center justify-center py-10 px-4 gap-8 min-h-screen w-full">
	<!-- Header & Search -->
	<header class="text-center space-y-6 w-full max-w-lg">
		<div class="space-y-2">
			<h2
				class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-500 drop-shadow-sm dark:from-slate-200 dark:to-slate-400"
			>
				Check the Weather
			</h2>
			<p class="text-lg text-slate-600 dark:text-slate-400">Real-time weather updates worldwide.</p>
		</div>

		<!-- Search Form -->
		<form onsubmit={handleSearch} class="relative w-full flex items-center">
			<input
				type="text"
				bind:value={query}
				placeholder="Search city..."
				class="w-full pl-6 pr-14 py-4 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all font-medium text-lg"
			/>
			<button
				type="submit"
				aria-label="Search"
				disabled={!query.trim() || loading}
				class="absolute right-2 p-2.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
			>
				{#if loading}
					<svg
						class="animate-spin h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"
						></line></svg
					>
				{/if}
			</button>
		</form>
	</header>

	<!-- Content Area -->
	<div class="w-full max-w-2xl transition-all duration-500 ease-in-out pb-20">
		{#if loading && !weatherData}
			<!-- Initial Loading Skeleton -->
			<div
				class="flex flex-col items-center justify-center p-12 rounded-3xl bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/5 shadow-lg backdrop-blur-md animate-pulse h-96"
			>
				<div class="h-20 w-20 mb-6 rounded-full bg-slate-200/50 dark:bg-slate-700/50"></div>
				<div class="h-8 w-48 rounded-full bg-slate-200/50 dark:bg-slate-700/50 mb-4"></div>
				<div class="h-4 w-32 rounded-full bg-slate-200/50 dark:bg-slate-700/50"></div>
			</div>
		{:else if error}
			<div
				class="flex items-center gap-4 text-red-700 dark:text-red-300 bg-red-50/90 dark:bg-red-900/30 backdrop-blur-md p-6 rounded-2xl border border-red-200 dark:border-red-800 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
			>
				<span class="text-3xl">⚠️</span>
				<div>
					<h3 class="font-bold text-lg">Unable to load weather</h3>
					<p class="text-sm opacity-90">{error}</p>
				</div>
			</div>
		{:else if weatherData && forecastData}
			<div class="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
				<CurrentWeather data={weatherData} />
				<Forecast data={forecastData} />
			</div>
		{/if}
	</div>
</div>
