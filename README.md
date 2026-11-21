# Kuldeep · @xypherOG — Portfolio

Animated personal portfolio for a Telegram bot developer.

**Live demo:** run it locally or deploy to Render / Railway / Fly / any VPS.

---

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Page markup |
| `styles.css` | All styling + keyframe animations |
| `script.js` | Animation engine (vanilla JS, no libraries) |
| `app.py` | Flask server that serves the static files |
| `requirements.txt` | Python dependencies |
| `Procfile` | Render / Heroku process definition |
| `Dockerfile` | Container build |

## Animations

Everything is hand-written — **zero external JS libraries**, zero build step.

1. **Aurora mesh background** — three blurred gradient blobs drifting on independent 22–30s loops
2. **Particle constellation** — canvas with ~90 nodes, proximity links, and cursor attraction lines
3. **Cursor spotlight** — eased radial glow that trails the pointer
4. **Scroll progress bar** — gradient bar at the top tied to scroll position
5. **Sticky nav** — blurs and shrinks after 40px of scroll
6. **Hero line reveal** — headline lines slide up from an overflow mask, staggered
7. **Gradient shimmer** — animated multi-stop gradient text
8. **Typewriter** — rotating phrases with a blinking caret
9. **Counters** — numbers ease up from 0 when they enter the viewport
10. **Scroll reveal** — IntersectionObserver fade-up with per-element stagger
11. **3D tilt cards** — perspective rotation following the mouse
12. **Card glow** — radial highlight that tracks the cursor inside each card
13. **Magnetic buttons** — CTAs pull toward the pointer
14. **Infinite marquee** — seamless skill ticker, pauses on hover
15. **Shine sweep** — light streak across buttons on hover
16. **Pulsing status dot** — expanding ring on the "available" badge

All of it is disabled automatically under `prefers-reduced-motion: reduce`.

## Run locally

```bash
pip install -r requirements.txt
python app.py
# → http://127.0.0.1:5000
```

## Deploy

**Render / Railway** — point at this repo, build command `pip install -r requirements.txt`, start command `gunicorn app:app --bind 0.0.0.0:$PORT`.

**Docker**

```bash
docker build -t portfolio .
docker run -p 8080:8080 portfolio
```

**GitHub Pages** — the site is fully static; just enable Pages on `main` and it works with no server at all.

## Contact

- Telegram: [@xypherOG](https://t.me/xypherOG)
- Live bot: [@Edive_ai](https://t.me/Edive_ai)

---

© 2025 Kuldeep · Built with Python
