"use client";

import type { ReactElement } from "react";

import { useMarketSnapshot } from "../../hooks/use-market-snapshot";
import { useWeather } from "../../hooks/use-weather";
import { Badge, Card, CardHeader } from "../ui";

interface LiveMetricCardProps {
  label: string;
  value: string;
  summary: string;
  source: string;
  updatedAt?: string;
  isLoading: boolean;
  error: string | null;
}

const formatTimestamp = (value: string): string => {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const LiveMetricCard = ({
  label,
  value,
  summary,
  source,
  updatedAt,
  isLoading,
  error,
}: LiveMetricCardProps) => {
  const updatedLabel = updatedAt ? formatTimestamp(updatedAt) : "refreshing";

  return (
    <Card className="rounded-3xl" padding="lg">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <Badge variant={error ? "danger" : "outline"} size="sm">
            {error ? "Issue" : isLoading ? "Loading" : "Live"}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-semibold tracking-tight text-gray-900">
            {error ? "Unavailable" : value}
          </p>
          <p className="text-sm text-gray-500">{error ?? summary}</p>
        </div>
        <p className="text-xs text-gray-400">
          Source: {source} · Updated {updatedLabel}
        </p>
      </div>
    </Card>
  );
};

export const LiveDataSection = (): ReactElement => {
  const weather = useWeather();
  const marketSnapshot = useMarketSnapshot();

  const weatherValue = weather.data
    ? `${Math.round(weather.data.temperatureC)}°C`
    : "--";
  const weatherSummary = weather.data
    ? `${weather.data.condition} · Wind ${Math.round(weather.data.windSpeedKph)} km/h · Humidity ${weather.data.humidityPercent}%`
    : "Checking the latest weather conditions.";

  const exchangeValue = marketSnapshot.data
    ? `€${marketSnapshot.data.usdToEur.toFixed(2)}`
    : "--";
  const exchangeSummary = marketSnapshot.data
    ? `USD to EUR with GBP at £${marketSnapshot.data.usdToGbp.toFixed(2)}`
    : "Refreshing public exchange-rate data.";

  const bitcoinValue = marketSnapshot.data
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(marketSnapshot.data.bitcoinUsd)
    : "--";
  const bitcoinSummary = marketSnapshot.data
    ? "BTC spot price from the public Coinbase feed."
    : "Refreshing public market pricing.";

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
      <Card className="rounded-3xl" padding="lg">
        <CardHeader
          title="Live signals"
          description="Public data feeds layered into the dashboard without changing the overall look."
          action={
            <Badge variant="info" size="sm" dot>
              Auto-refreshing
            </Badge>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <LiveMetricCard
            label={
              weather.data?.location
                ? `${weather.data.location} weather`
                : "Weather"
            }
            value={weatherValue}
            summary={weatherSummary}
            source={weather.data?.source ?? "Open-Meteo"}
            updatedAt={weather.data?.updatedAt}
            isLoading={weather.isLoading}
            error={weather.error}
          />
          <LiveMetricCard
            label="USD → EUR"
            value={exchangeValue}
            summary={exchangeSummary}
            source={marketSnapshot.data?.fxSource ?? "Frankfurter"}
            updatedAt={marketSnapshot.data?.updatedAt}
            isLoading={marketSnapshot.isLoading}
            error={marketSnapshot.error}
          />
          <LiveMetricCard
            label="Bitcoin spot"
            value={bitcoinValue}
            summary={bitcoinSummary}
            source={marketSnapshot.data?.cryptoSource ?? "Coinbase"}
            updatedAt={marketSnapshot.data?.updatedAt}
            isLoading={marketSnapshot.isLoading}
            error={marketSnapshot.error}
          />
        </div>
      </Card>

      <Card className="rounded-3xl" padding="lg">
        <CardHeader
          title="Live feed notes"
          description="Three public endpoints are now powering a dedicated real-time panel."
        />
        <div className="space-y-4">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-900">Weather</p>
            <p className="mt-1 text-sm text-gray-500">
              London conditions from Open-Meteo refresh every 10 minutes.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-900">Exchange rates</p>
            <p className="mt-1 text-sm text-gray-500">
              USD to EUR and GBP rates come from Frankfurter every 2 minutes.
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-900">Crypto pricing</p>
            <p className="mt-1 text-sm text-gray-500">
              Bitcoin spot pricing comes from the public Coinbase feed.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};
