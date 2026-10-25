// Runtime validation coverage for: property filtering and URL filter parsing.
import { describe, expect, it } from "vitest";
import { properties } from "@/data/properties";
import { DEFAULT_FILTERS, filterProperties, parseFilters } from "./filters";

describe("filterProperties", () => {
  it.each([
    ["under-50l", 5_000_000, false],
    ["50l-2cr", 5_000_000, true],
    ["50l-2cr", 20_000_000, false],
    ["2cr-6cr", 20_000_000, true],
    ["2cr-6cr", 60_000_000, false],
    ["above-6cr", 60_000_000, true],
  ])("applies the %s price boundary to %s PKR", (price, amount, included) => {
    const property = { ...properties[0], id: "boundary-property", price: amount };
    const result = filterProperties([property], { ...DEFAULT_FILTERS, price }, []);

    expect(result).toHaveLength(included ? 1 : 0);
  });

  it("filters and sorts matching sample properties", () => {
    const result = filterProperties(
      properties,
      { ...DEFAULT_FILTERS, city: "Lahore", sort: "price-asc" },
      [],
    );

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((property) => property.city === "Lahore")).toBe(true);
    expect(result.map((property) => property.price)).toEqual(
      [...result].map((property) => property.price).sort((a, b) => a - b),
    );
  });
});

describe("parseFilters", () => {
  it("parses supported search parameters and uses the type alias", () => {
    expect(
      parseFilters({
        q: "modern villa",
        city: "Lahore",
        type: "House",
        price: "50l-2cr",
        status: "rent",
        sort: "price-desc",
        saved: "1",
      }),
    ).toEqual({
      query: "modern villa",
      city: "Lahore",
      category: "House",
      price: "50l-2cr",
      status: "For Rent",
      sort: "price-desc",
      savedOnly: true,
    });
  });

  it("falls back to safe defaults for unsupported parameters", () => {
    expect(parseFilters({ city: "Unknown", category: "Unknown", price: "invalid" })).toEqual(
      DEFAULT_FILTERS,
    );
  });
});
