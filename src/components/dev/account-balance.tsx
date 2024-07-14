// @ts-nocheck
import getCustomWeb3 from "@/utils/getCustomWeb3";

export const revalidate = 60; // revalidate every minute

interface TokenBalancesProps {
  publicKey: string;
}

export default async function TokenBalances({ publicKey }: TokenBalancesProps) {
  const cconnection = getCustomWeb3();
  const response = await cconnection.getAssetsByOwner(
    publicKey,
    1,
    1000,
    undefined,
    undefined,
    undefined,
    {
      showFungible: true,
      showNativeBalance: true,
    },
  );
  console.log(Object.keys(response));

  return (
    <div>
      <pre style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}
