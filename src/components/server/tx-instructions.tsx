import React from "react";
import Table from "@/components/ui/table";
import Label from "@/components/ui/label";
import { t } from "@/i18n";
import getApi from "@/utils/getApi";

interface Instruction {
  programId: string;
  data: string;
  accounts: string[];
  innerInstructions?: Instruction[];
}

const TxInstructions: React.FC<{ params: { hash: string } }> = async ({
  params,
}) => {
  const api = getApi();
  const transaction = await api.getTransaction(params.hash);
  const instructions = transaction.instructions as Instruction[];

  const instructionRows = instructions.flatMap((instruction, index) => {
    const rows = [
      {
        index: index || "",
        programId: instruction.programId,
        data: instruction.data,
        accounts: instruction.accounts.join(", "),
        isInner: false,
      },
    ];

    if (instruction.innerInstructions) {
      instruction.innerInstructions.forEach((innerInstruction, innerIndex) => {
        rows.push({
          index: `${index}.${innerIndex}`,
          programId: innerInstruction.programId,
          data: innerInstruction.data,
          accounts: innerInstruction.accounts.join(", "),
          isInner: true,
        });
      });
    }

    return rows;
  });

  const columns = [
    {
      header: t("index"),
      accessor: "index",
    },
    {
      header: t("program_id"),
      accessor: (instruction: any) => (
        <Label value={instruction.programId} maxLength={16} showCopy={true} />
      ),
    },
    {
      header: t("data"),
      accessor: (instruction: any) => (
        <Label value={instruction.data} maxLength={32} showCopy={true} />
      ),
    },
    {
      header: t("accounts"),
      accessor: (instruction: any) => (
        <Label value={instruction.accounts} maxLength={64} showCopy={true} />
      ),
    },
  ];

  return <Table data={instructionRows} columns={columns as any} />;
};

export default TxInstructions;
