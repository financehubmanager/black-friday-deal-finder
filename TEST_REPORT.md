# TEST_REPORT.md — DealBeacon v2 (independen)

Bounty: black-friday-deal-finder-01 ("Make the best Black Friday deal finder"), $250, 20 tempat.
Repo lokal: ~/workspace/makefun/black-friday-deals/, commit yang diuji **52e558b**.
Kit: ~/workspace/makefun/black-friday-deal-finder-01-kit/ (level 58; situs level 60 — kit TIDAK
diunduh ulang; v1 fixer sudah memverifikasi selisih level 58→59 immaterial untuk entry ini).
Tester: subagent independen, sesi e77ca54d-3dba-4fb8-9803-04af266b81c5, 27 Nov 2026 ~21:00–21:20 WIB.
Persetujuan user: 27 Nov 2026 20:50 WIB "Kerjakan DealBeacon v2 + CAKRAWALA v5", di atas
otorisasi otomasi penuh 26 Nov 2026 22:22 WIB.

## Verdict: LAYAK SUBMIT

**0 KRITIS, 1 SEDANG (warisan, tidak bisa diperbaiki sebelum cutoff ronde 2), 5 KECIL.**
v2 secara ketat lebih baik dari v1 pada kriteria brief #1, #2, #3. Tidak ada yang memblokir submit.
Perbaikan opsional 2 baris data (KECIL-1, KECIL-2) boleh dilakukan sebelum push — tidak butuh
re-shoot, TAPI dossier harus dibangun ulang + diverifikasi ulang setelah perubahan data apa pun
(hash akan berubah).

## 1. Kit check — diverifikasi sendiri (bukan percaya BUILD_REPORT)

`node cli/makefun.mjs check --repo ~/workspace/makefun/black-friday-deals` dari kit:
**4 passed, 1 failed, 15 skipped, 5 checked at submission** — sama persis dengan klaim builder.

- pass: competition_open (dibuka 2026-11-27T00:42:00Z, deadline 2026-11-29T00:42:00Z),
  snapshot (21 files, 734.569 byte pada 52e558b), license_osi (SPDX MIT), entrypoint (main.ts, node22).
- FAIL (diharapkan, ditangani parent): transcripts_present — belum ada bundle; semua check
  transcript lain skip di belakangnya.
- at submission (5): repo_public, repo_owner, repo_created_after_open, commit_in_repo,
  duplicate_snapshot — dipenuhi oleh push + submit parent.

## 2. Determinisme + vendor — diverifikasi sendiri

- Dossier dibangun 2× (`MAKEFUN_OUTPUT_DIR=/tmp/t1` dan `/tmp/t2`, `node main.ts`):
  **byte-identical**, sha256 dossier.json
  `4491e8f5d253fa7572a70cfbb650bdd729a73d7f6afd2b700e2529c673a626b6` — SAMA PERSIS
  dengan klaim builder (teks dossier 63.035 karakter).
- vendor/makefun-frontend.ts: `cmp` identik dengan kit starter
  (`starter/vendor/makefun-frontend.ts`, sha256 `4c8da1c8…9240`).
- Totals di dossier (dibaca dari teks dossier, bukan dari klaim builder): first load
  **8 file, 15.186 byte gzip-9 (57.521 raw)** — sama dengan klaim builder.

## 3. Screenshot — dilihat langsung keempatnya (bukan percaya klaim)

Semua dalam batas: 1–3 = 1280×860, 4 = 390×844, masing-masing <256 KiB.

### 1-cover.jpg — TERBACA
- Masthead "DealBeacon — Real Black Friday deals, checked today — not red sticker prices."
  + "Prices checked 27 Nov 2026 · top deals re-checked 13:55 UTC".
- 4 stat: 86 verified deals / 4 stores / 37% average discount / 11 new-low prices.
- Search + sort "Best deal first" + chip kategori/toko/diskon/verdict + baris "86 deals —
  sorted best deal first." Semua terlihat.
- Compare strip "Same product, several stores — cheapest first": 7 kartu, masing-masing
  menampilkan harga termurah + diskon (MacBook Air $999.99 −23%, XM6 $348 −24%,
  AirPods Pro 3 $149 −40%, Bose QC $167 −53%, AirPods 4 $89 −32%, TCL $229.99 −51%,
  Switch 2 $499.99 −9%). Klaim builder terkonfirmasi.
- Baris deal pertama LENGKAP: Beats Studio Pro $99/$299 −67% Save $200 + pill "New low"
  (terlihat, di tepi bawah frame), Shark $199.99/$499.99 −60% Save $300,
  Sony XM5 $169/$398 −58% Save $229. "Save $..." satu baris, tidak wrap.

### 2-search-airpods.jpg — TERBACA
- "airpods" terketik, "6 deals for "airpods" — sorted best deal first." Search TERLIHAT bekerja.
- Kartu penuh: produk/toko/harga sale/harga biasa/−%/Save/verdict/evidence/baris
  check-time+sumber/tombol "View at Amazon/Walmart →". Contoh terverifikasi:
  AirPods Pro 3 $149/$249 −40% Save $100 New low, "Lowest price tracked for Pro 3;
  $100 under list." + "Checked 27 Nov, 13:55 UTC · Mashable Black Friday 2026 guide;
  re-checked via CNN Underscored, 27 Nov 2026". AirPods 4 $89/$129.99 −32% Save $40.99
  Strong deal + re-check via EmbroidHub.
- CATATAN: compare strip TIDAK mengikuti search (lihat KECIL-3).

### 3-filter-tvs.jpg — TERBACA
- Chip "TVs" aktif, "14 deals for TVs — sorted best deal first." Filter TERLIHAT bekerja.
- Hisense E7 $499.99/$999.99 −50% Save $500 New low, "Half price on a 65-inch Mini-LED
  set." + "Checked 27 Nov, 13:55 UTC · …re-checked via Slickdeals, 27 Nov 2026".
  LG B6 48" $599.99/$1,199.99 −50% Save $600 Strong deal — TAPI baris ceknya hanya
  "Checked 27 Nov, 06:15 UTC · Mashable Black Friday 2026 guide" (lihat SEDANG-1).
  LG B6E 55" $699.99/$1,399.99 −50% Save $700 Strong deal + re-check 13:55 UTC.
- CATATAN: compare strip TIDAK mengikuti filter (lihat KECIL-3).

### 4-phone.jpg (390×844) — TERBACA
- Masthead, 4 stat 2×2, search, sort "Best deal first", semua baris chip — tidak ada
  horizontal overflow yang terlihat. Layout HP bekerja.
- Satu cacat kosmetik: placeholder search terpotong ("try "airpods", "OLED", "le…")
  pada 390 px (lihat KECIL-4). Baris "Verdict" terpotong di tepi bawah frame — itu
  halaman yang bisa di-scroll, bukan cacat.

## 4. Empat harga yang diperbaiki — diverifikasi (angka + sumber + aritmetika)

Validasi data mandiri (node, regex atas app/deals.js): **86 deal, id unik, semua 11 field
wajib ada, was > price di semua deal, diskon 5–90%, sinyal new-low 11 / strong 57 /
routine 18** — sama dengan klaim builder.

| Deal | v2 | Aritmetika | Verifikasi eksternal (pencarian web, 27 Nov 2026) |
|---|---|---|---|
| AirPods 4 (Amazon) | $89 / $129.99 (−31,5%, hemat $40,99) | cocok; evidence "Solid $40 cut" | MASUK AKAL. List $129.99; $89 adalah harga BF yang dilaporkan luas. |
| Samsung S85H 65" (Amazon) | $899,99 / $1.597,99 (−43,7%, hemat $698,00) | cocok; "$698 off" | MASUK AKAL. S85H adalah model OLED 2026 Samsung yang nyata (QN65S85HAEXZA, pengganti S85F); list $1.797,99–$1.899 (Trusted Reviews $1.899; B&H $1.197,99 vs $1.797,99). $899,99 agresif tapi dalam kisaran doorbuster BF. |
| Switch 2 bundle (Amazon + Walmart) | $499,99 / $549,99 (−9,1%, hemat $50,00) | cocok | BENAR. Nintendo menaikkan bundle ke $549,99 akhir Sep 2026 (setelah kenaikan harga hardware) dan penawaran BF mengembalikannya ke $499,99 s.d. 5 Des — dikonfirmasi siaran pers Nintendo, The Verge, Notebookcheck, Tom's Hardware. Kecurigaan awal tester ("was $549,99 karangan") TERBUKTI SALAH setelah pengecekan. |
| Beats Solo 4 (Walmart) | $99,95 / $199,95 (−50%, hemat $100,00) | cocok | MASUK AKAL. List $199,95; $99,95 setengah harga di Walmart. Demotion new-low → strong sudah tepat. |

## 5. Grep teks yang ditujukan ke juri AI — BERSIH

`grep -ri "judge" app/ main.ts serve.ts` (dan pemeriksaan visual keempat screenshot):
**0 hasil.** Tidak ada teks yang ditujukan ke juri AI di app/ maupun di screenshot —
tidak ada risiko diskualifikasi dari sisi ini. (BUILD_REPORT.md/TEST_REPORT.md tidak
ikut terkirim — main.ts hanya menyalin app/ + screenshots/ — jadi laporan ini pun tidak
masuk dossier.)

## Daftar cacat (prioritas + bukti)

### SEDANG
- **SEDANG-1 — 56 dari 86 deal masih single-source (sumber sekunder pagi hari).**
  Bukti: hanya 30 deal paling terlihat yang di-re-check (CHECKED_V2 = 2026-11-27T13:55:43Z,
  31 kemunculan di deals.js); 56 sisanya memakai checked pagi 06:15–06:25 UTC dari
  Mashable guide/artikel, bukan halaman toko. TERLIHAT di screenshot: kartu LG B6 48"
  di shot 3 hanya "Checked 27 Nov, 06:15 UTC · Mashable Black Friday 2026 guide".
  Dampak pada juri: kriteria #2 menuntut harga yang didukung sumber; juri hanya melihat
  screenshot, jadi dampaknya terbatas pada kartu yang terlihat — tapi kartu yang terlihat
  pun campur (ada yang re-check, ada yang tidak). TIDAK BISA diperbaiki sebelum cutoff
  ronde 2 (28 Nov 07:42 WIB) — butuh satu ronde re-check penuh terhadap halaman toko.
  Bukan blocker: v2 tetap ketat lebih baik dari v1 (4 harga diperbaiki, waktu re-check
  ditampilkan, wording jujur di masthead/metode/footer).

### KECIL
- **KECIL-1 — Evidence basi di wm-airpods-4:** `"$41 off; cheaper than Amazon's $114.99."`
  Harga Amazon sekarang $89 (kedua toko $89, seri) — klaimnya salah secara faktual
  setelah perbaikan v2. TIDAK terlihat di keempat screenshot (kartu itu di bawah lipatan
  shot 2), jadi dampak nol pada juri AI; hanya relevan untuk hand review. Perbaikan:
  1 baris — ganti evidence menjadi "$41 off; same price as Amazon."
- **KECIL-2 — S85H: evidence vs verdict tidak konsisten:** evidence `"$698 off the
  65-inch OLED; record low."` sementara signal `strong`. Kalau benar record low,
  verdict jujur menurut kriteria #2 adalah new-low; kalau evidence hanya dari sumber
  sekunder, kata "record low" overclaim. Perbaikan 1 baris: ubah signal ke new-low
  (jadi 12 new-low) ATAU lunakkan evidence menjadi "deep cut on the 65-inch OLED".
- **KECIL-3 — Compare strip tidak mengikuti search/filter (terlihat di shot 2 & 3).**
  Bukti visual: saat search "airpods", strip tetap menampilkan MacBook Air, XM6,
  Bose QC, TCL TV; saat filter "TVs", strip tetap menampilkan produk non-TV.
  Di bacaan screenshot juri, ini bisa terbaca seolah filter tidak sepenuhnya bekerja
  (kriteria #1). Kartu hasil di bawahnya MEMBUKTIKAN filter bekerja, jadi ini kosmetik.
  TIDAK direkomendasikan diperbaiki sebelum ronde 2: butuh re-render strip + re-shoot
  keempat screenshot + uji ulang, risiko > manfaat.
- **KECIL-4 — Placeholder search terpotong di HP:** shot 4, "try "airpods", "OLED",
  "le…" pada 390 px. Kosmetik; sudah diakui builder.
- **KECIL-5 — Seri AirPods 4 di compare strip:** Amazon $89 / Walmart $89, tag
  "Amazon cheapest" arbitrer saat harga sama. Kosmetik; sudah diakui builder.

### Inheren (bukan cacat, dicatat saja)
- Teks terkecil (baris check-time/sumber ~11 px) akan jadi ~6–7 px pada skala contact
  sheet 768 px — sulit dibaca, tapi itu bawaan format; semua entry menghadapinya.
- Pill verdict baris deal pertama di cover duduk di tepi bawah frame (terlihat, tapi mepet).

## Skor mandiri per kriteria brief (1–5)

1. **Working deal finder, visible in screenshots: 4/5.** 86 deal, kartu lengkap di semua
   shot, search/filter TERLIHAT bekerja, compare strip menampilkan diskon, layout HP
   bekerja. −1: compare strip tidak mengikuti filter + pill verdict cover di tepi frame.
2. **Real, verified deals: 3/5.** 30 deal paling terlihat di-re-check di hari yang sama
   dengan sumber kedua bernama, 4 harga diperbaiki (semuanya terverifikasi benar oleh
   tester, termasuk Switch 2 yang awalnya dicurigai), wording re-check jujur. −2: 56 deal
   ekor masih single-source sekunder + 2 evidence bermasalah (KECIL-1, KECIL-2).
3. **Usefulness — best deals first: 4/5.** Sort default best-deal-first, compare strip
   termurah + diskon, verdict jujur (satu demotion diterapkan). −1: compare strip tidak
   mengikuti filter aktif.
4. **Ease of use and look: 4/5.** Navigasi jelas, layout HP bekerja, type/kontras terbaca,
   desain original. −1: placeholder search terpotong di HP.
5. **Speed and structure: 5/5.** First load 8 file, 15.186 byte gzip-9 (terverifikasi dari
   teks dossier), tanpa framework, satu tugas per file, dossier deterministik.

## Rekomendasi untuk parent

1. **Submit v2 apa adanya** — LAYAK SUBMIT. Target ronde 2, cutoff 28 Nov 07:42 WIB.
2. Opsional (bila waktu mengizinkan sebelum push): perbaiki KECIL-1 + KECIL-2 (2 baris
   di app/deals.js, tanpa re-shoot). Setelah perubahan data apa pun, bangun ulang dossier
   2× dan verifikasi ulang sha256 — hash 4491e8f5… di atas hanya berlaku untuk commit 52e558b.
3. JANGAN perbaiki KECIL-3 sebelum ronde 2 (re-shoot penuh, risiko > manfaat).
4. Untuk ronde 3 (bila ada waktu): ronde re-check penuh 56 deal ekor terhadap halaman toko
   (SEDANG-1) — itu satu-satunya perbaikan besar yang tersisa untuk kriteria #2.
