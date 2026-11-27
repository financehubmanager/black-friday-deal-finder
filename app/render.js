// Rendering: turns the visible deal list into cards, chips and the stats
// strip. No network, no templates from elsewhere — plain DOM strings.

import { CATEGORIES, STORES } from "./deals.js";
import { SIGNAL_LABELS, checkedLabel, discountPct, dollarsSaved, money } from "./signals.js";
import { boardStats } from "./filters.js";
import { compareCardHTML, compareGroups } from "./compare.js";

const DISCOUNT_STEPS = [0, 20, 30, 40, 50, 60];
const SIGNAL_ORDER = ["new-low", "strong", "routine"];

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function renderStats(el) {
  const s = boardStats();
  el.innerHTML = `
    <div class="stat"><b>${s.deals}</b><span>verified deals</span></div>
    <div class="stat"><b>${s.stores}</b><span>stores checked</span></div>
    <div class="stat"><b>${s.avgPct}%</b><span>average discount</span></div>
    <div class="stat"><b>${s.newLows}</b><span>new-low prices</span></div>`;
}

function chip(label, pressed, data) {
  return `<button type="button" class="chip" aria-pressed="${pressed}" data-kind="${data.kind}" data-value="${esc(data.value)}">${esc(label)}</button>`;
}

export function renderChips(state, els) {
  els.categories.innerHTML = ["All", ...CATEGORIES].map((c) =>
    chip(c, c === "All" ? state.categories.size === 0 : state.categories.has(c), { kind: "category", value: c })).join("");
  els.stores.innerHTML = ["All", ...STORES].map((s) =>
    chip(s, s === "All" ? state.stores.size === 0 : state.stores.has(s), { kind: "store", value: s })).join("");
  els.discounts.innerHTML = DISCOUNT_STEPS.map((d) =>
    chip(d === 0 ? "Any discount" : `≥ ${d}% off`, state.minDiscount === d, { kind: "discount", value: String(d) })).join("");
  els.signals.innerHTML = ["All verdicts", ...SIGNAL_ORDER].map((s) =>
    chip(s === "All verdicts" ? "All verdicts" : SIGNAL_LABELS[s], s === "All verdicts" ? state.signals.size === 0 : state.signals.has(s), { kind: "signal", value: s })).join("");
}

export function dealCardHTML(deal, rank) {
  const pct = discountPct(deal);
  const saved = dollarsSaved(deal);
  const top = rank < 3 ? " top-pick" : "";
  const note = deal.note ? `<p class="deal-note">${esc(deal.note)}</p>` : "";
  return `<article class="deal-card${top}">
    <div class="deal-head"><span class="deal-cat">${esc(deal.category)}</span><span class="deal-store">${esc(deal.store)}</span></div>
    <h3 class="deal-title">${esc(deal.title)}</h3>
    <div class="deal-price-row">
      <span class="deal-price">${money(deal.price)}</span>
      <span class="deal-was">${money(deal.was)}</span>
      <span class="deal-off">−${pct}%</span>
      <span class="deal-save">Save ${money(saved)}</span>
    </div>
    <span class="signal signal-${deal.signal}">${SIGNAL_LABELS[deal.signal]}</span>
    <p class="deal-evidence">${esc(deal.evidence)}</p>
    ${note}
    <p class="deal-meta">Checked ${checkedLabel(deal.checked)} · ${esc(deal.source)}</p>
    <a class="deal-cta" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} →</a>
  </article>`;
}

export function renderDeals(state, list, els) {
  els.grid.innerHTML = list.map((deal, i) => dealCardHTML(deal, i)).join("");
  els.empty.hidden = list.length > 0;
  const active = [];
  if (state.query.trim()) active.push(`“${state.query.trim()}”`);
  if (state.categories.size) active.push([...state.categories].join(", "));
  if (state.stores.size) active.push([...state.stores].join(", "));
  if (state.minDiscount) active.push(`≥ ${state.minDiscount}% off`);
  if (state.signals.size) active.push([...state.signals].map((s) => SIGNAL_LABELS[s]).join(", "));
  els.resultLine.innerHTML = list.length
    ? `<b>${list.length}</b> deal${list.length === 1 ? "" : "s"}${active.length ? " for " + esc(active.join(" · ")) : ""} — sorted ${esc(sortLabel(state.sort))}.`
    : "";
}

function sortLabel(sort) {
  return { best: "best deal first", discount: "biggest % off", saving: "biggest saving", "price-low": "lowest price", "price-high": "highest price" }[sort] || sort;
}

export function renderCompare(el) {
  const groups = compareGroups();
  if (!groups.length) { el.innerHTML = ""; return; }
  el.innerHTML = `<h2>Same product, several stores — cheapest first</h2>
    <div class="compare-list">${groups.map(compareCardHTML).join("")}</div>`;
}
