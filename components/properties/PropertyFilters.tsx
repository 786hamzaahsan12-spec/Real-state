"use client";

import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import SelectField from "@/components/ui/SelectField";
import { CATEGORIES, CITIES } from "@/data/properties";
import {
  CATEGORY_CHIPS,
  PRICE_RANGES,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  type FilterState,
  type SortValue,
} from "@/lib/filters";

interface PropertyFiltersProps {
  filters: FilterState;
  draftQuery: string;
  savedCount: number;
  onDraftQueryChange: (value: string) => void;
  onSearch: () => void;
  onChange: (patch: Partial<FilterState>) => void;
}

const typeOptions = [
  { value: "all", label: "All types" },
  ...CATEGORIES.map((category) => ({ value: category, label: category })),
];

const cityOptions = [
  { value: "all", label: "All locations" },
  ...CITIES.map((city) => ({ value: city, label: city })),
];

const priceOptions = PRICE_RANGES.map((range) => ({ value: range.value, label: range.label }));

export default function PropertyFilters({
  filters,
  draftQuery,
  savedCount,
  onDraftQueryChange,
  onSearch,
  onChange,
}: PropertyFiltersProps) {
  return (
    <div>
      <div className="rounded-2xl border border-line bg-card p-5 md:p-6">
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            onSearch();
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <label htmlFor="property-search" className="sr-only">
              Search by city, area or property name
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
              aria-hidden="true"
            />
            <input
              id="property-search"
              type="search"
              value={draftQuery}
              onChange={(event) => onDraftQueryChange(event.target.value)}
              placeholder="Search by city, area or property name"
              className="field-input pl-11"
            />
          </div>
          <button type="submit" className="btn-gold !py-3.5 sm:px-10">
            Search
          </button>
        </form>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SelectField
            id="filter-type"
            label="Property type"
            value={filters.category}
            onChange={(value) => onChange({ category: value as FilterState["category"] })}
            options={typeOptions}
          />
          <SelectField
            id="filter-location"
            label="Location"
            value={filters.city}
            onChange={(value) => onChange({ city: value as FilterState["city"] })}
            options={cityOptions}
          />
          <SelectField
            id="filter-price"
            label="Price range"
            value={filters.price}
            onChange={(value) => onChange({ price: value })}
            options={priceOptions}
          />
          <SelectField
            id="filter-status"
            label="Listing type"
            value={filters.status}
            onChange={(value) => onChange({ status: value as FilterState["status"] })}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div
          role="group"
          aria-label="Property categories"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {CATEGORY_CHIPS.map((chip) => {
            const active = filters.category === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => onChange({ category: chip.value })}
                aria-pressed={active}
                className={`relative shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                  active ? "border-gold text-ink" : "border-line text-muted hover:border-gold/50 hover:text-gold"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="category-chip"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{chip.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onChange({ savedOnly: !filters.savedOnly })}
            aria-pressed={filters.savedOnly}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
              filters.savedOnly
                ? "border-gold bg-gold/10 text-gold"
                : "border-line text-muted hover:border-gold/50 hover:text-gold"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${filters.savedOnly ? "fill-gold" : ""}`}
              aria-hidden="true"
            />
            Saved ({savedCount})
          </button>
        </div>

        <SelectField
          id="sort-by"
          label="Sort by"
          value={filters.sort}
          onChange={(value) => onChange({ sort: value as SortValue })}
          options={SORT_OPTIONS}
          className="w-full lg:w-60"
        />
      </div>
    </div>
  );
}