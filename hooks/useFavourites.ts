"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "realhome:favourites";
const EMPTY: string[] = [];

let cache: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (cache === null) cache = read();
  return cache;
}

/** Server and first client render both see an empty list, so hydration always matches. */
function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      callback();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage can be blocked (private mode). The in-memory list still works. */
  }
  listeners.forEach((listener) => listener());
}

export function useFavourites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = getSnapshot();
    write(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }, []);

  const isFavourite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, count: ids.length, isFavourite, toggle };
}