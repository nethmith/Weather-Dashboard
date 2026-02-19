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

	<!-- Weather Details Grid -->
	<div class="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
		<!-- Humidity -->
		<div class="flex flex-col items-center justify-center gap-1 text-center">
			<span class="text-slate-500 mb-1">
				<!-- Droplet Icon -->
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
					class="text-blue-500"
					><path
						d="M12 22a7 7 0 0 0 7-7c0-2-2-2.09-2-3.66a7 7 0 0 0-13.7 0c0 1.57-2 1.66-2 3.66a7 7 0 0 0 7 7z"
					></path></svg
				>
			</span>
			<span class="text-sm font-medium text-slate-500">Humidity</span>
			<span class="text-lg font-bold text-slate-800">{data.main.humidity}%</span>
		</div>

		<!-- Wind -->
		<div class="flex flex-col items-center justify-center gap-1 text-center">
			<span class="text-slate-500 mb-1">
				<!-- Wind Icon -->
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
					class="text-slate-500"
					><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path
						d="M12.6 19.4A2 2 0 1 0 14 16H2"
					/></svg
				>
			</span>
			<span class="text-sm font-medium text-slate-500">Wind</span>
			<span class="text-lg font-bold text-slate-800">{Math.round(data.wind.speed * 3.6)} km/h</span>
		</div>

		<!-- Pressure -->
		<div class="flex flex-col items-center justify-center gap-1 text-center">
			<span class="text-slate-500 mb-1">
				<!-- Gauge/Activity Icon -->
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
					class="text-purple-500"
					><path
						d="M12 20.94c1.61 0 3.09-.59 4.25-1.57l-2.03-3.52A4.99 4.99 0 0 0 12 15a4.99 4.99 0 0 0-2.22.85l-2.03 3.52C8.91 20.35 10.39 20.94 12 20.94z"
					/><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z" /></svg
				>
			</span>
			<span class="text-sm font-medium text-slate-500">Pressure</span>
			<span class="text-lg font-bold text-slate-800">{data.main.pressure} hPa</span>
		</div>
	</div>
</div>
