# TTD_LOG.md — Test-Driven Development Log

Strict Red → Green → Refactor methodology. Tests are defined **before** implementation code, and outcomes are logged here for accountability. No claimed pass without verified CLI output.

---

## Test Cycle: Project Initialization | 2026-09-08
- **Test File:** `N/A` (no test harness exists in this project yet)
- **Objective:** Establish the documentation discipline baseline; verify no existing test infrastructure to inherit.
- **Test Cases Defined:**
  1. Baseline inventory: confirm project has zero test files and no package manifest (verified via `ls` / repo scan — 0 detected test files, no `package.json`).
- **Execution Result:** ✅ PASS (baseline confirmed; no harness to migrate)
- **Coverage Impact:** N/A — static site, no automated coverage tooling yet.
- **Refactor Notes:** Before any future TTD cycle on this codebase, a minimal test runner must be bootstrapped (e.g., Node built-in `node:test` or a lightweight harness) — logged as a prerequisite, not an assumption.

---

## Test Cycle: Forensic Asset & Link Integrity Audit | 2026-09-08
- **Test File:** `N/A` — **executed as manual CLI verification because no automated harness exists (ERR-004). This is explicitly NOT a substitute for automated tests.**
- **Objective:** Verify that every local asset referenced by shipped pages exists on disk, that all internal navigation links resolve, and that no media file is a silent placeholder.
- **Test Cases Defined (manual, via rg + ls + stat):**
  1. Every `src`/`poster`/`href` referencing `assets/` or `media/` resolves to an existing file → ✅ PASS (10/10 local refs verified: 9 in index.html, 3 in about.html, 14 in photographer.html; zero dangling paths)
  2. All 8 internal nav links in index.html menu resolve to existing pages → ✅ PASS (0 broken links)
  3. No referenced media file is under 10KB (placeholder detection) → ❌ **FAIL — `media/My Movie 1.mp4` is 133 bytes, a text stub** → logged as ERR-001
  4. Interactive `<a class="cta">` elements are navigable → ❌ **FAIL — 6 of 7 have no `href`** → logged as ERR-002
  5. Content images carry meaningful `alt` text → ❌ **FAIL — 9 content images use `alt=""`** → logged as ERR-006
- **Execution Result:** ❌ **2 PASS / 3 FAIL** — reported honestly; the 3 failures are real defects in the shipped site, now tracked in ERROR_LOG.md.
- **Coverage Impact:** 0% automated coverage. These five checks are now the **seed test suite** for the harness bootstrap — they become automated regression tests the moment a runner exists.
- **Refactor Notes:** No code refactored — audit-only cycle. Next cycle must bootstrap the harness and re-run these five checks as code, converting this manual audit into a permanent, repeatable gate. *POST-CYCLE CORRECTION (2026-09-08, later session): case 5's scope was overstated — about.html founder portraits DO carry alt text; only index.html's 7 hero images are empty. See Seed Check Suite v1 cycle and the ERR-006 correction in ERROR_LOG.md.*

---

## Test Cycle: Seed Check Suite v1 (Harness Bootstrap) | 2026-09-08
- **Test File:** `tests/seed-checks.test.mjs`
- **Objective:** Convert the five manual forensic checks into automated regression gates using Node's built-in `node:test` runner (zero dependencies, per design lock — no site files touched). RED phase: tests assert *desired* behavior, so the three known defects intentionally fail until the user approves fixes.
- **Test Cases Defined:**
  1. seed-1: every local asset reference (`src`/`poster`/`href` into `assets/`|`media/`) resolves to an existing file
  2. seed-2: every internal `.html` link resolves to an existing page
  3. seed-3: no placeholder-stub media (< 10KB) anywhere in `assets/` or `media/`
  4. seed-4: every `<a class="cta">` carries an `href` (navigable CTA)
  5. seed-5: every content `<img>` (non-empty `src`) carries meaningful `alt` text (empty-`src` JS placeholders exempt)
- **Pre-Run Predictions (recorded before execution, from raw grep):** seed-1 ✅, seed-2 ✅, seed-3 ❌ (mp4 stub only), seed-4 ❌ (6 of 7 CTAs href-less), seed-5 ❌ (7 index.html images, about.html correctly excluded — scope correction for ERR-006 discovered here)
- **Execution Result (verified CLI output, `npm test`):**
  ```
  ✔ seed-1: every local asset reference resolves to an existing file (4.7617ms)
  ✔ seed-2: all internal .html links resolve to existing pages (5.0012ms)
  ✖ seed-3: no placeholder-stub media files (< 10KB) in assets/ or media/ (3.3106ms)
  ✖ seed-4: every <a class="cta"> has an href (navigable CTA) (1.8115ms)
  ✖ seed-5: every content <img> carries meaningful alt text (1.9297ms)
  ℹ tests 5 | pass 2 | fail 3      EXIT_CODE=1
  ```
  **❌ 2 PASS / 3 FAIL — matches predictions exactly.** This is the RED phase working as intended: the suite truthfully detects ERR-001, ERR-002, ERR-006. seed-3's failure output lists exactly one file (`media\My Movie 1.mp4 (133 bytes)`) — no other small files exist in the tree.
- **Coverage Impact:** First automated coverage in project history: 5 regression gates over 11 shipped pages. Still 0% JS unit coverage (script.js/transitions.js/contact.js remain untested logic).
- **Refactor Notes:** Harness invocation defect found and fixed during this cycle (ERR-007: `node --test tests/` fails on Node v24/Windows; resolved via quoted glob in `package.json`). Suite remains RED by design — turning seed-3/4/5 green requires user-approved fixes under the DESIGN LOCK. seed-1/2 are now permanent gates: any future change that breaks asset or link integrity fails CI immediately.

---

## Test Cycle: ERR-006 Resolution — Alt Text on index.html | 2026-09-08 13:02–13:04 IST
- **Test File:** `tests/seed-checks.test.mjs` (seed-5, existing gate — no new test needed; the RED gate already encoded the desired behavior)
- **Objective:** Turn seed-5 GREEN by giving every content `<img>` meaningful alt text, fixing ERR-006 under the design lock (attribute-only, invisible change).
- **Test Cases Defined (seed-5, already automated):**
  1. Every content `<img>` (non-empty `src`) across the 11 shipped pages carries non-empty alt text
  2. Empty-`src` JS placeholders (photographer.html lightbox) remain exempt
- **RED phase (verified CLI output before any edit, 13:02):**
  ```
  ✖ seed-5: every content <img> carries meaningful alt text (7.2356ms)
    AssertionError [ERR_ASSERTION]: content images without alt text:
    index.html: <img src="assets/Priyanka 1 copy.avif" alt="">
    index.html: <img src="assets/Image 12 copy with grain.avif" alt="">
    index.html: <img src="assets/c02525_23be238fec574d9597a2514795330bb1~mv2.avif" alt="">
    index.html: <img src="assets/c02525_41b1b218814b4c648131f30cd5fe3a53~mv2.avif" alt="">
    index.html: <img src="assets/slide5-new.jpg" alt="">
    index.html: <img src="assets/virat 2.jpg" alt="">
    index.html: <img src="assets/srk.jpg" alt="">
  ℹ tests 5 | pass 2 | fail 3      EXIT_CODE=1
  ```
  Failure output names exactly 7 images, all in index.html — **about.html is correctly absent** (its portraits already carry alt text; scope correction from the previous cycle re-confirmed).
- **Implementation (after RED, before GREEN):** 7 attribute-only edits in `index.html` (lines 26–80). Alt text derived strictly from each scene's own editorial context (eyebrow/headline/side-note) — no invented descriptions; scene-01 deliberately describes framing ("The Icon") rather than a person, because upstream evidence conflicts on the subject (`Priyanka 1 copy.avif` vs about.html's `alt="Kirk Dias"`). The diptych pair is labelled left/right panel.
- **Execution Result (verified CLI output, `npm test`, 13:04):**
  ```
  ✔ seed-1: every local asset reference resolves to an existing file (9.7653ms)
  ✔ seed-2: all internal .html links resolve to existing pages (10.3016ms)
  ✖ seed-3: no placeholder-stub media files (< 10KB) in assets/ or media/ (3.3899ms)
  ✖ seed-4: every <a class="cta"> has an href (navigable CTA) (7.3557ms)
  ✔ seed-5: every content <img> carries meaningful alt text (5.6899ms)
  ℹ tests 5 | pass 3 | fail 2      EXIT_CODE=1
  ```
  **✅ GREEN for seed-5** — 3 PASS / 2 FAIL. Remaining failures are seed-3 (ERR-001) and seed-4 (ERR-002), both awaiting user decisions; untouched by this cycle.

---

## Test Cycle: Noir Reversal — seed-6 gate | 2026-09-08 13:10–13:12 IST
- **Test File:** `tests/seed-checks.test.mjs` (new seed-6)
- **Objective:** Lock in the user-directed reversal of the noir image treatment: portraits load in FULL COLOR at rest; `grayscale(1)` is permitted ONLY inside `:hover` rules (noir moment + slow zoom on hover, as before).
- **Design-Lock Note:** The user explicitly ordered this visual change ("REVERSE IT FROM GRAYSCALE TO COLOR") — approved by directive; logged as the lock's exception trail.
- **Test Cases Defined (seed-6):**
  1. In `style.css`, `contact.css`, `about.html`: any rule containing `filter:grayscale(1)` MUST have `:hover` in its selector
  2. At least 3 `:hover` rules must carry `grayscale(1)` (slider, photographers grid, founders)
- **RED phase (verified CLI output before any CSS edit):**
  ```
  ✖ seed-6: grayscale(1) appears only inside :hover rules (noir reversed) (41.8508ms)
    AssertionError: grayscale(1) outside :hover rules:
    style.css: .image-frame img,.split img{...}
    contact.css: .px-banner img{...}
    contact.css: .ph img{...}
    about.html: .founder-media img{...}
  ```
  Exactly the 4 rest-state rules — prediction matched.
- **Implementation (after RED):** 7 line-level swaps across 3 files:
  - `style.css`: rest rule drops filter; `.image-frame:hover img,.split:hover img` → `grayscale(1) contrast(1.08) brightness(.92)`
  - `contact.css`: `.px-banner img` + `.ph img` rest rules drop filter; `.ph:hover img` → noir grade
  - `about.html`: `.founder-media img` rest drops filter; `.founder:hover .founder-media img` → noir grade
  All transition timings (0.8s/1.2s, 0.6s/1s) and zoom scales (1.05/1.045/1.04) untouched.
- **Execution Result (verified CLI output, `npm test`):**
  ```
  ✔ seed-1 ✔ seed-2 ✖ seed-3 ✖ seed-4 ✔ seed-5 ✔ seed-6
  ℹ tests 6 | pass 4 | fail 2      EXIT=1
  ```
  **✅ GREEN for seed-6** — 4 PASS / 2 FAIL. seed-3/seed-4 remain RED (user decisions pending), untouched.
- **Coverage Impact:** 6 automated gates now cover asset, link, media-stub, CTA, alt-text, and noir-treatment integrity.
- **Refactor Notes:** Verified before implementation that no JS (script.js/transitions.js/contact.js) touches image `filter` — no GSAP/Lenis conflict. The `.split img{filter:saturate(.65)}` duotone base and hero-video grade are intentionally untouched (not part of the portrait noir system).

---

## Test Cycle: Video Slide Reposition + Local Source — seed-7 gate | 2026-09-08 ~13:20 IST
- **Test File:** `tests/seed-checks.test.mjs` (new seed-7)
- **Objective:** Lock in the user directive: the IN MOTION video slide becomes slide 6 of 7 (scene index 5), and its source becomes the local `assets/My Movie 1.mp4` (real 63.7MB video — verified on disk, NOT the 133-byte `media/` stub) instead of the Wix CDN stream. Also locks the required script.js retarget from index 2 → 5.
- **Test Cases Defined (seed-7):**
  1. Exactly 7 scenes, classes exactly 0..6; the scene containing `.hero-video` is index 5
  2. `<source>` = `assets/My Movie 1.mp4`; zero `wixstatic` references in index.html; `poster="assets/Capture.JPG"` preserved
  3. script.js: no `scenes[2]`; `scenes[5]` exactly 3× (enter/exit/entrance-skip); pause guard `index===5`
- **Test-Harness bugs found and fixed during RED (all in the test, NOT the site):** (a) scene-0's `active` class broke the `scene-N` tag regex (digit not followed by quote) — fixed by matching the digit anywhere in the class attr; (b) the block-capture regex consumed the next scene's opening tag, so the last-but-one scene (the video) never matched → `undefined` — fixed with a lookahead boundary; (c) `scenes[2]` count is 3 not 4 (the 4th spot was `index===2`). Each fix re-verified against real CLI output before proceeding.
- **RED phase (verified CLI output before any site edit):** `video must be scene index 5 (slide 6 of 7), found 2` — the true defect state.
- **Execution Result (verified CLI output, `npm test`):**
  ```
  ✔ seed-1 ✔ seed-2 ✖ seed-3 ✖ seed-4 ✔ seed-5 ✔ seed-6 ✔ seed-7
  ℹ tests 7 | pass 5 | fail 2      EXIT=1
  ```
  **✅ GREEN for seed-7** — 5 PASS / 2 FAIL. Remaining RED: seed-3 (ERR-001 `media/` stub — the now-orphaned 133-byte file) and seed-4 (ERR-002 dead CTAs). Both await user decisions.
- **Coverage Impact:** 7 automated gates. seed-7 now guards slider structure (scene count/order), hero video source, and script.js scene-index wiring.
- **Refactor Notes:** Scene classes + eyebrow counters renumbered to match new DOM order (DYNASTY 03, GLOW 04, KING 05, MOVING IMAGE 06, END 07). Headline layout classes (`.h2`/`.h5`/`.h6`) stayed glued to their scenes — positional, not order-dependent. No CSS changes; design lock respected beyond the user-ordered reorder.
- **Coverage Impact:** Suite progression 2→3 passing gates. seed-5 is now a permanent regression gate for all future pages/images.
- **Refactor Notes:** (1) about.html needed zero edits — confirmed by the RED failure output before touching anything. (2) Docs defect found and repaired during this cycle: ERR-006's header in ERROR_LOG.md had been destroyed by a prior editing accident (body fused into ERR-007's Prevention line); header restored and entry marked RESOLVED. (3) Design lock fully respected: no structure, CSS, copy, or behavior changed — only `alt` attribute values.