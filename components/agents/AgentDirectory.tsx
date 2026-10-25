"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { agents } from "@/data/agents";
import { VIEWPORT_ONCE, staggerContainer } from "@/lib/motion";
import AgentCard from "./AgentCard";

const stagger = staggerContainer(0.1);

export default function AgentDirectory({ showSearch = true }: { showSearch?: boolean }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return agents;
    return agents.filter((agent) =>
      `${agent.name} ${agent.specialty} ${agent.city}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      {showSearch ? (
        <div className="relative mb-10 max-w-xl">
          <label htmlFor="agent-search" className="sr-only">
            Search agents by name or specialty
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
            aria-hidden="true"
          />
          <input
            id="agent-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search agents by name or specialty"
            className="field-input pl-11"
          />
        </div>
      ) : null}

      {results.length > 0 ? (
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {results.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </motion.div>
      ) : (
        <p className="rounded-2xl border border-line bg-card p-10 text-center text-muted">
          No agents match your search.
        </p>
      )}

      <p className="mt-8 text-sm text-muted">
        All agent profiles on this page are demo profiles with placeholder contact details.
      </p>
    </div>
  );
}