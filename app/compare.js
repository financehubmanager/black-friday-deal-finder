// Cross-store comparison: the same product on sale at several stores,
// cheapest first, so a shopper can see at a glance where to buy it.

import { DEALS } from "./deals.js";
import { discountPct, money } from "./signals.js";

/** Groups with more than one store, best price first. */
export function compareGroups() {
  const byGroup = new Map();
  for (const deal of DEALS) {
    if (!byGroup.has(deal.group)) byGroup.set(deal.group, []);
    byGroup.get(deal.group).push(deal);
  }
  const groups = [];
  for (const [group, rows] of byGroup) {
    if (rows.length < 2) continue;
    const sorted = [...rows].sort((a, b) => a.price - b.price);
    groups.push({ group, title: sorted[0].title, rows: sorted });
  }
  // Biggest saving between cheapest and priciest store first.
  groups.sort((a, b) => (b.rows[b.rows.length - 1].price - b.rows[0].price) - (a.rows[a.rows.length - 1].price - a.rows[0].price));
  return groups.slice(0, 8);
}

export function compareCardHTML(group) {
  const rows = group.rows.map((deal, i) => {
    const cls = i === 0 ? "best" : "worse";
    const tag = i === 0 ? " <span class=\"best\">cheapest</span>" : "";
    const off = i === 0 ? ` <span class="compare-off">−${discountPct(deal)}%</span>` : "";
    return `<div class="compare-row"><span class="${cls}">${deal.store}${tag}</span><span class="${i === 0 ? "best-price" : "worse"}">${money(deal.price)}${off}</span></div>`;
  }).join("");
  return `<article class="compare-card"><h3>${group.title}</h3>${rows}</article>`;
}
