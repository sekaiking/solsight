import StarsAnimation from "@/components/ui/stars-animation";
import { InfoBoxGrid } from "@/components/ui/info-box";
import { t } from "@/i18n";
import styles from "./page.module.css";
import SupplyBox from "@/components/server/supply";
import NetworkBox from "@/components/server/network";
import EpochBox from "@/components/server/epoch";
import InflationBox from "@/components/server/inflation";
import Search from "@/components/client/search";
import PoweredBy from "@/components/ui/powered-by";

// import LiveTransactionsBox from "@/components/client/live-transactions";
// import PythPriceFeeds from "@/components/dev/pyth-price-feed";

export default function HomePage() {
  return (
    <div className={styles.hero + " container"}>
      <div className={styles.bgStars}>
        <StarsAnimation />
      </div>
      <h1>{t("explore_solana_blockchain")}</h1>
      <div className={styles.search}>
        <Search />
      </div>
      <InfoBoxGrid>
        <SupplyBox />
        <NetworkBox />
        <EpochBox />
        <InflationBox />
      </InfoBoxGrid>
      <PoweredBy />
      {/* <LiveTransactionsBox /> */}
      {/* <PythPriceFeeds /> */}
    </div>
  );
}
