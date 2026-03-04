// Mock weather data for trip dates

export interface WeatherDay {
  dayNumber: number;
  date: string;
  high: number; // Celsius
  low: number;
  condition: "sunny" | "partly_cloudy" | "cloudy" | "rain" | "hot";
  humidity: number;
  description: string;
}

export const tripWeather: WeatherDay[] = [
  {
    dayNumber: 1,
    date: "2026-04-15",
    high: 24,
    low: 14,
    condition: "sunny",
    humidity: 45,
    description: "Clear skies, perfect for arrival",
  },
  {
    dayNumber: 2,
    date: "2026-04-16",
    high: 22,
    low: 12,
    condition: "partly_cloudy",
    humidity: 50,
    description: "Mild with some clouds — great for walking tours",
  },
  {
    dayNumber: 3,
    date: "2026-04-17",
    high: 20,
    low: 11,
    condition: "rain",
    humidity: 70,
    description: "Expect showers — bring a light rain jacket",
  },
  {
    dayNumber: 4,
    date: "2026-04-18",
    high: 21,
    low: 13,
    condition: "cloudy",
    humidity: 55,
    description: "Overcast but dry — comfortable for touring",
  },
  {
    dayNumber: 5,
    date: "2026-04-19",
    high: 30,
    low: 20,
    condition: "hot",
    humidity: 30,
    description: "Hot at the Dead Sea — stay hydrated!",
  },
  {
    dayNumber: 6,
    date: "2026-04-20",
    high: 28,
    low: 18,
    condition: "sunny",
    humidity: 25,
    description: "Clear desert sky — stunning for Masada sunrise",
  },
  {
    dayNumber: 7,
    date: "2026-04-21",
    high: 25,
    low: 16,
    condition: "sunny",
    humidity: 40,
    description: "Beautiful day at the Sea of Galilee",
  },
  {
    dayNumber: 8,
    date: "2026-04-22",
    high: 23,
    low: 14,
    condition: "partly_cloudy",
    humidity: 48,
    description: "Pleasant weather for your departure day",
  },
];

export function getWeatherForDay(dayNumber: number): WeatherDay | undefined {
  return tripWeather.find((w) => w.dayNumber === dayNumber);
}

export function getWeatherIcon(condition: WeatherDay["condition"]): string {
  const icons: Record<WeatherDay["condition"], string> = {
    sunny: "sun",
    partly_cloudy: "cloud-sun",
    cloudy: "cloud",
    rain: "cloud-rain",
    hot: "thermometer",
  };
  return icons[condition];
}

export function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}
