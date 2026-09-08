// Seed Check Suite v1 — automated version of the five manual forensic checks
// logged in docs/TTD_LOG.md (2026-09-08 audit cycle).
//
// TTD status: RED. These tests assert the DESIRED behavior of the site.
// Known defects (ERR-001, ERR-002, ERR-006 in docs/ERROR_LOG.md) intentionally
// fail until the user approves fixes under the DESIGN LOCK.
//
// Infrastructure only — this file reads site files; it never modifies them.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Shipped pages only. `work (1).html` and `page.html` are orphaned debris
// (ERR-003) and are deliberately excluded from the production set.
const PAGES = [
  'index.html',
  'work.html',
  'latest.html',
  'about.html',
  'team.html',
  'services.html',
  'directors.html',
  'photographers.html',
  'photographer.html',
  'director.html',
  'contact-10x.html',
];

const read = (page) => readFileSync(join(ROOT, page), 'utf8');

// --- Seed Check 1 -----------------------------------------------------------
// Every local asset reference (src/poster/href pointing into assets/ or media/)
// must resolve to a real file on disk.
test('seed-1: every local asset reference resolves to an existing file', () => {
  const missing = [];
  const refRe = /(?:src|poster|href)="((?:assets|media)\/[^"]+)"/g;
  for (const page of PAGES) {
    for (const m of read(page).matchAll(refRe)) {
      if (!existsSync(join(ROOT, m[1]))) missing.push(`${page} -> ${m[1]}`);
    }
  }
  assert.deepEqual(missing, [], `dangling local asset references:\n${missing.join('\n')}`);
});

// --- Seed Check 2 -----------------------------------------------------------
// Every static internal .html link must point at a page that exists.
test('seed-2: all internal .html links resolve to existing pages', () => {
  const missing = [];
  const linkRe = /href="([a-z0-9 ()\-]+\.html)"/g;
  for (const page of PAGES) {
    for (const m of read(page).matchAll(linkRe)) {
      if (!existsSync(join(ROOT, m[1]))) missing.push(`${page} -> ${m[1]}`);
    }
  }
  assert.deepEqual(missing, [], `broken internal links:\n${missing.join('\n')}`);
});

// --- Seed Check 3 -----------------------------------------------------------
// No media/image file in the shipped tree may be a placeholder stub (< 10KB).
// RED by design: media/My Movie 1.mp4 is a 133-byte text stub (ERR-001).
test('seed-3: no placeholder-stub media files (< 10KB) in assets/ or media/', () => {
  const tooSmall = [];
  const walk = (dir) => {
    for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
      const rel = join(dir, entry.name);
      if (entry.isDirectory()) walk(rel);
      else {
        const size = statSync(join(ROOT, rel)).size;
        if (size < 10 * 1024) tooSmall.push(`${rel} (${size} bytes)`);
      }
    }
  };
  walk('assets');
  walk('media');
  assert.deepEqual(tooSmall, [], `placeholder-size media files:\n${tooSmall.join('\n')}`);
});

// --- Seed Check 4 ------------------------------------------------------------
// Every <a class="cta"> must be navigable (carry an href).
// RED by design: 6 of 7 home-slider CTAs have no href (ERR-002).
test('seed-4: every <a class="cta"> has an href (navigable CTA)', () => {
  const dead = [];
  for (const page of PAGES) {
    for (const m of read(page).matchAll(/<a class="cta"([^>]*)>/g)) {
      if (!/\shref="/.test(m[1])) dead.push(`${page}: <a class="cta"${m[1]}>`);
    }
  }
  assert.deepEqual(dead, [], `CTA anchors without href:\n${dead.join('\n')}`);
});

// --- Seed Check 5 ------------------------------------------------------------
// Every content <img> (non-empty src) must carry meaningful alt text.
// Images with empty src are JS-populated placeholders (e.g. the lightbox
// element in photographer.html) and are exempt.
// RED by design: the 7 hero images in index.html use alt="" (ERR-006,
// scope corrected: about.html founder portraits DO have alt text).
test('seed-5: every content <img> carries meaningful alt text', () => {
  const unlabelled = [];
  for (const page of PAGES) {
    for (const m of read(page).matchAll(/<img\b([^>]*)>/g)) {
      const attrs = m[1];
      const src = /src="([^"]*)"/.exec(attrs)?.[1] ?? '';
      const alt = /\balt="([^"]*)"/.exec(attrs)?.[1];
      if (alt === undefined || (alt.trim() === '' && src.trim() !== '')) {
        unlabelled.push(`${page}: <img${attrs}>`);
      }
    }
  }
  assert.deepEqual(unlabelled, [], `content images without alt text:\n${unlabelled.join('\n')}`);
});
