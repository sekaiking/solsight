export function convertToSol(
  lamports: bigint | number,
  floats: number = 9,
): number {
  if (!lamports) return 0;
  const lamportsBigInt = BigInt(lamports);
  const solValue = Number(lamportsBigInt) / 1e9;
  return Number(solValue.toFixed(floats));
}

export function isValidSolanaAddress(address: string): boolean {
  const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return solanaAddressRegex.test(address);
}

export function isValidSolanaTransactionHash(hash: string): boolean {
  const solanaTransactionHashRegex = /^[1-9A-HJ-NP-Za-km-z]{64,88}$/;
  return solanaTransactionHashRegex.test(hash);
}
