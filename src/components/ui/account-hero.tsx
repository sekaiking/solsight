import { t } from "@/i18n";
import styles from "./account-hero.module.css";
import Label from "./label";
import React from "react";

export default function AccountHero({
  address,
  renderSide,
}: {
  address: string;
  renderSide: React.ReactNode;
}) {
  return (
    <div className={styles.hero}>
      <div className="container">
        <h1>
          {t("account")}:
          <Label value={address} maxLength={18} showCopy={true} />
        </h1>
        {renderSide}
      </div>
    </div>
  );
}
