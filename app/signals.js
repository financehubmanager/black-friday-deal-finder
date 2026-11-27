// Verdicts: the honest "is it really a deal" signal on every deal.
// The discount is always computed from price and was, so the numbers on the
// card can never disagree with the verdict's maths.

export const SIGNAL_LABELS = {
  "new-low": "New low",
  strong: "Strong deal",
  routine: "Routine sale",
};

/** Percent off, rounded to the nearest whole percent. */
export function discountPct(deal) {
  if (!deal.was || deal.was <= deal.price) return 0;
  return Math.round((1 - deal.price / deal.was) * 100);
}

/** Dollars saved. */
export function dollarsSaved(deal) {
  return Math.round((deal.was - deal.price) * 100) / 100;
}

/** Money formatting: $1,399.99, $18, $22.50. */
export function money(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/** A single "how good is this deal" score for the Best-deal sort.
 *  Percent off matters most, then dollars saved, then the verdict. */
export function dealScore(deal) {
  const pct = discountPct(deal);
  const saved = dollarsSaved(deal);
  const verdict = deal.signal === "new-low" ? 12 : deal.signal === "strong" ? 6 : 0;
  return pct + Math.min(saved / 25, 16) + verdict;
}

/** Short checked time for the card, e.g. "27 Nov, 06:15 UTC". */
export function checkedLabel(iso) {
  const d = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]}, ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}
