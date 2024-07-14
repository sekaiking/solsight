import React from "react";
import Table from "@/components/ui/table";
import Label from "@/components/ui/label";
import { t } from "@/i18n";
import getApi from "@/utils/getApi";

interface TokenBalanceChange {
  userAccount: string;
  tokenAccount: string;
  mint: string;
  rawTokenAmount: {
    tokenAmount: string;
  };
}

interface AccountData {
  account: string;
  nativeBalanceChange: number;
  tokenBalanceChanges: TokenBalanceChange[];
}

const TxAccountData: React.FC<{ params: { hash: string } }> = async ({
  params,
}) => {
  const api = getApi();
  const transaction = await api.getTransaction(params.hash);

  const accountData = transaction.accountData as AccountData[];

  const accountRows = accountData.flatMap((account) => {
    const rows = [
      {
        account: account.account,
        balanceChange: `${account.nativeBalanceChange / 1e9} SOL`,
        tokenAccount: "-",
        mint: "-",
        tokenChange: "-",
      },
    ];

    account.tokenBalanceChanges.forEach((tokenChange) => {
      rows.push({
        account: account.account,
        balanceChange: "-",
        tokenAccount: tokenChange.tokenAccount,
        mint: tokenChange.mint,
        tokenChange: tokenChange.rawTokenAmount.tokenAmount,
      });
    });

    return rows;
  });

  const columns = [
    {
      header: t("account"),
      accessor: (row: any) => (
        <Label value={row.account} maxLength={16} showCopy={true} />
      ),
    },
    {
      header: t("native_balance_change"),
      accessor: "balanceChange",
    },
    {
      header: t("token_account"),
      accessor: (row: any) =>
        row.tokenAccount !== "-" ? (
          <Label value={row.tokenAccount} maxLength={16} showCopy={true} />
        ) : (
          "-"
        ),
    },
    {
      header: t("mint"),
      accessor: (row: any) =>
        row.mint !== "-" ? (
          <Label value={row.mint} maxLength={16} showCopy={true} />
        ) : (
          "-"
        ),
    },
    {
      header: t("token_balance_change"),
      accessor: "tokenChange",
    },
  ];

  return <Table data={accountRows} columns={columns as any} />;
};

export default TxAccountData;
