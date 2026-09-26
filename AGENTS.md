# AGENTS.md

## What this is

A single-page static site for the SSSIHL Brindavan Campus sports meet ("Brindavan Sports
Corner"): fixtures, live scores, athlete results, schedules, squads and photo galleries for
the House championship (Bharatha vs Arjuna) and individual athletics/racket events, each
scoped to a UG (undergraduate) or PG (postgraduate) division.

## Architecture

Everything ships as static files — no build step, no framework, no bundler:

- `index.html` — the entire application: all CSS in one `<style>` block, all routing/rendering
  logic in one `<script>` block at the end of the file. It's a hash-based single-page router
  (`#/`, `#/house`, `#/house/:id`, `#/individual`, `#/individual/:id`, `#/schedule`, `#/admin`).
  Every page is a template-string function (e.g. `home()`, `sportPage()`, `eventPage()`) that
  gets re-rendered into `#app` on each `hashchange`.
- `data.js` — sets `window.SITE`, the canonical content: house sports (fixtures, squads),
  individual events (schedule, results), house colors, meet metadata. This is the file an
  admin edits/replaces to publish new content for everyone.
- `assets/` — `posters/<id>.jpg`, `players/<event-id>/<name-slug>.jpg` (with a shared
  `players/all/` fallback), `gallery/<id>/1.jpg, 2.jpg, ...` (numbered, probed at runtime).
  Anything missing renders a placeholder automatically — never treat a missing image as a bug.
- `netlify.toml` — `publish = "."`, security headers, `no-cache` on `data.js` so edits show up
  immediately after redeploy.

## Data flow (important, non-obvious)

`D` (the live in-memory data used by every page) starts as a deep clone of `window.SITE`
(`BASE`), then has any `localStorage["sssihl-sports-data"]` override merged in for
`houseSports`/`individualEvents`. This means:

- Admin edits (via the forms, or via CSV/Excel/JSON bulk import — see below) only ever touch
  `localStorage` in the browser that made them. They do **not** touch the server.
- To publish for everyone, the admin uses **Export data.js** on the Add results page, which
  serializes `D` back into a `window.SITE = {...}` file, and that file replaces `data.js` in
  the repo before redeploying.
- This is a deliberate choice, not a missing feature: this site is maintained by meet
  volunteers who are not developers, and "edit in the browser, export, redeploy" is a
  workflow they can run without any backend, database, or auth server. Don't "fix" this by
  wiring up a live database unless that's explicitly what's being asked for.

## Bulk import

The Add results → **Bulk import results** panel accepts `.csv`, `.xlsx`/`.xls`, or `.json`:

- CSV/Excel rows are row-by-row added/updated via `importRows()` → `importIndividualRow()` /
  `importHouseRow()` / `importPlayerRow()`, keyed on a `type` column (inferred from the
  columns present if omitted). `parseCSV()` is a small hand-rolled parser (no dependency).
  Excel parsing lazy-loads SheetJS from a CDN (`loadXLSX()`) only when an Excel file is
  actually chosen, so the public pages never load it.
- A `.json` file containing `{houseSports, individualEvents}` is treated as a full backup and
  replaces all results (`importJsonSmart()`); a `.json` array of row objects is treated the
  same as a CSV/Excel import.
- Templates for each row type are downloadable from the same panel
  (`downloadCsvTemplate()`).

## Conventions

- Always escape user/content strings interpolated into HTML with `esc()` — nothing here is
  templated safely by default.
- Category colors (Track/Jumps/Throws/Racket & Table/Other/House) are centralized in the
  `CAT_COLORS` map and `catColor()` — reuse it for anything new that displays an event
  category, rather than hardcoding a color.
- House colors come from `D.houses[].color` (set as CSS custom properties `--h1`/`--h2` and
  per-element `--c`), not hardcoded reds/blues.
- The admin gate (`ADMIN_USER`/`ADMIN_PASSWORD` in `index.html`, session flag in
  `sessionStorage`) is intentionally simple client-side gating for a static build, documented
  as such in the login screen. Treat it as access control against casual editing, not a
  security boundary — don't present it as more secure than it is.

## No PLAN.md

This is a complete, single-purpose site (not a multi-milestone product), so there's no
`PLAN.md` — the feature set above is the whole of it.
