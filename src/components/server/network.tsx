import { cache } from "react";
import { Connection } from "@solana/web3.js";
import InfoBox from "@/components/ui/info-box";
import { toShortNumber } from "@/utils/numbers";
import getWeb3 from "@/utils/getWeb3";
import { t } from "@/i18n";

export const revalidate = 60 * 5; // revalidate cached data in 5 minutes

const getNetworkData = cache(async (connection: Connection) => {
  const [performanceSamples, txCount, blockHeight] = await Promise.all([
    connection.getRecentPerformanceSamples(1),
    connection.getTransactionCount(),
    connection.getBlockHeight(),
  ]);
  return { performanceSamples, txCount, blockHeight };
});

export default async function NetworkBox() {
  const connection = getWeb3();
  const { performanceSamples, txCount, blockHeight } =
    await getNetworkData(connection);

  const tps =
    performanceSamples[0]?.numTransactions /
      performanceSamples[0]?.samplePeriodSecs || 0;
  const avgBlockTime =
    performanceSamples[0]?.samplePeriodSecs /
    (performanceSamples[0]?.numSlots || 1);

  return (
    <InfoBox
      renderIcon="⚡"
      first={[
        {
          label: t("total_transactions"),
          value: txCount && toShortNumber(txCount),
        },
        {
          label: t("block_height"),
          value: blockHeight && toShortNumber(blockHeight),
        },
      ]}
      second={[
        {
          label: t("tps"),
          value: performanceSamples && Number(tps.toFixed(0)).toLocaleString(),
        },
      ]}
      third={[
        {
          label: t("avg_block_time"),
          value: performanceSamples && `${avgBlockTime.toFixed(2)} s`,
        },
      ]}
    />
  );
}
