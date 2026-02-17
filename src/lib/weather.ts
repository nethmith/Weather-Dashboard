// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// API endpoints
export const ENDPOINTS = {
    currentWeather: `${BASE_URL}/weather`,
    forecast: `${BASE_URL}/forecast`
} as const;

// Default units
export const UNITS = 'metric' as const;

/**
 * Validates that the API key is configured.
 * Returns true if key exists & is not the placeholder value.
 */
export function isApiKeyConfigured(): boolean {
    return !!API_KEY && API_KEY !== 'your_api_key_here';
}

/**
 * Builds a full URL for the current weather endpoint.
 * @param city - City name to search for (e.g. "Colombo")
 */
export function getCurrentWeatherUrl(city: string): string {
    return `${ENDPOINTS.currentWeather}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${UNITS}`;
}

/**
 * Builds a full URL for the 5-day forecast endpoint.
 * @param city - City name to search for (e.g. "Colombo")
 */
export function getForecastUrl(city: string): string {
    return `${ENDPOINTS.forecast}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${UNITS}`;
}

/**
 * Returns the icon URL for a given OpenWeatherMap icon code.
 * @param iconCode - The icon code from the API response (e.g. "01d")
 */
export function getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
