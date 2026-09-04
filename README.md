# NOIR Cinematic Slider v2

This version uses the supplied `My Movie 1.mp4` as **Slide 03 — MOVING IMAGE / ORIGINAL FILM**.

Video facts inspected from the supplied file:
- 1920 × 1080
- 25 fps
- 627 frames
- ~25.08 seconds
- MP4 / H.264-style browser video workflow

## Run
Serve this directory with a local static server. Do not open the HTML with `file://` if your browser blocks local video loading.

Example:
`python -m http.server 8080`

Then open:
`http://localhost:8080/`

## Interaction
- Wheel / trackpad = next / previous scene
- Mouse drag = next / previous
- Arrow keys = next / previous
- Menu = cinematic split-curtain
- Mouse = subtle image/video parallax
- Slide 03 (**IN MOTION / THE LEGEND**) enters as a compact rounded film card that pops out to fullscreen, plays while active, collapses back to the card when you leave, and pauses.

## Images
All stills are served locally from `assets/`. Swap any file with your own optimized AVIF/WebP still (keep the same filename). The video poster `Capture.JPG` covers slower connections while the MP4 loads.

| File | Scene |
| --- | --- |
| `Priyanka 1 copy.avif` | 01 — Portrait / The Icon |
| `Image 12 copy with grain.avif` | 02 — Editorial / New Form |
| `Capture.JPG` | 03 — Moving Image (video poster) |
| `c02525_23…~mv2.avif` / `c02525_41…~mv2.avif` | 04 — Diptych / Dynasty (left / right) |
| `c02525_9e…~mv2.avif` | 05 — Mono / Ghost |
| `srk.jpg` | 06 — End / Begin Again |
| (`virat 2.jpg` spare) | — |

## Production
For deployment, serve `assets/` and `media/` from your CDN or keep them local. A reduced-motion mode is still recommended.
