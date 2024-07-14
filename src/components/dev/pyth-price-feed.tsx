// @ts-nocheck
import {
  PriceFeed,
  PriceServiceConnection,
} from "@pythnetwork/price-service-client";
import { cache } from "react";

const getPythPrices = cache(
  async (priceIds: string[]): Promise<PriceFeed[] | undefined> => {
    const connection = new PriceServiceConnection(
      "https://hermes.pyth.network",
    );
    const currentPrices = await connection.getLatestPriceFeeds(priceIds);
    console.log(currentPrices);
    return currentPrices;
  },
);

export default async function PythPriceFeeds() {
  const priceIds = [
    "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d", // SOL/USD price id
  ];
  const prices = await getPythPrices(priceIds);

  return (
    <div className="pyth-price-feeds">
      <h2>📊 Pyth Network Price Feeds</h2>
      <pre>{JSON.stringify(prices, null, 2)}</pre>
    </div>
  );
}
