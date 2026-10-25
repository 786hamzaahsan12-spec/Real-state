"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { properties } from "@/data/properties";
import { useFavourites } from "@/hooks/useFavourites";
import { DEFAULT_FILTERS, filterProperties, type FilterState } from "@/lib/filters";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyGrid from "@/components/properties/PropertyGrid";

const PAGE_SIZE = 6;

export default function PropertyBrowser({ initialFilters }: { initialFilters: FilterState }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [draftQuery, setDraftQuery] = useState(initialFilters.query);
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { ids } = useFavourites();

  const results = useMemo(() => filterProperties(properties, filters, ids), [filters, ids]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const update = (patch: Partial<FilterState>) => {
    setFilters((previous) => ({ ...previous, ...patch }));
    setPage(1);
  };

  const search = () => update({ query: draftQuery.trim() });

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    setDraftQuery("");
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div>
      <PropertyFilters
        filters={filters}
        draftQuery={draftQuery}
        savedCount={ids.length}
        onDraftQueryChange={setDraftQuery}
        onSearch={search}
        onChange={update}
      />

      <div ref={resultsRef} className="mt-10 scroll-mt-28">
        <p aria-live="polite" className="mb-6 text-sm text-muted">
          <span className="font-semibold text-fg">{results.length}</span>{" "}
          {results.length === 1 ? "property" : "properties"} found
        </p>

        {visible.length > 0 ? (
          <PropertyGrid
            properties={visible}
            animationKey={JSON.stringify([filters, currentPage])}
          />
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-line bg-card px-6 py-16 text-center">
            <SearchX className="h-10 w-10 text-gold" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl text-fg">No properties found</h3>
            <p className="mt-2 max-w-md text-sm text-muted">
              {filters.savedOnly
                ? "You have not saved any matching properties yet. Tap the heart on a property to save it."
                : "Try a different search term or loosen a filter."}
            </p>
            <button type="button" onClick={reset} className="btn-gold mt-6">
              Reset filters
            </button>
          </div>
        )}

        {totalPages > 1 ? (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-fg"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => goToPage(number)}
                aria-label={`Page ${number}`}
                aria-current={number === currentPage ? "page" : undefined}
                className={`h-11 w-11 rounded-full border text-sm font-semibold transition-colors ${
                  number === currentPage
                    ? "border-gold bg-gold text-ink"
                    : "border-line text-fg hover:border-gold hover:text-gold"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-fg"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
}