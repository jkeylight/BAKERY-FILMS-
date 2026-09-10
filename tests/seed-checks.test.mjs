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

// --- Seed Check 8 ------------------------------------------------------------
// Latest page: no video src may appear in both the `entries` list and the
// `featured` list (duplicate videos on the same page).
test('seed-8: latest.html entries and featured share no video src', () => {
  const html = read('latest.html');
  const grab = (name) => {
    const m = new RegExp(`const ${name}=\\[([\\s\\S]*?)\\];`).exec(html);
    assert.ok(m, `const ${name}=[...] block must exist in latest.html`);
    return [...m[1].matchAll(/src:"([^"]+)"/g)].map((x) => x[1]);
  };
  const entrySrcs = grab('entries');
  const featuredSrcs = grab('featured');
  assert.ok(entrySrcs.length >= 1, 'entries must define at least one src');
  assert.ok(featuredSrcs.length >= 1, 'featured must define at least one src');
  const dupes = featuredSrcs.filter((s) => entrySrcs.includes(s));
  assert.deepEqual(dupes, [], `videos duplicated across entries + featured:\n${dupes.join('\n')}`);
});

// --- Seed Check 7 ------------------------------------------------------------
// Homepage slider: 10 scenes (0..9) with 2 local video slides (scene-2 +
// scene-8, TEST-SLIDE mp4s). Supersedes the 2026-09-08 7-scene spec, which
// predates the ten-slide expansion (698561f). script.js drives videos
// generically (videoScenes Set) — no hard-coded scenes[N] indices.
test('seed-7: 10-scene slider, local video slides at scene-2 + scene-8', () => {
  const html = read('index.html');
  const js = read('script.js');

  // 1. Exactly 10 scenes, classes exactly 0..9.
  // NOTE: scene-0 carries an extra "active" class, so the digit is matched
  // anywhere inside the class attribute, not just before the closing quote.
  const sceneTags = [...html.matchAll(/<div class="scene[^"]*\bscene-(\d+)[^"]*"/g)].map((m) => Number(m[1]));
  assert.equal(sceneTags.length, 10, `expected 10 scenes, found ${sceneTags.length}`);
  assert.deepEqual([...sceneTags].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'scene classes must be exactly 0..9');

  // 2. Scenes 2 and 8 carry the hero videos; no other scene does.
  const blocks = [...html.matchAll(/<div class="scene[^"]*\bscene-(\d+)[^"]*">([\s\S]*?)(?=<div class="scene|<div class="ui-bottom)/g)];
  assert.equal(blocks.length, 10, `expected 10 scene blocks, found ${blocks.length}`);
  const videoScenes = blocks.filter((m) => /class="hero-video"/.test(m[2])).map((m) => Number(m[1]));
  assert.deepEqual(videoScenes, [2, 8], `video scenes must be [2, 8], found [${videoScenes}]`);

  // 3. Local video sources, posters preserved, no Wix CDN in index.html.
  assert.match(html, /<source src="assets\/TEST-SLIDE\/SLIDE-3\.mp4" type="video\/mp4">/, 'scene-2 source must be assets/TEST-SLIDE/SLIDE-3.mp4');
  assert.match(html, /<source src="assets\/TEST-SLIDE\/SLIDE-9\.mp4" type="video\/mp4">/, 'scene-8 source must be assets/TEST-SLIDE/SLIDE-9.mp4');
  assert.match(html, /poster="assets\/TEST-SLIDE\/ASH-4\.jpg"/, 'scene-2 poster must remain assets/TEST-SLIDE/ASH-4.jpg');
  assert.match(html, /poster="assets\/TEST-SLIDE\/virat-6\.jpg"/, 'scene-8 poster must remain assets/TEST-SLIDE/virat-6.jpg');
  assert.ok(!/wixstatic/.test(html), 'index.html must not reference wixstatic');

  // 4. script.js handles video scenes generically (no hard-coded video indices).
  // NOTE: scenes[0] in the intro timeline is the generic first-scene init,
  // not a video index — only video-scene indices are banned.
  assert.ok(!/scenes\[[2-9]\]/.test(js), 'script.js must not hard-code video scenes[N] indices');
  assert.match(js, /videoScenes/, 'script.js must drive videos via the videoScenes set');

  // 5. Counter + timeline match the 10-slide count.
  assert.match(html, /<span>10<\/span>/, 'slide counter total must be 10');
});
