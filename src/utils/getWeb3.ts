import { Connection } from "@solana/web3.js";

const getWeb3 = () => {
  return new Connection(process.env.SOLANA_RPC_URL as string);
};

export default getWeb3;
