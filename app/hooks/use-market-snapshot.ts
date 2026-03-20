"use client";

import { useEffect, useState } from "react";

interface FrankfurterResponse {
  rates: {
    EUR: number;
    GBP: number;
  };
}

interface CoinbaseResponse {
  data: {
    amount: string;
    base: string;
    currency: string;
  };
}

export interface MarketSnapshot {
  usdToEur: number;
  usdToGbp: number;
  bitcoinUsd: number;
  updatedAt: string;
  fxSource: string;
  cryptoSource: string;
}

interface UseMarketSnapshotResult {
  data: MarketSnapshot | null;
  isLoading: boolean;
  error: string | null;
}

const FX_URL = "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP";
const BITCOIN_URL = "https://api.coinbase.com/v2/prices/BTC-USD/spot";
const MARKET_REFRESH_MS = 2 * 60 * 1000;

export const useMarketSnapshot = (): UseMarketSnapshotResult => {
  const [data, setData] = useState<MarketSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchMarketSnapshot = async (): Promise<void> => {
      try {
        if (!data) {
          setIsLoading(true);
        }

        const [fxResponse, bitcoinResponse] = await Promise.all([
          fetch(FX_URL),
          fetch(BITCOIN_URL),
        ]);

        if (!fxResponse.ok || !bitcoinResponse.ok) {
          throw new Error("Market data is unavailable right now.");
        }

        const fxPayload: FrankfurterResponse = await fxResponse.json();
        const bitcoinPayload: CoinbaseResponse = await bitcoinResponse.json();

        if (!isActive) {
          return;
        }

        setData({
          usdToEur: fxPayload.rates.EUR,
          usdToGbp: fxPayload.rates.GBP,
          bitcoinUsd: Number(bitcoinPayload.data.amount),
          updatedAt: new Date().toISOString(),
          fxSource: "Frankfurter",
          cryptoSource: "Coinbase",
        });
        setError(null);
      } catch (caughtError: unknown) {
        if (!isActive) {
          return;
        }

        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Market data is unavailable right now.";

        setError(message);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void fetchMarketSnapshot();

    const intervalId = window.setInterval(() => {
      void fetchMarketSnapshot();
    }, MARKET_REFRESH_MS);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [data]);

  return { data, isLoading, error };
};
