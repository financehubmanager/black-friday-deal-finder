// Search, filter and sort: the state of the deal finder and the pure
// functions that turn the full deal list into the visible one.

import { DEALS } from "./deals.js";
import { dealScore, discountPct, dollarsSaved } from "./signals.js";

export const SORTS = {
  best: (a, b) => dealScore(b) - dealScore(a),
  discount: (a, b) => discountPct(b) - discountPct(a) || dollarsSaved(b) - dollarsSaved(a),
  saving: (a, b) => dollarsSaved(b) - dollarsSaved(a) || discountPct(b) - discountPct(a),
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
};

export function defaultState() {
  return {
    query: "",
    categories: new Set(),
    stores: new Set(),
    minDiscount: 0,
    signals: new Set(),
    sort: "best",
  };
}

/** Does one deal match the current search text? Matches title, store and category. */
export function matchesQuery(deal, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = `${deal.title} ${deal.store} ${deal.category}`.toLowerCase();
  return q.split(/\s+/).every((word) => hay.includes(word));
}

/** Apply every active filter and sort. Returns a new array. */
export function visibleDeals(state) {
  const list = DEALS.filter((deal) => {
    if (!matchesQuery(deal, state.query)) return false;
    if (state.categories.size && !state.categories.has(deal.category)) return false;
    if (state.stores.size && !state.stores.has(deal.store)) return false;
    if (discountPct(deal) < state.minDiscount) return false;
    if (state.signals.size && !state.signals.has(deal.signal)) return false;
    return true;
  });
  return list.sort(SORTS[state.sort] || SORTS.best);
}

/** Board-wide totals for the stats strip. */
export function boardStats() {
  const totalSaved = DEALS.reduce((sum, d) => sum + dollarsSaved(d), 0);
  const avgPct = Math.round(DEALS.reduce((sum, d) => sum + discountPct(d), 0) / DEALS.length);
  const newLows = DEALS.filter((d) => d.signal === "new-low").length;
  return {
    deals: DEALS.length,
    stores: new Set(DEALS.map((d) => d.store)).size,
    totalSaved: Math.round(totalSaved),
    avgPct,
    newLows,
  };
}
