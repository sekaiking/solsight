import React from "react";
import TxEvents from "@/components/server/tx-events";
import TxInstructions from "@/components/server/tx-instructions";
import { t } from "@/i18n";
import TxAccountData from "@/components/server/tx-accounts";

const TransactionPage: React.FC<{
  params: { hash: string };
}> = async ({ params }) => {
  return (
    <div>
      <h2>{t("accounts_data")}</h2>
      <TxAccountData params={params} />
      <h2>{t("events")}</h2>
      <TxEvents params={params} />
      <h2>{t("instructions")}</h2>
      <TxInstructions params={params} />
    </div>
  );
};

export default TransactionPage;
