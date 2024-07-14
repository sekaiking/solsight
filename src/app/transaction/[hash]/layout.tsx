import InfoBox, { InfoBoxGrid } from "@/components/ui/info-box";
import React from "react";
import TransactionHero from "@/components/ui/transaction-hero";
import Search from "@/components/client/search";
import { t } from "@/i18n";
import getApi from "@/utils/getApi";
import { convertToSol } from "@/utils/solana";
import Label from "@/components/ui/label";

export const revalidate = 60; // revalidate every minute

const TransactionLayout: React.FC<{
  params: { hash: string };
  children: React.ReactNode;
}> = async ({ params, children }) => {
  const api = getApi();
  const transaction = await api.getTransaction(params.hash);

  return (
    <div>
      <TransactionHero renderSide={<Search />} />
      {/* <pre>{JSON.stringify(transaction, null, 2)}</pre> */}
      <InfoBoxGrid className="container" minBoxWidth={270}>
        <InfoBox
          first={[
            {
              label: t("transaction_hash"),
              value: (
                <Label
                  style={{
                    width: "calc(100% - 16px)",
                    overflowWrap: "anywhere",
                  }}
                  value={params.hash}
                  showCopy={true}
                />
              ),
            },
          ]}
          second={[
            {
              label: t("status"),
              value: transaction.transactionError ? "Failed" : "Success",
            },
            {
              label: t("timestamp"),
              value: new Date(transaction.timestamp).toLocaleString(),
            },
            {
              label: t("block_height"),
              value: transaction.slot, // TODO: Assuming slot is equal block height, I'm not sure tho
            },
            {
              label: t("fee"),
              value: convertToSol(transaction.fee) + " SOL",
            },
          ]}
          third={
            transaction.transactionError
              ? [
                  {
                    label: t("error"),
                    value: transaction?.transactionError?.error as string,
                  },
                ]
              : undefined
          }
        />
      </InfoBoxGrid>
      <div className="container" style={{ paddingBottom: 20 }}>
        {children}
      </div>
    </div>
  );
};

export default TransactionLayout;
