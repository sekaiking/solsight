import { cache } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import InfoBox from "@/ui/info-box";
import getWeb3 from "@/utils/getWeb3";

export const revalidate = 60; // revalidate every minute

const getAccountInfo = cache(
  async (connection: Connection, publicKey: PublicKey) => {
    return await connection.getAccountInfo(publicKey);
  },
);

interface AccountInfoProps {
  publicKey: string;
}

export default async function AccountInfo({ publicKey }: AccountInfoProps) {
  const connection = getWeb3();
  const accountPublicKey = new PublicKey(publicKey);
  const data = await getAccountInfo(connection, accountPublicKey);

  return (
    <InfoBox
      renderIcon="📝"
      first={[
        {
          label: "Account Data",
          value: data?.data?.toString() || "No Data",
        },
      ]}
      second={[
        {
          label: "Lamports",
          value: data?.lamports && data?.lamports.toLocaleString(),
        },
        {
          label: "Owner",
          value: data?.owner?.toString(),
        },
      ]}
      third={[
        {
          label: "Executable",
          value: data?.executable ? "Yes" : "No",
        },
      ]}
    />
  );
}
