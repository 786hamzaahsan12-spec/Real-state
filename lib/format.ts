import type { Property } from "./types";

/** Adds thousands separators without relying on the browser locale (avoids hydration mismatches). */
export function formatNumber(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function trim(value: number): string {
  return Number(value.toFixed(2)).toString();
}

/** PKR formatting in the style used in Pakistan: Lakh and Crore. */
export function formatPKR(value: number): string {
  if (value >= 10_000_000) {
    return `PKR ${trim(value / 10_000_000)} Crore`;
  }
  if (value >= 100_000) {
    return `PKR ${trim(value / 100_000)} Lakh`;
  }
  return `PKR ${formatNumber(value)}`;
}

export function formatPrice(property: Pick<Property, "price" | "status">): string {
  const base = formatPKR(property.price);
  return property.status === "For Rent" ? `${base} / month` : base;
}

export function formatArea(property: Pick<Property, "areaSize" | "areaUnit">): string {
  return `${formatNumber(property.areaSize)} ${property.areaUnit}`;
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}