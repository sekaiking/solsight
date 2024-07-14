import { cache } from "react";
import { Connection } from "@solana/web3.js";
import InfoBox from "@/components/ui/info-box";
import getWeb3 from "@/utils/getWeb3";
import { t } from "@/i18n";

const getInflationRate = cache(async (connection: Connection) => {
  return await connection.getInflationRate();
});

export default async function InflationBox() {
  const connection = getWeb3();
  const data = await getInflationRate(connection);

  return (
    <InfoBox
      renderIcon="📈"
      first={[
        {
          label: t("current_inflation_rate"),
          value: `${(data?.total * 100).toFixed(2)}%`,
        },
      ]}
      second={[
        {
          label: t("validator"),
          value: `${(data?.validator * 100).toFixed(2)}%`,
        },
      ]}
      third={[
        {
          label: t("foundation"),
          value: `${(data?.foundation * 100).toFixed(2)}%`,
        },
      ]}
    />
  );
}
