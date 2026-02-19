<script lang="ts">
	import { getWeatherIconUrl } from '$lib/weather';
	import type { WeatherData } from '$lib/types';

	let { data } = $props<{ data: WeatherData }>();

	// Format time: "10:30 AM"
	let formattedTime = $derived(
		new Date(data.dt * 1000).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		})
	);

	// Capitalize description: "scattered clouds" -> "Scattered Clouds"
	let description = $derived(
		data.weather[0].description
			.split(' ')
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	);
</script>

<div
	class="relative overflow-hidden rounded-3xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl p-8 text-slate-800 transition-all hover:shadow-orange-500/10"
>
	<!-- Background decoration -->
	<div
		class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-300/30 to-yellow-300/30 blur-3xl"
	></div>
	<div
		class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-300/30 to-purple-300/30 blur-3xl"
	></div>

	<div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
		<!-- Main Info -->
		<div class="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
			<div class="flex items-baseline gap-2">
				<h2 class="text-3xl font-bold tracking-tight text-slate-900">
					{data.name}
				</h2>
				<span class="text-lg font-medium text-slate-500 bg-white/50 px-2 py-0.5 rounded-md">
					{data.sys.country}
				</span>
			</div>

			<p class="text-sm font-medium text-slate-500 uppercase tracking-wider">
				{formattedTime}
			</p>

			<div class="flex items-center mt-4">
				<span class="text-7xl md:text-8xl font-black tracking-tighter text-slate-800">
					{Math.round(data.main.temp)}°
				</span>
			</div>

			<div class="flex flex-col gap-1">
				<p class="text-lg font-semibold text-slate-700">
					{description}
				</p>
				<p class="text-sm text-slate-500">
					Feels like <span class="font-bold text-slate-700"
						>{Math.round(data.main.feels_like)}°</span
					>
				</p>
			</div>
		</div>

		<!-- Icon & Visuals -->
		<div class="flex flex-col items-center justify-center">
			<img
				src={getWeatherIconUrl(data.weather[0].icon)}
				alt={description}
				class="h-32 w-32 md:h-40 md:w-40 drop-shadow-lg filter"
				draggable="false"
			/>
		</div>
	</div>
</div>
