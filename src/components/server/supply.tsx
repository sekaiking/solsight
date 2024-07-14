import { cache } from "react";
import { Connection } from "@solana/web3.js";
import InfoBox from "@/components/ui/info-box";
import { toShortNumber } from "@/utils/numbers";
import getWeb3 from "@/utils/getWeb3";
import { t } from "@/i18n";
import { convertToSol } from "@/utils/solana";
import getApi from "@/utils/getApi";

export const revalidate = 60; // revalidate in 1 minute

const getSupply = cache(async (connection: Connection) => {
  return await connection.getSupply();
});

export default async function SupplyBox() {
  const connection = getWeb3();

  const api = getApi();
  const { price, currency } = await api.getSolanaPrice();

  const data = await getSupply(connection);

  let percentage = 0;
  if (data) {
    percentage = (data.value.circulating / data.value.total) * 100;
  }

  let marketCap = 0;
  if (price && data) {
    marketCap = price * convertToSol(data.value.circulating || 0, 2);
  }

  return (
    <InfoBox
      renderIcon="💸"
      first={[
        {
          label: t("sol_total_supply"),
          value: data?.value.total && (
            <span title={convertToSol(data?.value.total || 0).toLocaleString()}>
              {toShortNumber(convertToSol(data?.value.total || 0))}
            </span>
          ),
        },
      ]}
      second={[
        {
          label: t("circulating_supply"),
          value: data?.value.circulating && (
            <span>
              {convertToSol(data?.value.circulating).toLocaleString()}
            </span>
          ),
        },
        {
          label: t("percentage"),
          value: data?.value.total && `${percentage.toFixed(2)}%`,
        },
      ]}
      third={[
        {
          label: t("market_cap"),
          value: data?.value.total && price && (
            <span>
              {currency === "usd" ? "$" : currency === "eur" ? "€" : currency}
              {Number(marketCap.toFixed(0)).toLocaleString()}
            </span>
          ),
        },
      ]}
    />
  );
}
