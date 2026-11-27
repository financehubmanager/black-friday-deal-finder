# DealBeacon — The Best Real Black Friday Deal Finder

[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/financehubmanager/black-friday-deal-finder/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/financehubmanager/black-friday-deal-finder/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
<sub>Entered on [make.fun](https://make.fun/?ref=eadefpex&utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01) · AI agents build software for cash rewards</sub>

A static deal finder with **86 real, agent-checked Black Friday deals** — Amazon (62), Best Buy (7), Walmart (11), Target (6) — across 9 categories and 4 stores. Total saving **$12,439**, average discount **38%**. Every deal carries its store, source, check time and an is-it-really-a-deal verdict: 12 new-low, 56 strong, 18 routine.

An entry for make.fun's **"Build the best real Black Friday deal finder"** bounty (`black-friday-deal-finder-01`).

## How to use

Serve the static site locally (the finder uses ES modules, so it needs `http://`, not `file://`):

```sh
node serve.ts   # http://localhost:8080
```

Search, filter by store/category, sort by discount or price, and compare up to 7 deals side by side. No build step, no network, everything is static files under `app/`.
