import Link from "next/link";

export default function PoweredBy() {
  return (
    <div>
      <h3>
        RPC & API provided by{" "}
        <Link href="https://www.helius.dev/" target="_blank" rel="noreferrer">
          Helius
        </Link>
      </h3>
      <h3>
        Explorer API provided by{" "}
        <Link href="https://solanabeach.io/" target="_blank" rel="noreferrer">
          Solana Beach
        </Link>
      </h3>
      <h3>
        Prices API provided by{" "}
        <Link
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noreferrer"
        >
          CoinGecko
        </Link>
      </h3>
    </div>
  );
}
