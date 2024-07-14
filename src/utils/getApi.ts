import "server-only";

export default function getApi(): Api {
  return new Api();
}

export class Api {
  SOLANA_BEACH_API: string;
  SOLANA_BEACH_KEY: string;
  COIN_GECKO_API: string;
  HELIUS_API: string;
  HELIUS_KEY: string;

  constructor() {
    if (!process.env.SOLANA_BEACH_API || !process.env.SOLANA_BEACH_KEY) {
      throw new Error("Missing Solana Beach API key");
    }
    if (!process.env.HELIUS_KEY || !process.env.HELIUS_API) {
      throw new Error("Missing Helius API key");
    }

    this.SOLANA_BEACH_API = process.env.SOLANA_BEACH_API;
    this.SOLANA_BEACH_KEY = process.env.SOLANA_BEACH_KEY;

    this.COIN_GECKO_API = "https://api.coingecko.com/api/v3";

    this.HELIUS_API = process.env.HELIUS_API;
    this.HELIUS_KEY = process.env.HELIUS_KEY;
  }

  async getAccountData(account: string, cacheDuration: number = 60) {
    const res = await fetch(this.SOLANA_BEACH_API + `/account/${account}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${this.SOLANA_BEACH_KEY}`,
      },
      next: { revalidate: cacheDuration },
    });
    return await res.json();
  }

  async getAccountTokens(account: string, cacheDuration: number = 300) {
    const res = await fetch(
      this.SOLANA_BEACH_API + `/account/${account}/tokens`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `${this.SOLANA_BEACH_KEY}`,
        },
        next: { revalidate: cacheDuration },
      },
    );
    return await res.json();
  }

  async getAccountTransactions(
    account: string,
    options: {
      before?: string;
      until?: string;
      commitment?: string;
      source?: string;
      type?: string;
      limit?: number;
    } = {},
    cacheDuration: number = 300, // 5 minutes
  ): Promise<
    {
      description: string;
      type: string;
      source: string;
      fee: number;
      feePayer: string;
      signature: string;
      slot: number;
      timestamp: number;
      nativeTransfers: any[];
      tokenTransfers: any[];
      accountData: any[];
      transactionError: any;
      instructions: any[];
      events: any;
    }[]
  > {
    if (!options.limit) {
      options.limit = 20;
    }

    const queryParams = new URLSearchParams({
      "api-key": this.HELIUS_KEY,
      ...(options?.before && { before: options.before }),
      ...(options?.until && { until: options.until }),
      ...(options?.commitment && { commitment: options.commitment }),
      ...(options?.source && { source: options.source }),
      ...(options?.type && { type: options.type }),
      ...(options?.limit && { limit: options.limit.toString() }),
    });

    const url = `${this.HELIUS_API}/addresses/${account}/transactions?${queryParams}`;
    console.log(url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: cacheDuration },
    });

    return await res.json();
  }

  async getTransaction(
    tx: string,
    cacheDuration: number = 300, // 5 min
  ): Promise<{
    description: string;
    type: string;
    source: string;
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    timestamp: number;
    nativeTransfers: any[];
    tokenTransfers: any[];
    accountData: any[];
    transactionError: any;
    instructions: any[];
    events: any;
  }> {
    const res = await fetch(
      this.HELIUS_API + `/transactions?api-key=${this.HELIUS_KEY}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `${this.HELIUS_KEY}`,
          ContentType: "application/json",
        },
        body: JSON.stringify({
          transactions: [tx],
        }),
        next: { revalidate: cacheDuration },
      },
    );
    return (await res.json())?.[0];
  }

  async getSolanaPrice(currency: string = "usd") {
    const response = await fetch(
      this.COIN_GECKO_API +
        `/simple/price?ids=solana&vs_currencies=${currency}`,
      { next: { revalidate: 60 } }, // Cache for 60 seconds
    );

    if (!response.ok) {
      console.log(response);
      return { price: null, currency };
    }

    const data = await response.json();

    return {
      price: data.solana[currency] || null,
      currency,
    };
  }
}
