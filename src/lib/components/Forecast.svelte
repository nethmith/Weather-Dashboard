<script lang="ts">
	import { getWeatherIconUrl } from '$lib/weather';
	import type { ForecastResponse, WeatherData } from '$lib/types';

	let { data } = $props<{ data: ForecastResponse }>();

	// Process forecast data to get daily summaries (noon)
	let dailyForecasts = $derived.by(() => {
		const dailyMap = new Map<string, WeatherData>();

		for (const item of data.list) {
			// Get date string YYYY-MM-DD
			const date = new Date(item.dt * 1000).toISOString().split('T')[0];

			// Skip if it's today (optional, depending on preference)
			const today = new Date().toISOString().split('T')[0];
			if (date === today) continue;

			// If we don't have this date yet, or if this item is closer to noon (12:00) than the current one
			if (!dailyMap.has(date)) {
				dailyMap.set(date, item);
			} else {
				const current = dailyMap.get(date)!;
				const currentHours = new Date(current.dt * 1000).getHours();
				const newHours = new Date(item.dt * 1000).getHours();

				// Standard "noon" (12) is target
				if (Math.abs(currentHours - 12) > Math.abs(newHours - 12)) {
					dailyMap.set(date, item);
				}
			}
		}

		// Convert map to array and take first 5
		return Array.from(dailyMap.values()).slice(0, 5);
	});

	function getDayName(dt: number) {
		return new Date(dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
	}
</script>

<div class="w-full mt-8">
	<h3 class="text-xl font-bold text-slate-700 mb-4 px-2">5-Day Forecast</h3>

	<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
		{#each dailyForecasts as day}
			<div
				class="bg-white/40 backdrop-blur-md rounded-xl p-4 flex flex-col items-center justify-between gap-2 shadow-sm border border-white/40 transition-transform hover:-translate-y-1 hover:shadow-md"
			>
				<span class="text-sm font-semibold text-slate-600 uppercase tracking-wide">
					{getDayName(day.dt)}
				</span>

				<img
					src={getWeatherIconUrl(day.weather[0].icon)}
					alt={day.weather[0].description}
					class="w-12 h-12 drop-shadow-sm"
					draggable="false"
				/>

				<div class="text-center">
					<span class="block text-lg font-bold text-slate-800">
						{Math.round(day.main.temp_max)}°
					</span>
					<span class="block text-xs font-medium text-slate-500">
						{Math.round(day.main.temp_min)}°
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>
