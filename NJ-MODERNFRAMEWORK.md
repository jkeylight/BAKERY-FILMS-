# 🚀 NJ-MODERNFRAMEWORK.MD — FreeGrid Creative Framework

## AI INSTRUCTIONS: Read this entire document. Understand every section. Then build the framework exactly as specified. No shortcuts. No missing modules. No assumptions.

---

# ⚠️ THE #1 RULE — CREATIVE UNIQUENESS

## NO TWO SITES SHOULD EVER LOOK THE SAME.

Every new creative site built with this framework must have UNIQUE:
- **Color palette** — different colors per project
- **Typography** — different font combinations per project
- **Animation style** — different timing, easing, choreography per project
- **Layout** — different grid, spacing, hierarchy per project
- **Scroll experience** — different reveal types, parallax depths per project
- **Cursor behavior** — different states, shapes per project
- **Page transitions** — different types, durations per project
- **Preloader** — different loading sequences per project
- **WebGL scene** — different 3D effects per project
- **Voice/tone** — different copywriting per project

**The framework provides the ENGINE. The CREATIVE makes it unique.**

---

# HOW TO ACHIEVE CREATIVE UNIQUENESS

## Method 1: Design Token System

Every site defines a unique `tokens.ts` file:

```typescript
// src/tokens.ts — EVERY SITE GETS A DIFFERENT ONE

export const siteTokens = {
  colors: {
    bg: '#0a0a0a',           // Unique per project
    surface: '#141414',
    text: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.7)',
    accent: '#00f0ff',       // Unique accent per project
    accentAlt: '#ff4d4d',    // Optional second accent
  },
  fonts: {
    display: 'Clash Display',  // Unique display font per project
    body: 'Satoshi',           // Unique body font per project
    mono: 'JetBrains Mono',    // Optional mono font
  },
  spacing: {
    sectionGap: '140px',      // Unique spacing per project
    containerMax: '1440px',
    containerPad: '64px',
  },
  animation: {
    revealType: 'fade-up',    // Default reveal type per project
    parallaxDepth: 0.3,       // Default parallax depth
    velocitySkew: 5,          // Max skew degrees
    cursorStyle: 'dot-circle', // Cursor style per project
    transitionType: 'curtain', // Page transition per project
    transitionDuration: 0.6,   // Transition speed
    preloaderType: 'curtain',  // Preloader style
  },
};
```

**Rule: When creating a new site, ALWAYS create a new `tokens.ts` with different values.**

## Method 2: Attribute Override System

The `data-fg-*` attributes override the token defaults per element:

```html
<!-- Token says fade-up, but THIS element uses clip-left -->
<h2 data-fg-reveal="clip-left">Unique reveal</h2>

<!-- Token says 0.3 parallax, but THIS element uses 0.8 -->
<img data-fg-parallax="0.8" src="..." />

<!-- Token says curtain transition, but THIS link uses scale -->
<a href="/work" data-fg-transition="scale">View Project</a>
```

## Method 3: CSS Custom Properties Override

Every token maps to a CSS custom property that can be overridden per section:

```css
:root {
  --fg-bg: #0a0a0a;
  --fg-text: #ffffff;
  --fg-accent: #00f0ff;
  /* ... all tokens as CSS vars ... */
}

/* Override per section for theme switching */
.section-light {
  --fg-bg: #f5f5f0;
  --fg-text: #111111;
  --fg-accent: #d4380d;
}
```

## Method 4: Preset Combinations

Provide curated presets that mix tokens together:

```typescript
// src/presets.ts
export const presets = {
  brutalist: {
    fonts: { display: 'Space Grotesk', body: 'Space Grotesk' },
    colors: { bg: '#ffffff', text: '#000000', accent: '#ff0000' },
    animation: { revealType: 'clip-up', velocitySkew: 12 },
  },
  editorial: {
    fonts: { display: 'Playfair Display', body: 'Inter' },
    colors: { bg: '#faf9f6', text: '#2c2c2c', accent: '#8b6914' },
    animation: { revealType: 'fade-up', velocitySkew: 3 },
  },
  dark-future: {
    fonts: { display: 'Syne', body: 'Inter' },
    colors: { bg: '#000000', text: '#ffffff', accent: '#00ff88' },
    animation: { revealType: 'blur', velocitySkew: 8 },
  },
  cinematic: {
    fonts: { display: 'Oswald', body: 'Lato' },
    colors: { bg: '#0d0d0d', text: '#e0e0e0', accent: '#c9a84c' },
    animation: { revealType: 'fade-left', velocitySkew: 6 },
  },
};
```

## Method 5: Font Pairing Injection

Different Google Fonts or self-hosted fonts loaded via `@font-face` in each project's CSS:

```typescript
// Project A
display: 'Clash Display' + body: 'Satoshi'

// Project B
display: 'Space Grotesk' + body: 'DM Sans'

// Project C
display: 'Syne' + body: 'Inter'

// Project D
display: 'Outfit' + body: 'Work Sans'

// Rule: NEVER repeat the same font pair across projects
```

## Method 6: Color Palette Generation

Use HSL-based palette generation to ensure unique but harmonious colors:

```typescript
// Generate unique palette from a single hue
function generatePalette(baseHue: number) {
  return {
    bg: `hsl(${baseHue}, 5%, 5%)`,
    surface: `hsl(${baseHue}, 5%, 10%)`,
    text: `hsl(0, 0%, 95%)`,
    accent: `hsl(${(baseHue + 180) % 360}, 80%, 60%)`, // Complementary
    accentAlt: `hsl(${(baseHue + 120) % 360}, 70%, 55%)`, // Triadic
  };
}

// Project A: generatePalette(200)  → Blue base
// Project B: generatePalette(340)  → Pink base
// Project C: generatePalette(45)   → Gold base
// Project D: generatePalette(160)  → Teal base
```

---

# 🏗️ FRAMEWORK ARCHITECTURE

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Build Tool** | Vite 6.x | Bundler, HMR, dev server |
| **Language** | TypeScript 5.6+ | Type safety, DX |
| **Animation** | GSAP 3.12+ | All animation engine |
| **Scroll Animations** | GSAP ScrollTrigger 3.12+ | Scroll-driven animations |
| **Smooth Scroll** | Lenis 1.1+ | Smooth scrolling |
| **Page Transitions** | Barba.js 2.10+ | Ajax page transitions |
| **3D/WebGL** | Three.js 0.171+ | WebGL scenes (lazy-loaded) |
| **CSS Utility** | Tailwind CSS 4.x | Utility-first styling |
| **Video** | Vimeo Player API / native `<video>` | Media playback |
| **GLSL** | vite-plugin-glsl | Shader imports |
| **No React/Next.js** | Vanilla TS | Zero framework overhead |

## Dependencies

```json
{
  "dependencies": {
    "gsap": "^3.12.5",
    "lenis": "^1.1.18",
    "@barba/core": "^2.10.0",
    "three": "^0.171.0",
    "vimeo-player": "^2.16.4"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "vite-plugin-glsl": "^1.3.0"
  }
}
```

## Directory Structure

```
freegrid/
├── index.html                    # Entry HTML
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── public/
│   ├── fonts/                    # Self-hosted fonts
│   ├── images/                   # Static images
│   └── videos/                   # Static videos
├── src/
│   ├── main.ts                   # Entry point — boot sequence
│   ├── tokens.ts                 # Design tokens (UNIQUE PER SITE)
│   ├── styles/
│   │   ├── globals.css           # CSS custom properties, resets
│   │   ├── typography.css        # Font-face, type scale
│   │   ├── components.css        # Component styles
│   │   └── animations.css        # Animation helper classes
│   ├── core/
│   │   ├── fg.ts                 # THE BACKBONE — dsn-grid.js port
│   │   ├── scroll-engine.ts      # Lenis + ScrollTrigger sync
│   │   ├── raf.ts                # RequestAnimationFrame manager
│   │   └── resize.ts             # ResizeObserver manager
│   ├── animations/
│   │   ├── reveals.ts            # Scroll-triggered reveals
│   │   ├── parallax.ts           # Image + element parallax
│   │   ├── text.ts               # Text split + stagger reveals
│   │   ├── velocity.ts           # Scroll velocity skew
│   │   ├── horizontal.ts         # Horizontal scroll sections
│   │   ├── marquee.ts            # Infinite ticker/marquee
│   │   ├── magnetic.ts           # Magnetic button hover
│   │   ├── clip-path.ts          # Image clip reveals
│   │   └── color-shift.ts        # Section color transitions
│   ├── components/
│   │   ├── cursor.ts             # Custom cursor (dot + follower)
│   │   ├── navbar.ts             # Smart navbar (hide/show/solid)
│   │   ├── hamburger.ts          # Mobile menu overlay
│   │   ├── preloader.ts          # Loading sequence
│   │   ├── theme.ts              # Dark/light section switching
│   │   └── form.ts               # Form micro-interactions
│   ├── media/
│   │   ├── lazy-load.ts          # IntersectionObserver + reveal
│   │   ├── video.ts              # Viewport play/pause
│   │   └── lightbox.ts           # Image lightbox
│   ├── transitions/
│   │   └── barba.ts              # Barba.js page transitions
│   ├── webgl/
│   │   └── init.ts               # Three.js lifecycle (lazy)
│   └── utils/
│       ├── reduced-motion.ts     # prefers-reduced-motion
│       ├── device.ts             # Device tier detection
│       ├── performance.ts        # FPS monitor
│       └── dom.ts                # DOM helpers ($, $$, etc.)
```

---

# 📐 COMPLETE DATA ATTRIBUTE SYSTEM

Every animation is driven by `data-fg-*` attributes on HTML elements. This is the declarative animation API — the same philosophy as dsn-grid.js's `data-dsn-*` system.

## Reveal Attributes

```html
<!-- Basic reveals -->
<div data-fg-reveal="fade-up">...</div>
<div data-fg-reveal="fade-down">...</div>
<div data-fg-reveal="fade-left">...</div>
<div data-fg-reveal="fade-right">...</div>
<div data-fg-reveal="fade">...</div>
<div data-fg-reveal="scale-up">...</div>
<div data-fg-reveal="scale-down">...</div>
<div data-fg-reveal="clip-up">...</div>
<div data-fg-reveal="clip-down">...</div>
<div data-fg-reveal="clip-left">...</div>
<div data-fg-reveal="clip-right">...</div>
<div data-fg-reveal="rotate">...</div>
<div data-fg-reveal="blur">...</div>

<!-- Reveal modifiers -->
<div data-fg-reveal="fade-up"
     data-fg-delay="0.2"
     data-fg-duration="1.2"
     data-fg-ease="power3.out"
     data-fg-start="top 85%"
     data-fg-end="bottom 20%"
     data-fg-scrub="0.5"
     data-fg-pin
     data-fg-stagger="0.1"
     data-fg-markers>
  ...
</div>
```

## Parallax Attributes

```html
<!-- Image parallax (vertical offset on scroll) -->
<img data-fg-parallax="0.3" src="..." />

<!-- Parallax with custom parameters -->
<img data-fg-parallax="0.5"
     data-fg-y="100"
     data-fg-scale="1.2"
     data-fg-start="top bottom"
     data-fg-end="bottom top"
     src="..." />

<!-- Mouse parallax (follows cursor) -->
<div data-fg-mouse-parallax="0.05">
  <img data-fg-depth="1" src="..." />
  <div data-fg-depth="2">Overlapping element</div>
</div>

<!-- Background position parallax (mouse-following BG) -->
<div data-fg-bg-parallax style="background-image: url(...)">
  ...
</div>
```

## Text Animation Attributes

```html
<!-- Split by characters -->
<h2 data-fg-text-split="chars">Hello World</h2>

<!-- Split by words -->
<p data-fg-text-split="words">Each word animates separately</p>

<!-- Split by lines -->
<h3 data-fg-text-split="lines">Line by line reveal</h3>

<!-- Text split with scroll trigger -->
<h1 data-fg-text-split="chars"
    data-fg-text-trigger
    data-fg-text-stagger="0.03"
    data-fg-text-duration="0.8"
    data-fg-text-from="y: 80; opacity: 0"
    data-fg-text-ease="power4.out">
  Hero Title
</h1>
```

## Velocity / Skew Attributes

```html
<!-- Skew on scroll velocity -->
<h1 data-fg-velocity>Skews during fast scroll</h1>
<p data-fg-velocity-scale>Scales with scroll speed</p>
<div data-fg-velocity-fade>Fades based on velocity</div>

<!-- Custom velocity parameters -->
<h1 data-fg-velocity
    data-fg-velocity-max="8"
    data-fg-velocity-easing="power2.out"
    data-fg-velocity-smoothing="0.1">
  Custom skew behavior
</h1>
```

## Horizontal Scroll Attributes

```html
<div data-fg-horizontal data-fg-pin>
  <div data-fg-horizontal-track>
    <div data-fg-horizontal-item>Card 1</div>
    <div data-fg-horizontal-item>Card 2</div>
    <div data-fg-horizontal-item>Card 3</div>
    <div data-fg-horizontal-item>Card 4</div>
  </div>
</div>

<!-- With custom parameters -->
<div data-fg-horizontal
     data-fg-pin
     data-fg-horizontal-speed="1"
     data-fg-horizontal-scrub="1"
     data-fg-horizontal-snap>
  ...
</div>
```

## Marquee Attributes

```html
<!-- Infinite horizontal ticker -->
<div data-fg-marquee>
  <div data-fg-marquee-track>
    <span>Item 1</span>
    <span>Item 2</span>
    <span>Item 3</span>
  </div>
</div>

<!-- Vertical ticker -->
<div data-fg-marquee="vertical">
  ...
</div>

<!-- Custom speed and direction -->
<div data-fg-marquee
     data-fg-marquee-speed="0.5"
     data-fg-marquee-direction="-1"
     data-fg-marquee-draggable>
  ...
</div>
```

## Magnetic Button Attributes

```html
<!-- Magnetic hover effect -->
<a href="/work" data-fg-magnetic>View Work</a>

<!-- Custom strength and area -->
<button data-fg-magnetic
        data-fg-magnetic-strength="0.3"
        data-fg-magnetic-area="100">
  Click Me
</button>

<!-- Magnetic with text reveal -->
<a data-fg-magnetic data-fg-magnetic-text-reveal href="/about">
  <span>About Us</span>
</a>
```

## Clip Path Reveal Attributes

```html
<!-- Image reveal on scroll -->
<div data-fg-clip-reveal="circle">
  <img src="..." />
</div>

<div data-fg-clip-reveal="diagonal">
  <img src="..." />
</div>

<div data-fg-clip-reveal="line">
  <img src="..." />
</div>

<!-- Custom clip parameters -->
<div data-fg-clip-reveal="circle"
     data-fg-clip-duration="1.5"
     data-fg-clip-ease="power4.inOut"
     data-fg-clip-start="top 80%"
     data-fg-clip-scrub="0.5">
  <img src="..." />
</div>
```

## Cursor Attributes

```html
<!-- Change cursor state on hover -->
<a href="/" data-fg-cursor="pointer">Link</a>
<button data-fg-cursor="pointer">Button</button>
<div data-fg-cursor="view">Hover to view</div>
<div data-fg-cursor="drag">Draggable area</div>
<div data-fg-cursor="text">Text input area</div>
<img data-fg-cursor="expand" src="..." />
```

## Video Attributes

```html
<!-- Auto play/pause based on viewport -->
<video data-fg-video-viewport src="..." muted loop playsinline></video>

<!-- Vimeo embed -->
<div data-fg-vimeo="123456789"
     data-fg-vimeo-autoplay="viewport"
     data-fg-vimeo-quality="1080">
</div>

<!-- YouTube embed -->
<div data-fg-youtube="dQw4w9WgXcQ"
     data-fg-youtube-autoplay="viewport">
</div>
```

## Preloader Attributes

```html
<!-- Mark elements for preloader reveal -->
<div data-fg-preloader="text">Reveals after load</div>
<div data-fg-preloader="image">
  <img src="..." />
</div>
<div data-fg-preloader="counter">
  <span>0</span>
</div>
```

## Transition Attributes

```html
<!-- Barba.js page transition type per link -->
<a href="/work" data-fg-transition="curtain">Project 1</a>
<a href="/about" data-fg-transition="scale">About</a>
<a href="/contact" data-fg-transition="fade">Contact</a>
<a href="/archive" data-fg-transition="clip">Archive</a>

<!-- Transition direction -->
<a href="/next" data-fg-transition="curtain" data-fg-transition-dir="left">
  Next Page
</a>
```

## Color / Theme Attributes

```html
<!-- Section with different theme -->
<section data-fg-theme="light">
  Light section content
</section>

<section data-fg-theme="dark">
  Dark section content
</section>

<section data-fg-theme="custom"
         data-fg-theme-bg="#1a1a2e"
         data-fg-theme-text="#e0e0e0"
         data-fg-theme-accent="#e94560">
  Custom theme section
</section>
```

## Stagger Grid Attributes

```html
<!-- Staggered grid reveal -->
<div data-fg-stagger-grid>
  <div data-fg-stagger-item>Item 1</div>
  <div data-fg-stagger-item>Item 2</div>
  <div data-fg-stagger-item>Item 3</div>
  <div data-fg-stagger-item>Item 4</div>
  <div data-fg-stagger-item>Item 5</div>
  <div data-fg-stagger-item>Item 6</div>
</div>

<!-- Custom stagger parameters -->
<div data-fg-stagger-grid
     data-fg-stagger-amount="0.15"
     data-fg-stagger-from="start"
     data-fg-stagger-grid-cols="3">
  ...
</div>
```

## Scroll Progress Attributes

```html
<!-- Linear progress bar -->
<div data-fg-progress-bar>
  <div data-fg-progress-fill></div>
</div>

<!-- Circle progress -->
<div data-fg-progress-circle data-fg-progress-size="60">
  <svg>...</svg>
</div>
```

## Image Lazy Load + Reveal

```html
<!-- Lazy load with reveal animation -->
<img data-fg-lazy src="placeholder.jpg" data-fg-src="real-image.jpg" />

<!-- Custom lazy load style -->
<img data-fg-lazy
     data-fg-lazy-reveal="blur"
     data-fg-src="real-image.jpg"
     src="data:image/jpeg;base64,..." />
```

---

# 🧠 CORE ENGINE — fg.ts (dsn-grid.js 1:1 Port)

The backbone of FreeGrid. Every method from dsn-grid.js mapped 1:1 with modern equivalents.

## Architecture: Singleton Pattern

```typescript
// fg.ts exports a single FreeGrid instance
import { fg } from './core/fg';

// Usage anywhere in the project
fg.parallaxIt(element, child, e, 0.3);
fg.convertTextLine(element);
fg.tweenMaxParallax(config);
```

## Method Reference

### Utility Methods

```
getUndefinedVal(value, fallback)     → value or fallback
removeAttr(el, attr)                → attrValue (removes from DOM)
getData(el, key, fallback)          → data-fg-{key} value or fallback
numberText(n)                        → "01"-"09" zero-padded string
randomObjectArray(arr, factor?)      → shuffled array
getRndInteger(min, max)              → random int in [min, max)
$(selector, context?)                → HTMLElement | NodeList
```

### Mouse / Cursor Methods

```
mouseMove(cursorEl)                  → binds mousemove → gsap.quickTo cursor
moveIcon(container, icon)            → icon follows mouse within container
parallaxMoveElement(el, children, e, opt?)  → mouse parallax on children
parallaxMoveElementCircle(el, children, e, opt?) → same + circle indicator
elementHover(el, className?)         → add/remove class on hover
backgroundPosition(el, e, opt?)      → mouse-following background position
parallaxIt(el, child, e, sp?)        → mouse parallax on single child
```

### Scroll Methods

```
scaleIt(el, opt?)                    → normalized scroll progress 0→1
scrollerIt(el, opt?)                 → fires callback when element enters viewport
scrollTop(target, offset?)           → lenis.scrollTo(target, { offset })
mouseWheel(callbacks)                → binds wheel events → up/down callbacks
```

### Text Methods

```
convertTextLine(el)                  → split text into char spans
convertTextWord(el)                  → split text into word spans
animateText(el, opt?)               → scroll-triggered text reveal
changeSizeText(el, parent, option?)  → responsive text sizing
```

### Animation Methods

```
tweenMaxParallax(config)             → ScrollTrigger + GSAP tween (replaces ScrollMagic)
parallaxImg(container, opt?)         → image parallax with data-fg-y, data-fg-scale
parallaxImgHover(container, opt?)    → mouse-driven image parallax
progressCircle(circle, opt?)         → SVG circle stroke-dashoffset from scroll
```

### Media Methods

```
imageLoad(container, callback?)      → imagesLoaded + loader animation
embedVideo(container)                → reads data-fg-video, embeds on click
pageLoad(timer, callback?)           → preloader progress counter
```

### Page Transition Methods (→ Barba.js)

```
dsnAjax(options?)                    → wraps Barba.js init
headerProject(container)             → project header entrance animation
nextProject(container)               → next project reveal
endAnimate(el, option?)             → element end-state animation
```

### Orchestration

```
changeColor()                        → detect data-fg-theme, update body class
reloadAjax()                         → re-init all after page transition
effectScroll.start()                 → init Lenis + ScrollTrigger sync
effctStickyNavBar()                  → navbar hide/show on scroll direction
positionScroll()                     → anchor link smooth scrolling
```

---

# 🔄 BOOT SEQUENCE

The exact initialization order:

```
1. DOMContentLoaded fires
   ├── new FreeGrid()           ← singleton created
   ├── fg.effectAnimate()       ← creates animation manager
   │   ├── initAllReveals()     ← scan all [data-fg-reveal]
   │   ├── initParallax()       ← scan all [data-fg-parallax]
   │   ├── initVelocity()       ← scan all [data-fg-velocity]
   │   ├── initHorizontal()     ← scan all [data-fg-horizontal]
   │   ├── initMarquee()        ← scan all [data-fg-marquee]
   │   ├── initMagnetic()       ← scan all [data-fg-magnetic]
   │   ├── initClipReveal()     ← scan all [data-fg-clip-reveal]
   │   ├── initStaggerGrid()    ← scan all [data-fg-stagger-grid]
   │   ├── initProgressBar()    ← scan all [data-fg-progress-bar]
   │   └── initProgressCircle() ← scan all [data-fg-progress-circle]
   │
   ├── fg.cursor.init()         ← custom cursor (if not reduced-motion)
   ├── fg.preloader.init()      ← loading sequence
   └── fg.lazyLoad.init()       ← IntersectionObserver for [data-fg-lazy]

2. imagesLoaded fires
   ├── fg.preloader.complete()  ← animate out preloader
   └── Window "load" fires

3. Window "load" fires
   ├── fg.changeColor()         ← detect [data-fg-theme] sections
   ├── fg.effectScroll.start()  ← init Lenis + ScrollTrigger sync
   ├── fg.navbar.init()         ← sticky navbar behavior
   ├── fg.animate.allInt()      ← init ALL scroll animations
   │   ├── headerProject()      ← project header entrance
   │   ├── nextProject()        ← next project reveal
   │   ├── parallaxImgHover()   ← mouse parallax images
   │   ├── parallaxImg()        ← scroll parallax images
   │   ├── moveSection()        ← section entrance animations
   │   ├── animateText()        ← text split + scroll reveal
   │   └── changeColor()        ← section theme switching
   │
   ├── fg.reloadAjax()          ← mouse, video, images, progress
   ├── fg.positionScroll()      ← anchor links
   └── fg.barba.init()          ← Barba.js page transitions
```

---

# 🔄 BARBA.JS PAGE TRANSITIONS

## Transition Types

| Type | Behavior | Duration |
|---|---|---|
| `curtain` | Full-screen overlay scaleY in → out | 0.6s in, 0.6s out |
| `scale` | Content scales down → overlay → new content scales up | 0.5s |
| `fade` | Crossfade with opacity | 0.4s |
| `clip` | Clip-path wipe from left/right | 0.5s |
| `slide` | New page slides over old | 0.6s |
| `split` | Page splits vertically from center | 0.5s |
| `none` | Instant swap (no animation) | 0s |

## HTML Usage

```html
<!-- Default transition type from tokens -->
<a href="/project">View</a>

<!-- Override per link -->
<a href="/project" data-fg-transition="curtain">View</a>

<!-- Override transition direction -->
<a href="/project" data-fg-transition="curtain" data-fg-transition-dir="left">
  View
</a>
```

## Integration

```typescript
// transitions/barba.ts
import barba from '@barba/core';

barba.init({
  transitions: [{
    name: 'fg-transition',
    leave(data) {
      // Read transition type from outgoing link
      const type = data.trigger.getAttribute('data-fg-transition')
        || tokens.animation.transitionType;
      return fg.transitions.leave(data, type);
    },
    enter(data) {
      return fg.transitions.enter(data);
    },
    afterEnter(data) {
      // Re-init all animations for new page
      fg.killScrollTriggers();
      fg.animate.allInt();
      fg.reloadAjax();
      fg.lazyLoad.init();
      ScrollTrigger.refresh();
    },
  }],
});
```

---

# 📐 SCROLL ANIMATION PRESETS

Every reveal type with exact GSAP configuration:

## Reveal Presets

```typescript
const REVEAL_PRESETS = {
  'fade-up':      { y: 80, opacity: 0 },
  'fade-down':    { y: -80, opacity: 0 },
  'fade-left':    { x: 80, opacity: 0 },
  'fade-right':   { x: -80, opacity: 0 },
  'fade':         { opacity: 0 },
  'scale-up':     { scale: 0.85, opacity: 0 },
  'scale-down':   { scale: 1.15, opacity: 0 },
  'clip-up':      { clipPath: 'inset(100% 0% 0% 0%)' },
  'clip-down':    { clipPath: 'inset(0% 0% 100% 0%)' },
  'clip-left':    { clipPath: 'inset(0% 100% 0% 0%)' },
  'clip-right':   { clipPath: 'inset(0% 0% 0% 100%)' },
  'rotate':       { rotation: 15, opacity: 0, transformOrigin: 'left center' },
  'blur':         { filter: 'blur(20px)', opacity: 0 },
};
```

## ScrollTrigger Configuration Per Type

```typescript
// data-fg-reveal (no scrub) — play on enter
{ trigger: el, start: 'top 85%', toggleActions: 'play none none none' }

// data-fg-reveal + data-fg-scrub — scrubbed to scroll
{ trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: 0.5 }

// data-fg-reveal + data-fg-pin — pinned section
{ trigger: el, start: 'top top', end: '+=600', pin: true, scrub: 0.5 }

// data-fg-parallax — image parallax
{ trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }

// data-fg-velocity — no ScrollTrigger, RAF-driven
{ trigger: none — driven by scroll velocity in RAF loop }

// data-fg-horizontal — pinned horizontal scroll
{ trigger: el, start: 'top top', end: () => '+=' + trackWidth, pin: true, scrub: 1 }

// data-fg-stagger-grid — staggered grid reveal
{ trigger: grid, start: 'top 80%', toggleActions: 'play none none none' }

// data-fg-progress-bar — full page progress
{ trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }

// data-fg-clip-reveal — image clip reveal
{ trigger: el, start: 'top bottom', end: 'top top', scrub: true }
```

---

# 🎨 CSS SYSTEM

## Global CSS Custom Properties (mapped from tokens.ts)

```css
:root {
  --fg-bg: #0a0a0a;
  --fg-surface: #141414;
  --fg-text: #ffffff;
  --fg-text-secondary: rgba(255,255,255,0.7);
  --fg-accent: #00f0ff;
  --fg-accent-alt: #ff4d4d;
  --fg-border: rgba(255,255,255,0.1);

  --fg-font-display: 'Clash Display', sans-serif;
  --fg-font-body: 'Satoshi', sans-serif;
  --fg-font-mono: 'JetBrains Mono', monospace;

  --fg-section-gap: 140px;
  --fg-container-max: 1440px;
  --fg-container-pad: 64px;

  --fg-transition-fast: 0.2s;
  --fg-transition-medium: 0.4s;
  --fg-transition-slow: 0.8s;

  --fg-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --fg-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

## Section Theme Override Pattern

```css
[data-fg-theme="light"] {
  --fg-bg: #f5f5f0;
  --fg-text: #111111;
  --fg-text-secondary: rgba(0,0,0,0.6);
  --fg-border: rgba(0,0,0,0.1);
}
```

## Container System

```css
.fg-container {
  max-width: var(--fg-container-max);
  margin: 0 auto;
  padding: 0 var(--fg-container-pad);
}

.fg-section {
  padding: var(--fg-section-gap) 0;
}

.fg-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-fg-reveal],
  [data-fg-parallax],
  [data-fg-velocity],
  [data-fg-text-split],
  [data-fg-clip-reveal] {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    clip-path: none !important;
  }

  .fg-cursor { display: none !important; }
}
```

---

# 🌐 WebGL / THREE.JS SYSTEM

## Lazy Loading Pattern

WebGL scenes are lazy-loaded — Three.js is only imported when a `data-fg-webgl` element exists on the page:

```html
<div data-fg-webgl="particle-field"
     data-fg-webgl-color="#00f0ff"
     data-fg-webgl-count="2000"
     data-fg-webgl-speed="0.5">
</div>
```

```typescript
// webgl/init.ts — only imports Three.js if needed
async function initWebGL() {
  const containers = document.querySelectorAll('[data-fg-webgl]');
  if (!containers.length) return;

  const { WebGLScene } = await import('./scene');

  containers.forEach(el => {
    const scene = new WebGLScene(el, {
      type: el.getAttribute('data-fg-webgl'),
      color: fg.getData(el, 'color', '#ffffff'),
      count: parseInt(fg.getData(el, 'count', '1000')),
      speed: parseFloat(fg.getData(el, 'speed', '0.5')),
    });
    scene.init();
  });
}
```

## Supported WebGL Scene Types

| Type | Description | When to Use |
|---|---|---|
| `particle-field` | Floating particles that react to scroll | Hero backgrounds |
| `noise-plane` | Deformed mesh with noise | Abstract backgrounds |
| `distortion` | Image distortion on hover | Image hover effects |
| `glitch` | Digital glitch effect | Hero accents |
| `morph` | Shape morphing | Logo animations |

---

# 🛠️ UTILITY MODULES

## reduced-motion.ts

```typescript
// Detects prefers-reduced-motion and provides feature flags
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isReducedMotion = () => prefersReducedMotion.matches;
// If true: disable all GSAP animations, parallax, velocity, cursor, WebGL
```

## device.ts

```typescript
// Detects device tier for performance gating
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isLowEnd = () => navigator.hardwareConcurrency <= 4;
const isTouch = () => 'ontouchstart' in window;
const prefersReducedData = () => window.matchMedia('(prefers-reduced-data: reduce)').matches;
// If lowEnd: reduce particle count, disable complex parallax, simplify WebGL
```

## performance.ts (dev only)

```typescript
// FPS monitor overlay — enabled via ?fps=true query param
function initFPSMonitor(): void {
  // Renders FPS counter in top-right corner
  // Logs frame drops below 55fps
  // Shows memory usage if available
}
```

## dom.ts

```typescript
// DOM helpers replacing jQuery
function $(selector: string, context?: Element): HTMLElement | null;
function $$(selector: string, context?: Element): HTMLElement[];
function createElement(tag: string, attrs?: Record<string, string>, children?: HTMLElement[]): HTMLElement;
function onReady(callback: () => void): void;
```

---

# 🎯 NAVBAR SYSTEM

## Behavior Modes

| Mode | Trigger | Behavior |
|---|---|---|
| `transparent` | Top of page | No background, transparent |
| `solid` | Scrolled past hero | Background + blur + border |
| `hidden` | Scrolling down | Slides up out of view |
| `visible` | Scrolling up | Slides back into view |

## HTML Structure

```html
<nav data-fg-navbar data-fg-navbar-mode="transparent">
  <a href="/" class="fg-navbar__logo">
    <img src="logo.svg" alt="Logo" />
  </a>
  <ul class="fg-navbar__links">
    <li><a href="/work">Work</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
  <button data-fg-hamburger class="fg-navbar__hamburger">
    <span></span>
    <span></span>
  </button>
</nav>
```

---

# 🍔 HAMBURGER / MOBILE MENU

## Behavior

1. Click hamburger → full-screen overlay slides in
2. Nav links stagger-animate in from right
3. Body scroll locked
4. Click link or close → overlay slides out

## HTML Structure

```html
<div data-fg-menu class="fg-menu">
  <div class="fg-menu__overlay"></div>
  <div class="fg-menu__content">
    <nav class="fg-menu__nav">
      <a href="/work" data-fg-reveal="fade-up" data-fg-delay="0.1">Work</a>
      <a href="/about" data-fg-reveal="fade-up" data-fg-delay="0.2">About</a>
      <a href="/contact" data-fg-reveal="fade-up" data-fg-delay="0.3">Contact</a>
    </nav>
    <div class="fg-menu__footer">
      <p>© 2026 Studio</p>
    </div>
  </div>
</div>
```

---

# 📹 MEDIA SYSTEM

## Video Viewport Play/Pause

```html
<!-- Plays when in viewport, pauses when out -->
<video data-fg-video-viewport
       src="intro.mp4"
       muted
       loop
       playsinline
       preload="none">
</video>

<!-- Vimeo embed — auto quality -->
<div data-fg-vimeo="123456789"
     data-fg-vimeo-autoplay="viewport"
     data-fg-vimeo-quality="auto"
     data-fg-vimeo-muted>
</div>
```

## Lazy Load + Reveal

```html
<!-- Blur-up placeholder pattern -->
<img data-fg-lazy
     data-fg-src="hero-image.webp"
     src="data:image/jpeg;base64,/9j/4AAQ..."
     alt="Hero"
     class="fg-lazy" />

<!-- CSS handles the blur transition -->
<style>
  .fg-lazy {
    filter: blur(20px);
    transition: filter 0.6s ease;
  }
  .fg-lazy.fg-lazy-loaded {
    filter: blur(0);
  }
</style>
```

---

# 🎬 PRELOADER SYSTEM

## Supported Types

| Type | Description | Duration |
|---|---|---|
| `curtain` | Full-screen overlay splits open | 0.8s |
| `counter` | Number counts from 0→100 | Until loaded |
| `bar` | Horizontal bar fills | Until loaded |
| `morph` | Shape morphs / dissolves | 1.0s |
| `text` | Text scramble/decode | 0.6s |
| `none` | No preloader | 0s |

## HTML Pattern

```html
<div data-fg-preloader="curtain" class="fg-preloader">
  <div class="fg-preloader__inner">
    <div data-fg-preloader="counter" class="fg-preloader__counter">0</div>
    <div class="fg-preloader__bar">
      <div data-fg-preloader="bar" class="fg-preloader__fill"></div>
    </div>
  </div>
</div>
```

## Lifecycle

```
1. preloader.init()     → show preloader, start counter
2. imagesLoaded         → all images loaded
3. preloader.complete() → animate preloader out, reveal content
4. window "load"        → init all animations
```

---

# 📦 CROSS-REFERENCE — 10 REAL TEMPLATES ANALYZED

## What Every Template Uses (Common Denominators)

| Feature | Droow | Coba | Alcy | Cuby | Lida | Stukram | Asli | Grenada | Rubenz | Hamon |
|---|---|---|---|---|---|---|---|---|---|---|
| jQuery | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bootstrap | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| TweenMax/GSAP | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Custom scroll | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ajax transitions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Isotope/Filtering | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| Custom cursor | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Preloader | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Image parallax | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Text splitting | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Fonts | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| FontAwesome | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## What the Framework REPLACES

| Old Technology | FreeGrid Replacement | Why |
|---|---|---|
| jQuery | Vanilla TypeScript | Zero dependency, better perf |
| TweenMax (GSAP v2) | GSAP v3 | Modern API, ScrollTrigger built-in |
| ScrollMagic | GSAP ScrollTrigger | Same team, better performance |
| smooth-scrollbar | Lenis | Smoother, better mobile, GSAP sync |
| dsnAjax() | Barba.js | Battle-tested transitions |
| dsn-grid.js | fg.ts | Full 1:1 port, modern engine |
| Isotope | CSS Grid + GSAP | Lighter, no layout library needed |
| Magnific Popup | Custom lightbox.ts | Simpler, no jQuery |
| YouTubePopUp | Vimeo Player API | Better quality options |
| imagesLoaded | IntersectionObserver | Native API, no dependency |

---

# 📋 BUILD ORDER

Implement in this exact sequence:

```
PHASE 1 — SCAFFOLD (Day 1)
  1.  Initialize Vite + TypeScript project
  2.  Install all dependencies
  3.  Configure vite.config.ts + tailwind
  4.  Create directory structure
  5.  Set up tsconfig.json + jsconfig.json

PHASE 2 — CORE ENGINE (Days 2-3)
  6.  Implement src/utils/dom.ts — $, $$, createElement, onReady
  7.  Implement src/utils/reduced-motion.ts
  8.  Implement src/utils/device.ts
  9.  Implement src/core/fg.ts — ALL utility methods first
  10. Implement src/core/fg.ts — Mouse/cursor methods
  11. Implement src/core/fg.ts — Scroll methods
  12. Implement src/core/fg.ts — Text methods
  13. Implement src/core/fg.ts — Animation methods (tweenMaxParallax, parallaxImg, etc.)
  14. Implement src/core/fg.ts — Media methods (imageLoad, embedVideo, pageLoad)
  15. Implement src/core/fg.ts — Transition methods (dsnAjax wrapper, headerProject, nextProject)
  16. Implement src/core/fg.ts — Orchestration (changeColor, reloadAjax, allInt)
  17. Implement src/core/scroll-engine.ts — Lenis + ScrollTrigger sync
  18. Implement src/core/raf.ts — RAF manager
  19. Implement src/core/resize.ts — ResizeObserver manager

PHASE 3 — ANIMATIONS (Days 4-5)
  20. Implement src/animations/reveals.ts — data-fg-reveal system
  21. Implement src/animations/parallax.ts — data-fg-parallax + mouse parallax
  22. Implement src/animations/text.ts — data-fg-text-split
  23. Implement src/animations/velocity.ts — data-fg-velocity skew
  24. Implement src/animations/horizontal.ts — data-fg-horizontal
  25. Implement src/animations/marquee.ts — data-fg-marquee
  26. Implement src/animations/magnetic.ts — data-fg-magnetic
  27. Implement src/animations/clip-path.ts — data-fg-clip-reveal
  28. Implement src/animations/color-shift.ts — data-fg-theme

PHASE 4 — COMPONENTS (Days 5-6)
  29. Implement src/components/cursor.ts — data-fg-cursor
  30. Implement src/components/navbar.ts — data-fg-navbar
  31. Implement src/components/hamburger.ts — data-fg-menu
  32. Implement src/components/preloader.ts — data-fg-preloader
  33. Implement src/components/theme.ts — dark/light switching
  34. Implement src/components/form.ts — form micro-interactions

PHASE 5 — MEDIA (Day 6)
  35. Implement src/media/lazy-load.ts — data-fg-lazy
  36. Implement src/media/video.ts — data-fg-video-viewport, data-fg-vimeo
  37. Implement src/media/lightbox.ts — image lightbox

PHASE 6 — TRANSITIONS (Day 7)
  38. Implement src/transitions/barba.ts — Barba.js with all transition types

PHASE 7 — WebGL (Day 7-8)
  39. Implement src/webgl/init.ts — lazy Three.js loader
  40. Implement src/webgl/scenes/particle-field.ts
  41. Implement src/webgl/scenes/noise-plane.ts

PHASE 8 — STYLES (Day 8)
  42. Implement src/styles/globals.css — custom properties, reset, containers
  43. Implement src/styles/typography.css — font-face, type scale
  44. Implement src/styles/components.css — navbar, cursor, preloader, menu
  45. Implement src/styles/animations.css — animation helper classes

PHASE 9 — ENTRY + INTEGRATION (Day 9)
  46. Implement src/tokens.ts — design token system
  47. Implement src/main.ts — boot sequence
  48. Create index.html with demo sections
  49. Integration test — all modules working together

PHASE 10 — POLISH (Day 10)
  50. Performance audit — ensure 60fps
  51. Reduced motion testing
  52. Mobile testing
  53. Cross-browser testing
  54. Documentation
```

---

# ✅ SUCCESS CRITERIA

The framework is complete when ALL of these are true:

- [ ] Vite dev server starts with zero errors
- [ ] TypeScript compiles with zero errors
- [ ] All 28 modules implemented and importable
- [ ] Every `data-fg-*` attribute works in HTML
- [ ] Design token system works — changing tokens.ts changes the entire site
- [ ] Lenis smooth scroll works with ScrollTrigger sync
- [ ] Custom cursor works with all hover states
- [ ] Preloader works with all types (curtain, counter, bar)
- [ ] Barba.js transitions work with all types (curtain, scale, fade, clip)
- [ ] All 12+ reveal types work
- [ ] Parallax (scroll + mouse) works
- [ ] Velocity skew works
- [ ] Horizontal scroll sections work
- [ ] Marquee/ticker works
- [ ] Magnetic buttons work
- [ ] Image clip-path reveals work
- [ ] Section color/theme switching works
- [ ] Stagger grid works
- [ ] Video viewport play/pause works
- [ ] Lazy load + blur-up works
- [ ] Reduced motion disables ALL animations
- [ ] No console errors in production build
- [ ] Lighthouse performance score ≥ 95
- [ ] 60fps on desktop, 30fps+ on mobile
- [ ] Two different demo sites built with different tokens (proof of uniqueness)

---

> **The framework is the engine. The creative makes it unique.**
> **Every site must be a new creative expression. Never repeat.**