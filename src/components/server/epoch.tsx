import { cache } from "react";
import { Connection } from "@solana/web3.js";
import InfoBox from "@/components/ui/info-box";
import getWeb3 from "@/utils/getWeb3";
import { t } from "@/i18n";

export const revalidate = 60; // revalidate every minute

const getEpochInfo = cache(async (connection: Connection) => {
  return await connection.getEpochInfo();
});

export default async function EpochBox() {
  const connection = getWeb3();
  const data = await getEpochInfo(connection);

  return (
    <InfoBox
      renderIcon="🕰️"
      first={[
        {
          label: t("current_epoch"),
          value: data?.epoch && data?.epoch.toLocaleString(),
        },
      ]}
      second={[
        {
          label: t("current_slot"),
          value: data?.absoluteSlot && data?.absoluteSlot.toLocaleString(),
        },
        {
          label: t("slots_in_epoch"),
          value: data?.slotsInEpoch && data?.slotsInEpoch.toLocaleString(),
        },
      ]}
      third={[
        {
          label: t("slot_index"),
          value:
            data?.slotIndex && data?.slotsInEpoch
              ? `${((data.slotIndex / data.slotsInEpoch) * 100).toFixed(2)}%`
              : "N/A",
        },
      ]}
    />
  );
}
