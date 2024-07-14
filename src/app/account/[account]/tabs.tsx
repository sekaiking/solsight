"use client";

import Tabs from "@/components/ui/tabs";
import { t } from "@/i18n";
import { usePathname } from "next/navigation";

export default function AccountTabs({
  params,
}: {
  params: { account: string };
}) {
  const pathname = usePathname();

  return (
    <Tabs
      tabs={[
        {
          label: t("transactions"),
          href: `/account/${params.account}`,
          active: pathname === `/account/${params.account}`,
        },
        {
          label: t("assets"),
          href: `/account/${params.account}/assets`,
          active: pathname === `/account/${params.account}/assets`,
        },
      ]}
    />
  );
}
