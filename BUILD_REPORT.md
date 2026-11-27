# BUILD_REPORT.md — DealBeacon v2

Bounty: black-friday-deal-finder-01 ("Make the best Black Friday deal finder"), $250, 20 places.
v1 submission: 01a21be1, round 1 rank **206/3,276, score 651335 (65.1% win rate)**.
v2 goal: move up from round 2 (cutoff 28 Nov 07:42 WIB) by fixing what the brief actually
judges — not the leaderboard title, which the judge never sees (judge-briefs.md §4).

## What changed vs v1

### 1. Prices re-checked the same day, 4 prices corrected (brief criterion 2)

v1's 62 Amazon prices rested on the Mashable guide (a secondary source). In this session I
re-verified the 30 most visible deals — every compare-strip row, every new-low row, every
headline card — against a second deals source read the same day (27 Nov 2026), and recorded
the re-check time + outlet in each deal's `source` field (`checked: 2026-11-27T13:55:43Z`,
field `CHECKED_V2` in app/deals.js). Four prices were wrong and are now fixed:

| Deal | v1 | v2 | Evidence for v2 |
|---|---|---|---|
| AirPods 4 (Amazon) | $114.99 / was $155 | **$89 / was $129.99** | EmbroidHub Amazon listing $89.00, list $129.99 (17 Nov); GilbertPost; MySavings |
| Samsung S85H 65" OLED (Amazon) | $1,167.99 / was $1,999.99 | **$899.99 / was $1,597.99** | iPromoCodes 27 Nov 16:25+06:00; DealCatcher Amazon 6–10h ago; Threads 25 Nov |
| Nintendo Switch 2 bundle (Amazon + Walmart) | $499 / was $549 | **$499.99 / was $549.99** | BeeBulletin; TradingView |
| Beats Solo 4 (Walmart) | $69 / was $199 | **$99.95 / was $199.95** | KrazyCouponLady Walmart $99.95/$199.95; current listings $88.97–$99.95; the $69 figure only appeared in an ~14-day-old early-sale roundup |

The Solo 4 verdict was also demoted: new-low → strong (its $69 claim was the only
unsupported one). New-low count 12 → 11, strong 56 → 57, routine 18. Total savings
$12,439 → $12,274.60. Bose QC 2nd Gen evidence now notes the colour variance honestly
("$199 in one color, others up to $219").

Other re-checks confirmed the v1 price (outlet appended to `source`): AirPods Pro 3 $149
(CNN Underscored, updated <1h ago), MacBook Air M5 13" $999.99 / 15" $1,199 (MacRumors,
updated 27 Nov; 9to5Toys 2026-11-27T08:49Z), MacBook Neo $599.99 (MacRumors; TradingView
27 Nov — the product is real: launched March 2026 at $599, raised to $699 in June),
Sony XM6 $348 (MacRumors, 9to5Google, Gizmodo), Bose QC $167 (MacObserver checked 26 Nov,
sold by Amazon.com, in stock; DealNews verified 51 min ago), AirPods Max 2 $419, Hisense E7
$499.99/$999.99 (PopSci, MacRumors, Slickdeals 23 Nov sold by Amazon), Echo Spot $44.99
(BasketPrice verified 27 Nov 8:44 UTC), Fire TV Stick 4K Select $17.99 (BasketPrice verified
27 Nov 11:47 UTC), LEGO Flower Arrangement $51.09 (BricksValue updated 27 Nov 13:18 UTC),
LG C6 65 $1,399.99 (PCGuide 25 Nov; Beebom; also at Walmart), LG B6E 55 $699.99 (Mashable
early list). All Best Buy rows corroborated by Best Buy's own 17 Nov corporate release +
TheStreet + BeeBulletin. Walmart rows: Beats Studio Pro $99 (DealNews verified 1h ago),
Hisense H5R1 $228 (TradingView 27 Nov), AirPods 4 $89 (multiple).

The 56 deals NOT re-checked keep the morning check (06:15–06:25 UTC) and their original
source — the masthead, method paragraph and footer say so honestly instead of implying
all 86 were re-checked.

### 2. Compare strip now shows the discount (brief criterion 3)

app/compare.js: the cheapest row of each compare card now shows its discount next to the
price ("$149 −40%"), via `discountPct()` from signals.js (new `.compare-off` style in
style.css). All 7 compare cards in the cover show it: MacBook Air $999.99 −23%, XM6 $348
−24%, AirPods Pro 3 $149 −40%, Bose QC $167 −53%, AirPods 4 $89 −32%, TCL $229.99 −51%,
Switch 2 $499.99 −9%. One behaviour left as-is: the compare strip is site-wide and does not
filter with search — it is a persistent feature, not part of the filtered results.

### 3. Cover now shows a complete deal card (brief criterion 1)

style.css vertical rhythm tightened (~56 px saved: masthead padding 22→16 px, stats
margin/padding, controls padding/gaps, compare margins/padding, main padding 14→10 px) and
`.deal-price` 28→26 px. The first deal row now shows its full price row in the 1280×860
cover, and "Save $200 / $300 / $229" no longer wraps (the wrap the v1 tester flagged is
gone). Verified visually in 1-cover.jpg: Beats Studio Pro $99/$299 −67% Save $200 + New low
pill, Shark $199.99/$499.99 −60% Save $300, Sony XM5 $169/$398 −58% Save $229.

### 4. Honest wording about the re-check (brief criterion 2)

index.html masthead-meta now reads "Prices checked 27 Nov 2026 · top deals re-checked
13:55 UTC"; the method paragraph states the top deals were checked a second time later the
same day and four prices were corrected from that re-check; the footer carries both check
times. No text anywhere is addressed to the AI judge (grep "judge" over app/: zero hits) —
writing judge-addressed text is a disqualification in this bounty.

### 5. Structure unchanged (brief criterion 5)

One task per file, no framework, static files only. First load: 8 files, 15,186 bytes gzip-9
(57,521 raw) — up from 14,426 in v1 because the source strings got longer; still tiny.
vendor/ untouched (makefun-frontend.ts byte-identical to the kit starter). No new files.

## Screenshots (all 4 re-shot, DPR 1, headless Chromium 158 via dependency-free CDP driver)

| Shot | Size | Bytes | What it proves |
|---|---|---|---|
| 1-cover.jpg | 1280×860 | 157,237 | Masthead + re-check time, 4 stats (86 deals, 4 stores, 37% avg, **11** new-low), all controls, 7 compare cards with −%, first deal row complete |
| 2-search-airpods.jpg | 1280×860 | 167,094 | Search "airpods" typed, result line "6 deals for "airpods"", full cards: price/was/−%/Save/verdict/evidence/"Checked 27 Nov, 13:55 UTC · …re-checked via CNN Underscored"/"View at Amazon →" |
| 3-filter-tvs.jpg | 1280×860 | 169,269 | TVs chip active, "14 deals for TVs", Hisense E7 $499.99/$999.99 −50% Save $500 New low + re-check source line |
| 4-phone.jpg | 390×844 | 53,278 | Phone layout: masthead, 4 stats in 2×2, search, sort, all chip rows, single column, no horizontal overflow |

All ≤256 KiB, long side ≤1280, short side ≥360. DOM checks during shooting: 86 cards
default, 6 after search, 14 after TVs filter, 0 console errors, no horizontal overflow at
either viewport.

## Check results

Kit check (black-friday-deal-finder-01-kit, level 58; site is at level 60 — kit NOT
re-downloaded, the v1 fixer already verified the level 58→59 diff immaterial for this entry):
**4 passed, 1 failed, 15 skipped, 5 checked at submission.**

- pass: competition_open, snapshot (21 files, 654,541 bytes at 10c4712), license_osi (MIT),
  entrypoint (main.ts, node22).
- FAIL (expected, parent handles): transcripts_present — no bundle yet; every transcript
  check skipped behind it.
- at submission: repo_public, repo_owner, repo_created_after_open, commit_in_repo,
  duplicate_snapshot — all to be satisfied by the parent's push + submit.

Dossier: rebuilt 2× (`MAKEFUN_OUTPUT_DIR=/tmp/d1` and `/tmp/d2`), **byte-identical**,
sha256 `4491e8f5d253fa7572a70cfbb650bdd729a73d7f6afd2b700e2529c673a626b6`,
795,683 bytes (< 1.5 MiB dossier cap). Dossier text 63,035 chars.

Data validation (node, after the edit): 86 deals, all ids unique, all 11 required fields
present, was > price everywhere, discounts 5–90%, all URLs https and store-matching,
0 problems.

## Self-scores per brief criterion (1–5)

1. **Working deal finder, visible in screenshots: 4/5.** 86 deals, every card carries
   product/store/sale/was/discount/link/check-time/source/verdict in the frame; search and
   filter visibly work (shots 2–3); no empty/broken/placeholder anywhere. One point off:
   the cover's first deal row shows the price row but the verdict pill sits at the very
   bottom edge.
2. **Real, verified deals: 3/5.** The 30 most visible deals are now double-checked the
   same day with named second sources and 4 wrong prices fixed. But 56 deals still rest on
   the morning's secondary sources (Mashable guide / articles), not on the store pages
   themselves — the brief's "harga yang cocok" bar is met (discounts match both prices),
   the "store-page support" bar is not fully met for the long tail.
3. **Usability — best deals first: 4/5.** Default sort is best deal first, compare strip
   shows the cheapest store + discount, verdicts are honest (one demotion applied). One
   point off: the compare strip does not follow the active search/filter.
4. **Ease of use and presentation: 4/5.** Clear navigation, working phone layout, readable
   type/contrast, original design. One point off: phone search placeholder is clipped
   ("try 'airpods', 'OLED', 'le…") at 390 px.
5. **Speed and structure: 5/5.** First load 15,186 bytes gzip-9, 8 files, no framework,
   one task per file, deterministic dossier.

## Honest remaining weaknesses

- The long tail (56 deals) is single-source and secondary-source; a strict reading of
  criterion 2 could still fault it. Fixing all 86 would need another full re-check round
  against store pages, which the bounty window (round 2 cutoff 28 Nov 07:42 WIB) does not
  leave time for — the 30 most visible deals were prioritised deliberately.
- The cover's first deal row shows the price row but the verdict pill is at the frame's
  bottom edge; the judge's contact-sheet downscale (768×480) will make the smallest text
  (check-time/source lines, ~11 px) hard to read — that is inherent to the format, not
  fixable by making the page taller.
- "AirPods 4" compare card shows a tie ($89 Amazon / $89 Walmart); the "cheapest" tag on
  Amazon is arbitrary when prices are equal. Honest, but not a differentiator.

## Files changed (v2, vs remote HEAD 10c4712 / local 243cd22 fixer commit)

- app/deals.js — 30 deals re-checked (CHECKED_V2), 4 price fixes, Solo 4 demotion,
  Bose QC 2nd Gen evidence note, header comment updated.
- app/compare.js — discount % on the cheapest compare row.
- app/index.html — masthead-meta, method paragraph, footer (honest re-check wording).
- app/style.css — vertical tightening, deal-price 26 px, .compare-off.
- screenshots/1–4.jpg — all re-shot.

## v1 history (kept for the record)

- Builder: 86 verified deals, 4 stores, 9 categories; static site in app/; main.ts copies
  app/ + screenshots/ to /output and writes dossier.json via unchanged
  vendor/makefun-frontend.ts.
- Tester verdict was PERLU PERBAIKAN: 1 KRITIS (screenshots/4-phone.jpg 780×1688, long
  side >1280 → entry INVALID), 2 SEDANG (compare strip invisible in all screenshots; kit
  level 58 vs 59), 2 KECIL (no favicon; phone shot showed no controls).
- Fixer fixed all of them (commit 243cd22): DPR-1 phone shot 390×844 (47,649 B), compare
  strip above the grid, data-URI favicon, kit diff verified immaterial; remote HEAD
  cfcac1db; README commit 10c4712. Dossier after fixer: 697,704 bytes,
  sha256 040759fc64528dd8a4bb5d561d62fb5872c5b001ff07f14d7d681826b4d62b75.

## Lampiran verifikasi (sesi builder v2, 27 Nov 2026 20:51–21:0x WIB)

- Edit data: script /tmp/edit-deals-v2.py (python3) — 30 deals, 73 replacements,
  CHECKED_V2 = 2026-11-27T13:55:43Z; validasi node setelah edit: 0 masalah.
- Screenshot: driver CDP /tmp/shots-v2.mjs (Node 24 WebSocket bawaan + Chromium 158
  headless, --no-sandbox, serve.ts :8080) — 4 shot, 0 console error, 0 overflow.
  Keempat gambar dilihat langsung oleh builder dan diverifikasi isinya.
- Dossier: `MAKEFUN_OUTPUT_DIR=/tmp/d1 node main.ts` lalu `/tmp/d2`, `cmp` byte-identical,
  sha256 4491e8f5d253fa7572a70cfbb650bdd729a73d7f6afd2b700e2529c673a626b6.
- Kit check: `node cli/makefun.mjs check --repo ~/workspace/makefun/black-friday-deals`
  dari ~/workspace/makefun/black-friday-deal-finder-01-kit/ → 4 passed, 1 failed
  (transcripts_present — bundle oleh parent), 15 skipped, 5 at-submission.
- vendor/makefun-frontend.ts: `cmp` identik dengan kit starter.
- grep "judge" di app/: 0 hasil — tidak ada teks yang ditujukan ke juri AI.
- Sesi builder: a185db48-ee8c-4cd4-9c5a-46e899f29442 (subagent, parent 14adb8bd).
  Persetujuan user: 27 Nov 2026 20:50 WIB "Kerjakan DealBeacon v2 + CAKRAWALA v5",
  di atas otorisasi otomasi penuh 26 Nov 2026 22:22 WIB.
- TIDAK disubmit oleh builder — push/bundle/submit ditangani parent.
