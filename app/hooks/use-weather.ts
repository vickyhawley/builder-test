"use client";

import { useEffect, useState } from "react";

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    time: string;
  };
}

export interface WeatherSnapshot {
  location: string;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKph: number;
  condition: string;
  updatedAt: string;
  source: string;
}

interface UseWeatherResult {
  data: WeatherSnapshot | null;
  isLoading: boolean;
  error: string | null;
}

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto";
const WEATHER_REFRESH_MS = 10 * 60 * 1000;

const getWeatherCondition = (code: number): string => {
  if (code === 0) {
    return "Clear";
  }

  if (code >= 1 && code <= 3) {
    return "Partly cloudy";
  }

  if ([45, 48].includes(code)) {
    return "Fog";
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return "Drizzle";
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "Rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "Snow";
  }

  if ([95, 96, 99].includes(code)) {
    return "Thunderstorms";
  }

  return "Changeable";
};

export const useWeather = (): UseWeatherResult => {
  const [data, setData] = useState<WeatherSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let hasLoaded = false;

    const fetchWeather = async (): Promise<void> => {
      try {
        if (!hasLoaded) {
          setIsLoading(true);
        }

        const response = await fetch(WEATHER_URL);

        if (!response.ok) {
          throw new Error("Weather data is unavailable right now.");
        }

        const payload: OpenMeteoResponse = await response.json();

        if (!isActive) {
          return;
        }

        setData({
          location: "London",
          temperatureC: payload.current.temperature_2m,
          humidityPercent: payload.current.relative_humidity_2m,
          windSpeedKph: payload.current.wind_speed_10m,
          condition: getWeatherCondition(payload.current.weather_code),
          updatedAt: payload.current.time,
          source: "Open-Meteo",
        });
        setError(null);
        hasLoaded = true;
      } catch (caughtError: unknown) {
        if (!isActive) {
          return;
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Weather data is unavailable right now.";

        setError(message);
      } finally {
        if (isActive && !hasLoaded) {
          setIsLoading(false);
        }
      }
    };

    void fetchWeather();

    const intervalId = window.setInterval(() => {
      void fetchWeather();
    }, WEATHER_REFRESH_MS);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return { data, isLoading, error };
};
