import { CATEGORIES, CITIES } from "@/data/properties";
import type { City, ListingStatus, Property, PropertyCategory } from "./types";

export type SortValue = "newest" | "price-asc" | "price-desc";

export interface FilterState {
  query: string;
  city: City | "all";
  category: PropertyCategory | "all";
  price: string;
  status: ListingStatus | "all";
  sort: SortValue;
  savedOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  city: "all",
  category: "all",
  price: "any",
  status: "all",
  sort: "newest",
  savedOnly: false,
};

export interface PriceRange {
  value: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGES: PriceRange[] = [
  { value: "any", label: "Any price", min: 0, max: Infinity },
  { value: "under-50l", label: "Under PKR 50 Lakh", min: 0, max: 5_000_000 },
  { value: "50l-2cr", label: "PKR 50 Lakh to 2 Crore", min: 5_000_000, max: 20_000_000 },
  { value: "2cr-6cr", label: "PKR 2 to 6 Crore", min: 20_000_000, max: 60_000_000 },
  { value: "above-6cr", label: "Above PKR 6 Crore", min: 60_000_000, max: Infinity },
];

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export const CATEGORY_CHIPS: { value: PropertyCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "House", label: "Houses" },
  { value: "Apartment", label: "Apartments" },
  { value: "Plot", label: "Plots" },
  { value: "Commercial", label: "Commercial" },
];

export const STATUS_OPTIONS: { value: ListingStatus | "all"; label: string }[] = [
  { value: "all", label: "Sale and Rent" },
  { value: "For Sale", label: "For Sale" },
  { value: "For Rent", label: "For Rent" },
];

/** Applies every filter and then sorts the result. */
export function filterProperties(
  list: Property[],
  filters: FilterState,
  savedIds: string[],
): Property[] {
  const range = PRICE_RANGES.find((r) => r.value === filters.price) ?? PRICE_RANGES[0];
  const query = filters.query.trim().toLowerCase();

  const filtered = list.filter((property) => {
    if (filters.savedOnly && !savedIds.includes(property.id)) return false;
    if (filters.city !== "all" && property.city !== filters.city) return false;
    if (filters.category !== "all" && property.category !== filters.category) return false;
    if (filters.status !== "all" && property.status !== filters.status) return false;
    if (property.price < range.min || property.price >= range.max) return false;

    if (query) {
      const haystack =
        `${property.title} ${property.area} ${property.city} ${property.category} ${property.status}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

/** Converts URL search params (from the homepage search or navbar) into filter state. */
export function parseFilters(params: RawParams): FilterState {
  const city = first(params.city);
  const category = first(params.category) || first(params.type);
  const price = first(params.price);
  const status = first(params.status).toLowerCase();
  const sort = first(params.sort);

  return {
    query: first(params.q).slice(0, 80),
    city: (CITIES as string[]).includes(city) ? (city as City) : "all",
    category: (CATEGORIES as string[]).includes(category)
      ? (category as PropertyCategory)
      : "all",
    price: PRICE_RANGES.some((r) => r.value === price) ? price : "any",
    status: status === "sale" ? "For Sale" : status === "rent" ? "For Rent" : "all",
    sort: SORT_OPTIONS.some((o) => o.value === sort) ? (sort as SortValue) : "newest",
    savedOnly: first(params.saved) === "1",
  };
}