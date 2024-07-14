import Label from "@/components/ui/label";
import Table from "@/components/ui/table";
import getApi from "@/utils/getApi";
import { t } from "@/i18n";
import { convertToSol } from "@/utils/solana";
import Link from "next/link";
import React from "react";

interface Transaction {
  hash: string;
  instructions: string[];
  status: string;
  fee: number;
  timestamp: number;
  blockHeight: number; // Added block height
}

const TransactionList: React.FC<{
  params: { account: string };
  searchParams: { before?: string };
}> = async ({ params, searchParams }) => {
  const api = getApi();
  const txs = await api.getAccountTransactions(
    params.account,
    searchParams.before
      ? {
          before: searchParams.before,
        }
      : undefined,
  );

  const transactions: Transaction[] = txs.map((tx: any) => ({
    hash: tx.signature,
    instructions: tx.instructions.map((v: any) => v.programId),
    status: tx.transactionError ? "Failed" : "Success",
    fee: convertToSol(tx.fee),
    timestamp: tx.timestamp,
    blockHeight: tx.slot, // TODO: Assuming slot is equal block height, I'm not sure tho
  }));

  const columns = [
    {
      header: t("transaction_hash"),
      accessor: (tx: Transaction) => (
        <Label value={tx.hash} maxLength={16} showCopy={true} />
      ),
    },
    {
      header: t("instructions"),
      accessor: (tx: Transaction) => (
        <div style={{ display: "flex", gap: 4 }}>
          <Label value={tx.instructions[0]} maxLength={16} showCopy={true} />
          {tx.instructions.length > 1 && (
            <Label
              title={tx.instructions.slice(1).join(", ")}
              value={"+" + (tx.instructions.length - 1)}
            />
          )}
        </div>
      ),
    },
    {
      header: t("status"),
      accessor: "status",
    },
    {
      header: t("fee"),
      accessor: (tx: Transaction) => `${tx.fee.toFixed(9)} SOL`,
    },
    {
      header: t("block_height"),
      accessor: (tx: Transaction) => (
        <Label value={tx.blockHeight.toString()} />
      ),
    },
    {
      header: t("timestamp"),
      accessor: (tx: Transaction) =>
        new Date(tx.timestamp * 1000).toLocaleString(),
    },
  ];

  return (
    <>
      <Table data={transactions} columns={columns as any} />
      {searchParams.before && (
        <Link
          style={{ marginTop: 16, marginBottom: 16, float: "left" }}
          className="btn"
          href={`/account/${params.account}`}
        >
          {t("back_to_present")}
        </Link>
      )}
      {/* TODO: don't hardcode limit */}
      {transactions.length === 20 && (
        <Link
          style={{ marginTop: 16, marginBottom: 16, float: "right" }}
          className="btn"
          href={`/account/${params.account}?before=${transactions[transactions.length - 1].hash}`}
        >
          {t("next_page")}
        </Link>
      )}
    </>
  );
};

export default TransactionList;
