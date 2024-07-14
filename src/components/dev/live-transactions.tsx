import getWeb3 from "@/utils/getWeb3";
import { Connection } from "@solana/web3.js";
import { cache } from "react";

interface BlockInfo {
  slot: number;
  blockTime: number | null;
  blockHash: string;
  transactions: number;
  reward: number;
}

const getRecentBlocks = cache(
  async (connection: Connection): Promise<BlockInfo[]> => {
    const latestSlot = await connection.getSlot();
    let validBlocks: BlockInfo[] = [];
    let currentSlot = latestSlot;
    while (validBlocks.length < 7 && currentSlot > 0) {
      try {
        const block = await connection.getBlock(currentSlot, {
          maxSupportedTransactionVersion: 0,
        });
        if (block) {
          validBlocks.push({
            slot: currentSlot,
            blockTime: block.blockTime,
            blockHash: block.blockhash,
            transactions: block.transactions.length,
            reward:
              block.rewards.reduce((sum, reward) => sum + reward.lamports, 0) /
              1e9,
          });
        }
      } catch (error) {
        // Ignore errors for individual blocks
      }
      currentSlot--;
    }
    return validBlocks;
  },
);

export default async function RecentBlocksBox() {
  const connection = getWeb3();
  const blocks = await getRecentBlocks(connection);

  return (
    <div className="recent-blocks-box">
      <h2>🧱 Recent Solana Blocks</h2>
      <table>
        <thead>
          <tr>
            <th>Slot</th>
            <th>Block Time</th>
            <th>Block Hash</th>
            <th>Transactions</th>
            <th>Reward (SOL)</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.slot}>
              <td>{block.slot.toLocaleString()}</td>
              <td>
                {block.blockTime
                  ? new Date(block.blockTime * 1000).toLocaleString()
                  : "N/A"}
              </td>
              <td>{block.blockHash}</td>
              <td>{block.transactions.toLocaleString()}</td>
              <td>{block.reward.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
