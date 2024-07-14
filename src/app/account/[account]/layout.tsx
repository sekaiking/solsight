import AccountHero from "@/components/ui/account-hero";
import InfoBox, { InfoBoxGrid } from "@/components/ui/info-box";
import Label from "@/components/ui/label";
import { t } from "@/i18n";
import getApi from "@/utils/getApi";
import getCustomWeb3 from "@/utils/getCustomWeb3";
import { convertToSol } from "@/utils/solana";
import React from "react";
import AccountTabs from "./tabs";
import Search from "@/components/client/search";

export const revalidate = 60; // revalidate every minute

const AccountLayout: React.FC<{
  params: { account: string };
  children: React.ReactNode;
}> = async ({ params, children }) => {
  const api = getApi();

  const data = await api.getAccountData(params.account);
  const { price, currency } = await api.getSolanaPrice();

  const solBalance = convertToSol(data.value?.base?.balance || "0");
  const currencyBalance = (Number(solBalance) * price).toFixed(2);

  const connection = getCustomWeb3();
  const assets = await connection.getAssetsByOwner(params.account);

  const nft_count = assets?.items.reduce((acc: number, cur: any) => {
    if (/^V(1|2)_NFT/.test(cur.interface)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const other_count = assets.total - nft_count;

  return (
    <div>
      <AccountHero address={params.account} renderSide={<Search />} />
      {/* <pre>{JSON.stringify(assets, null, 2)}</pre> */}
      <InfoBoxGrid className="container" minBoxWidth={270}>
        <InfoBox
          first={[
            {
              label: t("total_balance"),
              value: (
                <span>
                  {solBalance} SOL{" "}
                  <span style={{ fontSize: ".8rem", opacity: 0.5 }}>
                    {currency === "usd" ? "$" : currency}
                    {currencyBalance}
                  </span>
                </span>
              ),
            },
          ]}
        />
        <InfoBox
          first={[
            {
              label: t("assets_count"),
              value: `${nft_count} ${t("nft")} / ${other_count} ${t("others")}`,
            },
          ]}
        />
        <InfoBox
          first={[
            {
              label: t("owner_program"),
              value: (
                <Label
                  value={
                    data.value?.base?.owner?.name ||
                    data.value?.base?.owner?.address ||
                    ""
                  }
                  showCopy={true}
                  maxLength={14}
                />
              ),
            },
          ]}
        />
      </InfoBoxGrid>
      <div className="container">
        <AccountTabs params={params} />
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
