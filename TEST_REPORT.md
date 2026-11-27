# TEST REPORT — DealBeacon (Black Friday deal finder)

**Bounty:** Build the best real Black Friday deal finder (`black-friday-deal-finder-01`)
**Entry:** DealBeacon, repo lokal `~/workspace/makefun/black-friday-deals/`, git HEAD `8993932`
**Kit:** `~/workspace/makefun/black-friday-deal-finder-01-kit/` (level 58)
**Tester:** independen (bukan builder). **Tidak ada kode diubah, tidak ada submit, tidak ada repo GitHub/push.**
**Tanggal uji:** 27 Nov 2026, ~13:27–13:45 WIB (06:27–06:45 UTC). Node `v24.22.1` (memenuhi syarat ≥22.18).
**Driver uji:** skrip CDP buatan sendiri `/tmp/tester-playtest.mjs` + `/tmp/sorttest.mjs`
(Playwright Chromium 1254, `~/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome`),
server statis lokal di `127.0.0.1:8931/8932` — bukan skrip builder.

## VERDICT: PERLU PERBAIKAN

**1 cacat KRITIS yang membuat entry INVALID di sealed scorer bila disubmit apa adanya**
(RULES.txt baris 18–21: scorer 5 baris, entry valid hanya bila 4 baris pertama lolos;
`screenshots` adalah baris ke-3). Selain itu entry berfungsi penuh dan data bersih.
**Jangan submit sebelum cacat #1 diperbaiki + dossier dibangun ulang + check diulang.**

---

## 1. Gate kit — hasil `node cli/makefun.mjs check`

Perintah: `node cli/makefun.mjs check --kit <kit> --repo ~/workspace/makefun/black-friday-deals`
(27 Nov 2026 06:27 UTC, dari dalam kit).

| Check | Hasil |
|---|---|
| competition_open | **pass** — now 2026-11-27T06:27Z, di antara opening 2026-11-27T00:42Z dan deadline 2026-11-29T00:42Z |
| snapshot | **pass** — 18 files, 713.138 bytes, commit `8993932bd3fd0cf6a0f429db4c52ae5a10aa21b8` |
| license_osi | **pass** — MIT |
| entrypoint | **pass** — main.ts → node22 |
| transcripts_present | **FAIL — expected**: "no transcripts were uploaded". Transkrip dibundel saat submit oleh watcher, bukan oleh builder. Semua check transkrip lain `skip` karenanya. |
| repo_public / repo_owner / repo_created_after_open / commit_in_repo / duplicate_snapshot | "at submission" — belum bisa dinilai lokal (repo GitHub belum ada; `.makefun/owner.json` sudah ada, wallet `5XrS76uzjrhf9pyMBVQpfL1SpyxX7Dk8vyFUncED2o39`) |
| **Catatan kit** | `note: this kit copy is level 58 and https://make.fun is at level 59` — lihat cacat #3 |

Klaim builder "4 passed, hanya transcripts_present yang FAIL" **terkonfirmasi persis**.

## 2. Determinisme dossier & vendor — TERKONFIRMASI

- `MAKEFUN_OUTPUT_DIR=/tmp/t1 node main.ts` lalu `/tmp/t2`: `cmp` lolos,
  sha256 dossier.json **identik di kedua run dan sama persis dengan klaim builder**:
  `650c29561eeb2f3293e71661b58129f67149472f57620c71f50166d950819bc8`.
- Dossier 812.893 byte (< 1,5 MiB), teks 60.914 byte (< 160 KiB).
- `vendor/makefun-frontend.ts` **byte-identical** dengan kit starter
  (sha256 `4c8da1c8e76490b3a847670f49137d3ec23953e3c988fe6a6cb320fce5739240`, `cmp` lolos).
- Load block dossier: first load **8 file, 14.426 byte gzip-9 (55.293 raw)**; `import()` 0 file —
  sesuai klaim builder.

## 3. Playtest headless (desktop 1280×860 + HP 390×844) — LULUS

Server statis lokal, Chromium headless via CDP, hasil `/tmp/playtest-report.json`:

| Uji | Hasil |
|---|---|
| Kartu deal ter-render | **86** (`article`, setelah reload; 93 saat pertama karena +7 kartu compare) |
| Search `airpods` | **6 hasil** ("6 deals for 'airpods'"), judul pertama AirPods Pro 3 / AirPods 4 / AirPods Max 2 |
| Filter kategori TVs | **14 hasil**, chip "TVs" aktif |
| Sort "Biggest % off" | Urutan ter-render **67, 65, 64, 60, 59, 58%** — sama persis dengan urutan `discountPct` dari `deals.js` |
| Sort "Lowest price" | $14.99 → $17.99 → $18 → $19.94 → $22.50 → $34.99 (naik, benar) |
| Sort "Biggest saving ($)" | $1.300 → $832 → $700 → $600 → $500 → $350 (turun, benar) |
| Console error | **0** |
| Request eksternal | **0** (total 25 request, semua ke `127.0.0.1`) |
| Request gagal | **0**, kecuali favicon (lihat cacat #4) |
| HP 390px | 86 kartu, `scrollWidth` 390 — **tidak ada horizontal overflow**, satu kolom rapi |
| Placeholder / kosong / rusak | tidak ditemukan (`/lorem|TODO|placeholder/i` pada data: 0) |

`signals.js:12-14` terverifikasi: diskon selalu dihitung `Math.round((1 - price/was) * 100)`,
bukan angka yang diketik.

## 4. Screenshot — 3 dari 4 LULUS, 1 MELANGGAR ATURAN (KRITIS)

| File | Ukuran | Dimensi | Status |
|---|---|---|---|
| `1-cover.jpg` | 139.822 B | 1280×860 | OK — masthead, 4 stat, search+filter, kartu lengkap (harga, was, −%, save, verdict, evidence, check time, source, tombol toko). Dilihat langsung: bagus. |
| `2-search-airpods.jpg` | 132.325 B | 1280×860 | OK — "airpods" di kotak search, "6 deals for 'airpods'", kartu AirPods lengkap. Dilihat langsung: bagus. |
| `3-filter-tvs.jpg` | 151.590 B | 1280×860 | OK — chip TVs aktif, "14 deals for TVs". Dilihat langsung: bagus (terpotong di atas: masthead tidak terlihat; tidak masalah). |
| `4-phone.jpg` | 137.699 B | **780×1688** | **GAGAL — sisi panjang 1688 > 1280** (lihat cacat #1). Dilihat langsung: hanya kartu deal, tanpa masthead/search/filter. |

Semua file ≤256 KiB, semua render asli situs sendiri (cocok dengan render ulang saya).
Cover = `1-cover.jpg` (dossier `cover: 0`).

## 5. Data deal — spot-check SEMUA 86 (programatik) + koroborasi harga headline

Skrip Node atas `deals.js` (86 deal): **0 masalah** — semua `id` unik, semua field
(`id, group, title, store, category, price, was, url, checked, source, signal, evidence`) ada,
semua `was > price`, semua diskon 5–90%, semua URL `https://` dan **host cocok dengan toko**
(0 mismatch: amazon.com 62, bestbuy.com 7, walmart.com 11, target.com 6).
Distribusi: toko Amazon 62 / Best Buy 7 / Walmart 11 / Target 6; kategori Audio 21, TVs 14,
Smart home 11, Kitchen 8, Home 8, Laptops 7, Gaming 7, Toys 6, Wearables 4;
verdict new-low 12 / strong 56 / routine 18 — sesuai BUILD_REPORT.
Semua `checked` = `2026-11-27T06:15:00Z` atau `06:25:00Z` (di dalam window kompetisi,
dibuka 00:42 UTC). Semua deal punya sumber bernama. Verdict masuk akal:
new-low diskon 23–67%, routine 9–40%.
7 produk dibandingkan lintas toko (78 grup unik); tidak ada teks yang ditujukan ke juri
(`grep -ri judge|make.fun` pada `app/`: 0 hasil, di luar vendor).

**Koroborasi harga headline (pencarian web independen, 27 Nov 2026):**
AirPods Pro 3 **$149 / was $249** dan MacBook Air M5 13" **$999.99 / was $1.299**
dikonfirmasi oleh MacRumors, 9to5Toys, Macworld, dan AppleInsider — sama persis dengan
entry. Jadi harga Amazon yang bersandar pada guide Mashable **terkoroborasi silang**;
risiko finalist review untuk harga-harga ini turun ke **rendah-sedang** (lihat catatan risiko).

Contoh matematika yang dicek manual dari screenshot: TCL 65" $229.99/$469.99 = −51% ✓;
LG 55" B6E $699.99/$1.399.99 = −50%, save $700 ✓; LG C6 $1.399.99/$2.699.99 = −48%,
save $1.300 ✓; Beats Studio Pro $99/$299 = −67%, save $200 ✓.

## 6. Compare strip — ADA di situs, TIDAK ADA di screenshot mana pun (terkonfirmasi)

`#compare` ("Same product, several stores — cheapest first", 7 grup) ada di DOM:
desktop di y≈9725 (halaman ~10.000 px), HP di y≈27910 (halaman ~28.000 px).
Isi benar: MacBook Air M5 Amazon $999.99 termurah vs Best Buy $1.049; AirPods Pro 3
Amazon/Walmart $149 vs Target $179.99; dst. — sesuai BUILD_REPORT.
Kelemahan: juri hanya melihat screenshot + outline dossier; strip ini hanya muncul
di outline (deklarasi `compareGroups`/`compareCardHTML`), bukan di gambar mana pun.
Pembeli juga harus scroll melewati ke-86 kartu untuk menemukannya.

## 7. Kit level 58 vs 59 — TERKONFIRMASI, dampak prosedural

- `skill.md` lokal versi **1.5.305**; `curl https://make.fun/heartbeat.md` menjawab
  `version: "1.5.309"`, dan `check` mencatat "kit copy is level 58 and https://make.fun is at level 59".
- Dampak: check lokal tetap jalan dan lolos; mismatch ini **peringatan, bukan penolakan**
  (tidak ada check yang FAIL karenanya). Namun rules/bundle bisa berbeda antar level —
  sebelum submit, watcher harus **unduh ulang kit, bangun ulang dossier, dan jalankan
  ulang `check`** dengan kit baru (murah, ~1 menit). Lihat cacat #3.

## 8. Scorecard independen (kriteria juri, RULES.txt baris 42–51)

| # | Kriteria | Skor | Alasan |
|---|---|---|---|
| 1 | Finder bekerja di screenshot | **8/10** | Cover + search + filter sangat kuat dan terbukti hidup. −2: shot HP hanya menampilkan kartu (tanpa masthead/search/filter), dan compare strip tidak terlihat di screenshot mana pun. |
| 2 | Deal nyata & terperiksa | **8/10** | Matematika 86/86 konsisten, sumber bernama + waktu cek di tiap kartu, harga headline terkoroborasi silang. −1: 62 harga Amazon bersandar pada sumber sekunder (Mashable, bukan halaman toko langsung). −1: harga Best Buy/Walmart/Target bersandar pada artikel 17–25 Nov (pra-pembukaan), bukan pembacaan halaman toko 27 Nov. |
| 3 | Kegunaan shopper | **8/10** | Sort 5 arah + filter lengkap semua bekerja; compare 7 produk; kondisi deal ditampilkan. −2: compare strip terkubur di bawah 86 kartu. |
| 4 | Kemudahan + tampilan original | **8/10** | Desain navy/amber original, hierarki jelas, kontras baik, HP satu kolom rapi, tanpa branding toko yang dicopy. −2: kartu LG C6 "Save $1.300" terlipat ke baris sendiri; shot HP tidak menunjukkan kontrol. |
| 5 | Kecepatan + struktur | **9/10** | First load 14,4 KB gzip, 8 file; sumber terpisah satu-tugas-per-file dengan nama yang menjelaskan fungsinya (`deals/signals/filters/render/compare/main`). |

**Kritik visual:** hierarki kuat (angka harga besar, badge −% merah, verdict pill hijau/kuning);
kontras teks-terhadap-latar baik di desktop maupun HP; kartu terbaca penuh tanpa terpotong
(kecuali lipatan "Save $1.300" pada satu kartu TV). Palet navy + amber khas, bukan tiruan
tampilan Amazon/Best Buy. Cover adalah gambar terkuat entry ini.

---

## DAFTAR CACAT

### KRITIS

**#1 — `screenshots/4-phone.jpg` 780×1688 melanggar batas sisi panjang 1280 px → entry INVALID.**
- Bukti: `python3 -c "from PIL import Image; Image.open('screenshots/4-phone.jpg').size"` →
  `(780, 1688)`; BUILD_REPORT sendiri menulis "390×844 @2x" — tangkapan diambil pada
  deviceScaleFactor 2 sehingga 390×844 menjadi 780×1688.
- Aturan: RULES.txt baris 21 (check `screenshots`): "each … at most 256 KiB, … its long
  side at most 1280 and its short side at least 360 pixels". Scorer (baris 18):
  "the entry is valid when the first four pass" — `screenshots` adalah baris ke-3
  (app_files, references, screenshots, dossier_matches). Gagal di sini = Valid 0,
  tidak dinilai juri, tidak dapat hadiah.
- Mengapa lolos dari builder: `makefun check` lokal hanya memeriksa `snapshot`, bukan
  dimensi screenshot — check lokal yang "4 passed" **tidak mendeteksi ini**.
- Perbaikan: ambil ulang shot HP pada DPR 1 (390×844) ATAU downscale `4-phone.jpg`
  ke sisi panjang ≤1280 (mis. 780×1280 → potong, atau resize ke 576×1248),
  lalu **bangun ulang dossier** (`MAKEFUN_OUTPUT_DIR=out node main.ts`, verifikasi
  sha berubah + deterministik 2×) dan jalankan ulang `check`. Sambil itu, ambil shot HP
  dari bagian atas halaman (masthead + search + filter terlihat) agar kriteria 1
  juga membaik — shot saat ini hanya menampilkan kartu deal.

### SEDANG

**#2 — Compare strip tidak muncul di screenshot mana pun.**
- Bukti: strip `#compare` ada di DOM (desktop y≈9725, HP y≈27910) tapi keempat
  screenshot tidak menampilkannya; builder mengakui hal yang sama.
- Dampak: kriteria juri #3 (produk sama dibandingkan lintas toko) hanya terbaca lewat
  outline dossier, bukan lewat gambar — juri membandingkan lewat screenshot. Nilai
  tambah terbesar kedua setelah harga (7 perbandingan) praktis tidak terlihat.
- Perbaikan: ganti salah satu screenshot (mis. `3-filter-tvs.jpg`) dengan shot yang
  menampilkan strip compare, atau pindahkan strip ke atas grid (di bawah stat) lalu
  ambil ulang cover. Bila strip dipindah, bangun ulang dossier + check ulang.

**#3 — Kit lokal level 58, make.fun level 59 (skill 1.5.305 vs heartbeat 1.5.309).**
- Bukti: output `check` ("this kit copy is level 58 and https://make.fun is at level 59")
  dan `curl https://make.fun/heartbeat.md` → `version: "1.5.309"`.
- Dampak: bukan penolakan; check lokal tetap berjalan. Risiko: rules/bundle antar level
  bisa berbeda.
- Perbaikan: sebelum submit, unduh ulang kit dari
  `https://make.fun/c/black-friday-deal-finder-01/kit`, bangun ulang dossier, jalankan
  ulang `check` dengan kit baru.

### KECIL

**#4 — Tidak ada favicon: satu-satunya request gagal di playtest.**
- Bukti: playtest saya mencatat `badResponses: ["404 http://127.0.0.1:8931/favicon.ico"]`;
  `app/` tidak berisi `favicon.ico` dan tidak ada `<link rel="icon">`.
- Dampak: tidak ada pada gate (`references` tidak memeriksa favicon tanpa link).
  Hanya kebersihan: 1 request 404 di tiap load.
- Perbaikan: tambahkan `favicon.ico` kecil di `app/` + `<link rel="icon">`, atau terima
  apa adanya.

**#5 — Shot HP (4-phone.jpg) tidak menunjukkan kontrol finder di HP.**
- Bukti: gambar hanya menampilkan kartu deal (lihat §4). Terkait #1: saat mengambil ulang
  shot HP, ambil dari atas halaman agar masthead, search, dan chip filter terlihat.

---

## CATATAN RISIKO (bukan cacat — untuk pertimbangan watcher)

1. **Harga Amazon (62 deal) bersandar pada guide Mashable, bukan halaman toko langsung**
   (Amazon mengembalikan 403 ke text fetcher — klaim builder terkonfirmasi masuk akal).
   Koroborasi silang saya (MacRumors/9to5Toys/Macworld/AppleInsider) mengonfirmasi harga
   headline; risiko diskualifikasi di finalist review (top 10) **rendah-sedang**.
   Yang tersisa: 62 harga tidak bisa dibuktikan dari halaman Amazon langsung oleh reviewer.
2. **Harga Best Buy/Walmart/Target bersandar pada artikel 17–25 Nov 2026** (pra-pembukaan
   kompetisi 27 Nov 00:42 UTC). Situs mengklaim "Checked 27 Nov, 06:15/06:25 UTC" — yang
   dibaca ulang 27 Nov adalah artikel-artikel itu, bukan halaman toko. Finalist review
   memeriksa "price is an earlier sale's, shown by its store or source only from before
   the competition opened" — sumber-sumber ini memang mencantumkan harga event tersebut,
   jadi ada dukungan, tetapi reviewer yang ketat bisa mempertanyakan tanggalnya.
   Risiko **rendah-sedang**, hanya relevan bila entry masuk top 10.
3. **Transkrip belum dibundel** — expected; watcher yang membundel saat submit.
   Perhatian: builder mengklaim file dihitung ditulis dalam ≥2 pesan asisten
   (`thinking_revised`); ini baru bisa diverifikasi saat bundle + check dengan
   `--transcripts` dijalankan.
4. **Satu detail kecil dari BUILD_REPORT:** "Walmart Beats Solo 4 'was' $199 (Muck Rack
   bilang normal $200)" — selisih $1, tidak material, tidak saya verifikasi lebih lanjut.

## RINGKASAN PERINTAH VERIFIKASI (untuk audit ulang)

```
node --version                                   # v24.22.1
node cli/makefun.mjs check --kit <kit> --repo ~/workspace/makefun/black-friday-deals
MAKEFUN_OUTPUT_DIR=/tmp/t1 node main.ts && MAKEFUN_OUTPUT_DIR=/tmp/t2 node main.ts
sha256sum /tmp/t1/dossier.json /tmp/t2/dossier.json   # 650c2956…bc8, identik
cmp vendor/makefun-frontend.ts <kit>/starter/vendor/makefun-frontend.ts  # identik
node /tmp/tester-playtest.mjs   # 86 kartu; airpods→6; TVs→14; 0 console error; 0 eksternal; 404 favicon
node /tmp/sorttest.mjs          # % off 67/65/64/60/59/58; harga naik; saving turun
python3 -c "from PIL import Image; [print(f, Image.open(f).size) for f in ...]"  # 4-phone.jpg (780,1688)
curl -sS https://make.fun/heartbeat.md | head -5   # version 1.5.309
```
