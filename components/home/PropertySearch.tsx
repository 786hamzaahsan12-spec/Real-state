"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import SelectField from "@/components/ui/SelectField";
import { CATEGORIES, CITIES } from "@/data/properties";
import { PRICE_RANGES } from "@/lib/filters";

const cityOptions = [
  { value: "all", label: "All locations" },
  ...CITIES.map((city) => ({ value: city, label: city })),
];

const typeOptions = [
  { value: "all", label: "All types" },
  ...CATEGORIES.map((category) => ({ value: category, label: category })),
];

const priceOptions = PRICE_RANGES.map((range) => ({ value: range.value, label: range.label }));

export default function PropertySearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("any");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city !== "all") params.set("city", city);
    if (category !== "all") params.set("category", category);
    if (price !== "any") params.set("price", price);
    const query = params.toString();
    router.push(query ? `/properties?${query}` : "/properties");
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search properties"
      className={`grid gap-4 rounded-2xl border border-line bg-card/90 p-5 shadow-2xl shadow-black/40 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end ${className}`}
    >
      <SelectField
        id="hero-location"
        label="Location"
        value={city}
        onChange={setCity}
        options={cityOptions}
      />
      <SelectField
        id="hero-type"
        label="Property type"
        value={category}
        onChange={setCategory}
        options={typeOptions}
      />
      <SelectField
        id="hero-price"
        label="Price range"
        value={price}
        onChange={setPrice}
        options={priceOptions}
      />
      <button type="submit" className="btn-gold w-full !py-3.5 sm:col-span-2 lg:col-span-1">
        <Search className="h-4 w-4" aria-hidden="true" />
        Search
      </button>
    </form>
  );
}