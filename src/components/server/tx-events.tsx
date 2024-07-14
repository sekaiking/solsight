import React from "react";
import Table from "@/components/ui/table";
import Label from "@/components/ui/label";
import { t } from "@/i18n";
import getApi from "@/utils/getApi";

interface EventData {
  nft?: {
    type: string;
    amount: number;
    buyer: string;
    seller: string;
    nfts: Array<{ mint: string }>;
  };
  swap?: {
    nativeInput?: { account: string; amount: string };
    nativeOutput?: { account: string; amount: string };
    tokenInputs?: Array<{
      userAccount: string;
      mint: string;
      rawTokenAmount: { tokenAmount: string };
    }>;
    tokenOutputs?: Array<{
      userAccount: string;
      mint: string;
      rawTokenAmount: { tokenAmount: string };
    }>;
  };
}

const TxEvents: React.FC<{ params: { hash: string } }> = async ({ params }) => {
  const api = getApi();
  const transaction = await api.getTransaction(params.hash);
  const events = transaction.events as EventData;

  const eventRows = [];

  if (events.nft) {
    eventRows.push({
      type: events.nft.type,
      from: events.nft.seller,
      to: events.nft.buyer,
      amount: `${events.nft.amount / 1e9} SOL`, // Assuming amount is in lamports
      asset: events.nft.nfts[0]?.mint || "Unknown NFT",
    });
  }

  if (events.swap) {
    if (events.swap.nativeInput) {
      eventRows.push({
        type: "Native Input",
        from: events.swap.nativeInput.account,
        to: "-",
        amount: `${parseInt(events.swap.nativeInput.amount) / 1e9} SOL`,
        asset: "SOL",
      });
    }

    if (events.swap.nativeOutput) {
      eventRows.push({
        type: "Native Output",
        from: "-",
        to: events.swap.nativeOutput.account,
        amount: `${parseInt(events.swap.nativeOutput.amount) / 1e9} SOL`,
        asset: "SOL",
      });
    }

    events.swap.tokenInputs?.forEach((input) => {
      eventRows.push({
        type: "Token Input",
        from: input.userAccount,
        to: "-",
        amount: input.rawTokenAmount.tokenAmount,
        asset: input.mint,
      });
    });

    events.swap.tokenOutputs?.forEach((output) => {
      eventRows.push({
        type: "Token Output",
        from: "-",
        to: output.userAccount,
        amount: output.rawTokenAmount.tokenAmount,
        asset: output.mint,
      });
    });
  }

  const columns = [
    {
      header: t("event_type"),
      accessor: "type",
    },
    {
      header: t("from"),
      accessor: (event: any) => (
        <Label value={event.from} maxLength={16} showCopy={true} />
      ),
    },
    {
      header: t("to"),
      accessor: (event: any) => (
        <Label value={event.to} maxLength={16} showCopy={true} />
      ),
    },
    {
      header: t("amount"),
      accessor: "amount",
    },
    {
      header: t("asset"),
      accessor: (event: any) => (
        <Label value={event.asset} maxLength={16} showCopy={true} />
      ),
    },
  ];

  if (eventRows.length === 0) {
    return <div style={{ marginBottom: "20px" }}>{t("no_events")}</div>;
  }

  return <Table data={eventRows} columns={columns as any} />;
};

export default TxEvents;
