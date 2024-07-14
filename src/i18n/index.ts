import en from "./en.json";

// NOTE: using this from the start so that we can easily implement i18n in the future
export function t(key: keyof typeof en): string {
  return en[key] ?? key;
}
