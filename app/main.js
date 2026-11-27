// Bootstrap: wires the controls to the state and re-renders on every change.
// The page works with no network: all data is local, all rendering is local.

import { defaultState, visibleDeals } from "./filters.js";
import { renderChips, renderCompare, renderDeals, renderStats } from "./render.js";

const state = defaultState();

const els = {
  stats: document.getElementById("stats"),
  search: document.getElementById("search"),
  sort: document.getElementById("sort"),
  categories: document.getElementById("category-filters"),
  stores: document.getElementById("store-filters"),
  discounts: document.getElementById("discount-filters"),
  signals: document.getElementById("signal-filters"),
  resultLine: document.getElementById("result-line"),
  grid: document.getElementById("deal-grid"),
  empty: document.getElementById("empty"),
  compare: document.getElementById("compare"),
};

function renderAll() {
  renderChips(state, els);
  renderDeals(state, visibleDeals(state), els);
}

function toggleSet(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function onChipClick(event) {
  const btn = event.target.closest(".chip");
  if (!btn) return;
  const { kind, value } = btn.dataset;
  if (kind === "category") {
    if (value === "All") state.categories.clear();
    else toggleSet(state.categories, value);
  } else if (kind === "store") {
    if (value === "All") state.stores.clear();
    else toggleSet(state.stores, value);
  } else if (kind === "discount") {
    state.minDiscount = Number(value);
  } else if (kind === "signal") {
    if (value === "All verdicts") state.signals.clear();
    else toggleSet(state.signals, value);
  }
  renderAll();
}

els.search.addEventListener("input", () => {
  state.query = els.search.value;
  renderAll();
});
els.sort.addEventListener("change", () => {
  state.sort = els.sort.value;
  renderAll();
});
for (const el of [els.categories, els.stores, els.discounts, els.signals]) {
  el.addEventListener("click", onChipClick);
}

renderStats(els.stats);
renderCompare(els.compare);
renderAll();
