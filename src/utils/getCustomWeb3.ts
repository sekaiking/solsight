import { Connection } from "@solana/web3.js";

export default function getCustomWeb3(): CustomWeb3 {
  return new CustomWeb3(process.env.SOLANA_RPC_URL as string);
}

export class CustomWeb3 {
  private connection: Connection;

  constructor(endpoint: string) {
    this.connection = new Connection(endpoint);
  }

  async sendCustomRpcRequest(
    method: string,
    params: object,
    cacheDuration: number,
  ): Promise<any> {
    const url = this.connection.rpcEndpoint;
    const requestBody = {
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      next: { revalidate: cacheDuration },
    });

    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json.result;
  }

  // refer to https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/get-assets-by-owner
  async getAssetsByOwner(
    ownerAddress: string,
    options: {
      page?: number;
      limit?: number;
      sortBy?: object;
      before?: string;
      after?: string;
      options?: object;
    } = {},
    cacheDuration: number = 300, // 5 minutes
  ): Promise<any> {
    if (!options.page) {
      options.page = 1;
    }
    if (!options.limit) {
      options.limit = 1000;
    }
    if (!options.options) {
      options.options = {
        showFungible: true,
        showGrandTotal: true,
        showNativeBalance: true,
      };
    }
    return this.sendCustomRpcRequest(
      "getAssetsByOwner",
      { ownerAddress, ...options },
      cacheDuration,
    );
  }
}
