import type { ShopifyMoney } from "@/types/shopify";

export function formatMoney(money: ShopifyMoney): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: Number(money.amount) % 1 === 0 ? 0 : 2,
  }).format(Number(money.amount));
}
