"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/constants";
import {
  type CatalogParams,
  parseCatalogParams,
  serializeCatalogParams,
} from "./params";

/**
 * Reads the current catalog filters from the URL and returns helpers that write
 * changes back to the URL (client navigation, no scroll jump). Filter changes
 * reset the load-more counter.
 */
export function useCatalogParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((v, k) => (obj[k] = v));
    return obj;
  }, [searchParams]);

  const params = useMemo(() => parseCatalogParams(raw), [raw]);

  const commit = useCallback(
    (next: Partial<CatalogParams>, opts?: { keepShow?: boolean }) => {
      const merged: Partial<CatalogParams> = {
        ...params,
        ...next,
        show: opts?.keepShow ? params.show : PAGE_SIZE,
      };
      router.push(`${pathname}${serializeCatalogParams(merged)}`, {
        scroll: false,
      });
    },
    [params, pathname, router],
  );

  const toggleInArray = useCallback(
    (key: "brands" | "flavors" | "forms", value: string) => {
      const cur = new Set(params[key] ?? []);
      if (cur.has(value)) cur.delete(value);
      else cur.add(value);
      commit({ [key]: [...cur] } as Partial<CatalogParams>);
    },
    [params, commit],
  );

  const clearAll = useCallback(() => {
    commit({
      brands: [],
      flavors: [],
      forms: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      inStockOnly: false,
      vegan: false,
    });
  }, [commit]);

  const loadMore = useCallback(() => {
    commit({ show: params.show + PAGE_SIZE }, { keepShow: true });
  }, [params.show, commit]);

  return { params, commit, toggleInArray, clearAll, loadMore };
}
