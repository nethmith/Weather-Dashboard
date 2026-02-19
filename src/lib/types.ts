export interface WeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	// Optional fields (forecast items might not have all these)
	base?: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level?: number;
		grnd_level?: number;
		temp_kf?: number; // Only in forecast
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust?: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	dt_txt?: string; // Only in forecast
	sys?: {          // Different in forecast vs current
		type?: number;
		id?: number;
		country?: string;
		sunrise?: number;
		sunset?: number;
		pod?: string; // Part of day (n/d) in forecast
	};
	timezone?: number;
	id?: number;
	name?: string;
	cod?: number | string;
	pop?: number; // Probability of precipitation
}

export interface ForecastResponse {
	cod: string;
	message: number;
	cnt: number;
	list: WeatherData[];
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		timezone: number;
		sunrise: number;
		sunset: number;
	};
}
