# ERROR_LOG.md — Error Resolution Log

Zero tolerance for silent failures, suppressed warnings, or vague debugging. Every error, build failure, linting issue, or runtime panic is logged here with forensic precision.

---

## Error ID: ERR-000 | 2026-09-08 10:30
- **Component:** Repository / VCS
- **Severity:** Low
- **Error Message / Stack Trace:**
  ```
  $ git remote -v
  fatal: not a git repository (or any of the parent directories): .git
  ```
- **Root Cause Analysis:** The local checkout of `jkeylight/BAKERY-FILMS-` was copied without its `.git` metadata. No remote is configured, so commits/pushes are impossible until `git init` + remote setup.
- **Resolution / Workaround:** None applied yet — pending user decision on connecting to GitHub. File contents verified identical to upstream via GitHub API listing.
- **Prevention:** Log this state in `PROJECT_UPDATES.md` so no future session assumes VCS connectivity.

---

## Error ID: ERR-001 | 2026-09-08 10:42
- **Component:** Media / Hero video (index.html scene 03)
- **Severity:** High
- **Error Message / Stack Trace:**
  ```
  $ stat -c '%s bytes  %n' "media/My Movie 1.mp4"
  133 bytes  media/My Movie 1.mp4
  $ head -c 133 "media/My Movie 1.mp4"
  This is a placeholder. Replace this file with your actual video file. (66 chars)
  ```
- **Root Cause Analysis:** `media/My Movie 1.mp4` is a 133-byte placeholder stub, not a video. The production hero video instead streams from a remote Wix CDN URL (`https://video.wixstatic.com/video/c02525_4449c9b7fea441f38875ed1e2b6db755/720p/mp4/file.mp4`, index.html:44). Scene 03 is entirely dependent on a third-party CDN that the studio does not control.
- **Resolution / Workaround:** ✅ PARTIALLY RESOLVED 2026-09-08 ~13:20. User directive: hero video now sources the real local `assets/My Movie 1.mp4` (63,689,496 bytes, verified on disk) — the Wix CDN stream was removed from index.html (ERR-005 impact reduced). The 133-byte `media/My Movie 1.mp4` stub is now ORPHANED (no page references it) but still exists on disk; deletion is destructive and awaits user confirmation. NOTE: `assets/PHOTOGRAPHER/` contains 20 real image files (~7MB total) that ARE referenced by `photographer.html` — this tree is NOT placeholder junk, contrary to initial suspicion; only the mp4 is a stub.
- **Prevention:** Add a build/audit check that fails when referenced media files are below a minimum size threshold (e.g., < 10KB for video).

---

## Error ID: ERR-002 | 2026-09-08 10:42
- **Component:** Frontend / Home page (index.html)
- **Severity:** Medium
- **Error Message / Stack Trace:**
  ```html
  <!-- index.html:83 -->
  <a class="cta">ENTER <span>↗</span></a>
  ```
- **Root Cause Analysis:** Six of seven `.cta` elements on the home slider have no `href` — they are non-navigable anchors. Only scene 07 (`START A COMMISSION`) links to `contact-10x.html`. Scenes 01–06 CTAs ("ENTER", "VIEW STORY", "WATCH", "DISCOVER") are dead UI.
- **Resolution / Workaround:** Not yet resolved. Requires product decision: link each scene to its relevant inner page (`work.html`, `directors.html`, `photographer.html?photographer=norman-james`, etc.) or remove the CTAs.
- **Prevention:** Audit interactive elements for navigability; add a link-integrity test that flags `<a>` without `href`.

---


## Error ID: ERR-003 | 2026-09-08 10:42
- **Component:** Frontend / Archive & debris files
- **Severity:** Low
- **Error Message / Stack Trace:**
  ```
  $ grep -rn 'work (1).html' --include='*.html' .
  (0 matches)
  $ grep -rn '"page.html"' --include='*.html' . 
  (0 matches)
  ```
- **Root Cause Analysis:** `work (1).html` (a near-duplicate of `work.html` branded "N/J" instead of "Bakery Films") and `page.html` (branded "N/J") are unreferenced by any page. They are orphaned iterations from earlier design passes, not part of the production navigation graph.
- **Resolution / Workaround:** Not yet resolved. Safe to delete or move to an `archive/` folder; requires user confirmation before destructive action.
- **Prevention:** Periodic unreferenced-file audit; remove dead iterations from the shipped tree.

---

## Error ID: ERR-004 | 2026-09-08 10:42
- **Component:** Build Pipeline / VCS
- **Severity:** High
- **Error Message / Stack Trace:**
  ```
  $ ls .git
  ls: cannot access '.git': No such file or directory
  $ ls package.json
  ls: cannot access 'package.json': No such file or directory
  ```
- **Root Cause Analysis:** No `.git` folder, no `package.json`, no `node_modules`, no test runner, no build system. The project is unversioned and untestable by automated means. `rollback.sh` / `rollback.bat` reference `git for-each-ref` and `git reset --hard` — these scripts will fail immediately in the current state.
- **Resolution / Workaround:** ✅ RESOLVED 2026-09-08 13:06. `git init -b main` + remote `origin → https://github.com/jkeylight/BAKERY-FILMS-.git`; initial commit `32523a2` (64 files, working tree CLEAN). Test harness also bootstrapped (see ERR-007 / seed suite). No push performed — not requested.
- **Prevention:** This report itself. Any future session must verify VCS and test infrastructure before claiming reproducibility.

---

## Error ID: ERR-005 | 2026-09-08 10:42
- **Component:** Frontend / Asset pipeline
- **Severity:** Medium
- **Error Message / Critical Output:**
  ```
  index.html:43   <video ... poster="assets/Capture.JPG">
  index.html:44   <source src="https://video.wixstatic.com/video/c02525_.../720p/mp4/file.mp4">
  ```
- **Root Cause Analysis:** Critical media is sourced from `video.wixstatic.com` and `static.wixstatic.com` (all director film thumbnails and Mukul/Kunal/Rudra photographer portfolio images). These are hotlinked from a Wix-hosted origin outside the project's control. If the Wix site is deleted, migrated, or rate-limits, the site degrades silently.
- **Resolution / Workaround:** Not yet resolved. Requires migrating assets to first-party hosting and updating references.
- **Prevention:** Asset-hosting audit as part of any release checklist; no third-party CDN dependency for critical media.

---

## Error ID: ERR-007 | 2026-09-08 10:58
- **Component:** Build Pipeline / Test harness (newly bootstrapped)
- **Severity:** Medium
- **Error Message / Stack Trace:**
  ```
  $ npm test   # "test": "node --test tests/"
  Error: Cannot find module 'C:\Users\norma\OneDrive\Desktop\BAKERY-FILMS--main\tests'
      code: 'MODULE_NOT_FOUND'
  ✖ tests (156.345ms)
  ```
- **Root Cause Analysis:** On Node v24.14.1 / Windows, `node --test tests/` (directory argument, with or without trailing slash) is resolved as a CommonJS module entry point instead of being scanned as a test directory. A harness invocation bug, not a site defect — caught by the harness's own first run.
- **Resolution / Workaround:** `package.json` test script changed to `node --test "tests/*.test.mjs"` (quoted glob expanded to explicit file args). Verified fix: `npm test` now executes the suite and reports structured results (2 pass / 3 fail — the designed RED phase).
- **Prevention:** All future runner invocations use explicit file globs; every harness change is re-verified through the canonical `npm test` path, never ad-hoc node calls.

---

## Error ID: ERR-006 | 2026-09-08 10:42 — ✅ RESOLVED 2026-09-08 13:04
> **Forensic note:** this entry's original header was destroyed in a prior editing accident (body fused into ERR-007's Prevention line with a stray `| 2026-09-08 10:42` fragment). Header restored 2026-09-08 13:04 during the resolution cycle; content below is the original entry, updated with the resolution.
- **Automated Detection:** Was caught by `tests/seed-checks.test.mjs` seed-5 (RED phase) — now GREEN.
- **Component:** Frontend / Accessibility
- **Severity:** Medium
- **Error Message / Critical Output:**
  ```html
  <img src="assets/Priyanka 1 copy.avif" alt="">
  ```
- **Root Cause Analysis:** All 7 `<img>` elements in `index.html` (including the two inside the scene-04 split frame) use empty `alt=""` attributes. These are content images, not decorative; screen readers announce nothing. `photographer.html` correctly populates `alt` attributes. **SCOPE CORRECTION (2026-09-08, harness session):** the initial claim that about.html's three founder portraits also lacked alt text was WRONG — they carry alt text ("Kirk Dias", "DJ", "Sunil Bhatadye"), verified via grep inventory and by the seed-5 failure output listing exactly 7 index.html images.
- **Resolution / Workaround:** ✅ RESOLVED 2026-09-08 13:04 (TDD cycle: RED → GREEN, see TTD_LOG.md). Attribute-only fix, design lock respected (no structural/visual change). Meaningful alt text applied to all 7 `index.html` images, each derived strictly from that scene's own on-page editorial context (eyebrow / headline / side-note) — no invented visual descriptions, no person identity asserted where upstream evidence conflicts (e.g. `Priyanka 1 copy.avif` is labelled "Kirk Dias" in about.html, so scene-01's alt describes the framing instead):
  - scene 01: `alt="Fashion portrait — The Icon"`
  - scene 02: `alt="Editorial fashion photograph — New Form, the FW/26 silhouette"`
  - scene 04 (split, left): `alt="The Dynasty diptych, left panel"`
  - scene 04 (split, right): `alt="The Dynasty diptych, right panel"`
  - scene 05: `alt="Golden-hour portrait — The Glow"`
  - scene 06: `alt="Portrait — The King, the player"`
  - scene 07: `alt="Closing portrait — Not a Dream"`
  **about.html required zero edits** — its three founder portraits already carried alt text ("Kirk Dias", "DJ", "Sunil Bhatadye"); it was not touched.
  **Post-fix verification:** `npm test` → seed-5 ✔; suite now 3 PASS / 2 FAIL (seed-3, seed-4 remain RED pending user decisions).
- **Prevention:** seed-5 is now a permanent regression gate — any future page or image added without meaningful alt text fails `npm test` immediately. axe-core a11y audit remains a candidate for deeper coverage once the harness grows.

---