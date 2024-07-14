import React from "react";
import Table from "@/components/ui/table";
import Label from "@/components/ui/label";
import Link from "next/link";
import getCustomWeb3 from "@/utils/getCustomWeb3";
import { t } from "@/i18n";

interface Asset {
  id: string;
  content: {
    metadata: {
      name: string;
      symbol: string;
    };
    links: {
      image: string;
    };
  };
  compression: {
    compressed: boolean;
  };
  grouping: Array<{
    group_key: string;
    group_value: string;
  }>;
  royalty: {
    percent: number;
  };
  ownership: {
    owner: string;
  };
}

const AssetList: React.FC<{
  params: { account: string };
  searchParams: { page?: string };
}> = async ({ params, searchParams }) => {
  const connection = getCustomWeb3();
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 20;

  const assetData = await connection.getAssetsByOwner(params.account, {
    page,
    limit,
  });

  const assets: Asset[] = assetData.items.map((asset: any) => ({
    id: asset.id,
    content: asset.content,
    compression: asset.compression,
    grouping: asset.grouping,
    royalty: asset.royalty,
    ownership: asset.ownership,
  }));

  const columns = [
    {
      header: t("asset_id"),
      accessor: (asset: Asset) => (
        <Label value={asset.id} maxLength={16} showCopy={true} />
      ),
    },
    {
      header: t("name"),
      accessor: (asset: Asset) => asset.content.metadata.name,
    },
    {
      header: t("symbol"),
      accessor: (asset: Asset) => asset.content.metadata.symbol,
    },
    {
      header: t("image"),
      accessor: (asset: Asset) =>
        asset.content.links.image ? (
          <Link href={asset.content.links.image} target="_blank">
            <img
              src={asset.content.links.image}
              alt={asset.content.metadata.name}
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        ) : (
          "N/A"
        ),
    },
    {
      header: t("compressed"),
      accessor: (asset: Asset) => (asset.compression.compressed ? "Yes" : "No"),
    },
    {
      header: t("collection"),
      accessor: (asset: Asset) => {
        const collection = asset.grouping.find(
          (group) => group.group_key === "collection",
        );
        return collection ? (
          <Label
            value={collection.group_value}
            maxLength={16}
            showCopy={true}
          />
        ) : (
          "N/A"
        );
      },
    },
    {
      header: t("royalty"),
      accessor: (asset: Asset) =>
        `${(asset.royalty.percent * 100).toFixed(2)}%`,
    },
    {
      header: t("owner"),
      accessor: (asset: Asset) => (
        <Label value={asset.ownership.owner} maxLength={16} showCopy={true} />
      ),
    },
  ];

  return (
    <>
      <Table data={assets} columns={columns} />
      {page > 1 && (
        <Link
          className="btn"
          style={{ marginTop: 16, marginBottom: 16, float: "left" }}
          href={`/account/${params.account}/assets?page=${page - 1}`}
        >
          {t("previous_page")}
        </Link>
      )}
      {assets.length === limit && (
        <Link
          className="btn"
          style={{ marginTop: 16, marginBottom: 16, float: "right" }}
          href={`/account/${params.account}/assets?page=${page + 1}`}
        >
          {t("next_page")}
        </Link>
      )}
    </>
  );
};

export default AssetList;
