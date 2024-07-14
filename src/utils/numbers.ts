export const toShortNumber = (num: number, precision: number = 2): string => {
  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);

  if (tier === 0) return num.toString();

  const suffix = suffixes[tier];
  const scaled = num / Math.pow(10, tier * 3);

  return `${scaled.toFixed(precision).replace(/\.0+$/, "")}${suffix}`;
};
