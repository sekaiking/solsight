"use client";
import SearchInput from "@/components/ui/search-input";
import { t } from "@/i18n";
import {
  isValidSolanaAddress,
  isValidSolanaTransactionHash,
} from "@/utils/solana";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  return (
    <SearchInput
      onSearch={(value) => {
        if (isValidSolanaAddress(value)) {
          router.push(`/account/${value}`);
          return;
        }
        if (isValidSolanaTransactionHash(value)) {
          router.push(`/transaction/${value}`);
          return;
        }
        alert(t("invalid_search"));
      }}
      buttonText={t("search_tx_or_account_label")}
      placeholder={t("search_tx_or_account_placeholder")}
    />
  );
}
