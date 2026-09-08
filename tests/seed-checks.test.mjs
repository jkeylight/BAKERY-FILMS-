// Seed Check Suite v1 — automated version of the five manual forensic checks
// logged in docs/TTD_LOG.md (2026-09-08 audit cycle).
//
// TTD status: seed-1/2/5 GREEN (ERR-006 resolved); seed-3/4 RED pending user
// decisions (ERR-001, ERR-002). seed-6 locks in the user-directed noir
// reversal (2026-09-08): images load in full color; grayscale(1) is only
// allowed inside :hover rules.
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

// --- Seed Check 6 ------------------------------------------------------------
// Noir treatment REVERSED (user directive, 2026-09-08): portraits load in full
// color; the grayscale grade may appear ONLY inside :hover rules (the noir
// moment on hover, slow zoom preserved).
test('seed-6: grayscale(1) appears only inside :hover rules (noir reversed)', () => {
  const offenders = [];
  let hoverRules = 0;
  const ruleRe = /([^{}]+)\{([^{}]*filter:grayscale\(1\)[^{}]*)\}/g;
  for (const file of ['style.css', 'contact.css', 'about.html']) {
    for (const m of read(file).matchAll(ruleRe)) {
      const selector = m[1].trim();
      if (/:hover/.test(selector)) hoverRules++;
      else offenders.push(`${file}: ${selector}{...filter:grayscale(1)...}`);
    }
  }
  assert.deepEqual(offenders, [], `grayscale(1) outside :hover rules:\n${offenders.join('\n')}`);
  assert.ok(hoverRules >= 3, `expected grayscale(1) in >=3 :hover rules (slider, photographers grid, founders), found ${hoverRules}`);
});

// --- Seed Check 7 ------------------------------------------------------------
// User directive (2026-09-08): the IN MOTION video slide moves to position 6
// (index 5 of 7), and its source becomes the local assets/My Movie 1.mp4
// (real 63.7MB video) instead of the Wix CDN stream. script.js must track the
// video scene at index 5 (scenes[5] ×4, index===5 pause guard), never [2].
test('seed-7: video slide is #6 of 7, sourced locally (assets/My Movie 1.mp4), script.js at index 5', () => {
  const html = read('index.html');
  const js = read('script.js');

  // 1. Exactly one video-wrap scene, and it is the 6th .scene (index 5 of 7).
  // NOTE: scene-0 carries an extra "active" class, so the digit is matched
  // anywhere inside the class attribute, not just before the closing quote.
  const sceneTags = [...html.matchAll(/<div class="scene[^"]*\bscene-(\d)[^"]*"/g)].map((m) => Number(m[1]));
  assert.equal(sceneTags.length, 7, `expected 7 scenes, found ${sceneTags.length}`);
  assert.deepEqual([...sceneTags].sort(), [0, 1, 2, 3, 4, 5, 6], 'scene classes must be exactly 0..6');
  const videoScene = [...html.matchAll(/<div class="scene[^"]*\bscene-(\d)[^"]*">([\s\S]*?)<\/div>\s*(?=<div class="scene)/g)].map((m) => ({ n: Number(m[1]), hasVideo: /class="hero-video"/.test(m[2]) }));
  const idx = videoScene.find((s) => s.hasVideo)?.n;
  assert.equal(idx, 5, `video must be scene index 5 (slide 6 of 7), found ${idx}`);

  // 2. Local source, no Wix CDN in index.html.
  assert.match(html, /<source src="assets\/My Movie 1\.mp4" type="video\/mp4">/, 'hero <source> must point at assets/My Movie 1.mp4');
  assert.ok(!/wixstatic/.test(html), 'index.html must not reference wixstatic');

  // 3. Poster preserved.
  assert.match(html, /poster="assets\/Capture\.JPG"/, 'hero poster must remain assets/Capture.JPG');

  // 4. script.js hard-coded indices retargeted 2 → 5.
  assert.ok(!/scenes\[2\]/.test(js), 'script.js must not reference scenes[2]');
  assert.equal(js.match(/scenes\[5\]/g)?.length ?? 0, 3, 'script.js must reference scenes[5] exactly 3 times (enter, exit, entrance-skip)');
  assert.match(js, /index===5/, 'script.js pause guard must be index===5');
});
