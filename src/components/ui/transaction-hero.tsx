import { t } from "@/i18n";
import styles from "./transaction-hero.module.css";
import React from "react";

export default function TransactionHero({
  renderSide,
}: {
  renderSide: React.ReactNode;
}) {
  return (
    <div className={styles.hero}>
      <div className="container">
        <h1>{t("transaction_details")}:</h1>
        {renderSide}
      </div>
    </div>
  );
}
