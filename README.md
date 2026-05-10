# kianmhz.me — Personal Portfolio

[![Deploy](https://github.com/kianmhz/Portfolio-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/kianmhz/Portfolio-website/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Source code for **[kianmhz.me](https://kianmhz.me)** — a single-page personal portfolio for Kian Haddad. Built with Nuxt 4 and Vue 3, deployed continuously to a self-hosted DigitalOcean droplet.

> A handcrafted showcase of projects, skills, and experience — with a focus on motion, polish, and original micro-interactions rather than off-the-shelf components.

## Highlights

- **Fully custom interactions** — no template, no boilerplate landing page. Every section is hand-built.
- **Performance-conscious** — particle effects offloaded to a Web Worker, fonts self-hosted via Nuxt Fonts, images served via Cloudflare image transformations.
- **Pure CSS / Vue motion** — Tailwind keyframes, IntersectionObserver-driven reveals, AOS for entry animations, mouse-proximity hover effects.
- **CI/CD pipeline** — GitHub Actions builds the Nuxt artifact and rsyncs it to the droplet; PM2 zero-downtime reloads the Node server.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) · [Vue 3](https://vuejs.org) · TypeScript |
| Styling | [Tailwind CSS v3](https://tailwindcss.com) · [Nuxt UI](https://ui.nuxt.com) |
| Fonts | [@nuxt/fonts](https://fonts.nuxt.com) — Oxygen (self-hosted from Google) |
| Icons | [@nuxt/icon](https://github.com/nuxt/icon) with locally bundled Iconify collections |
| Images | [@nuxt/image](https://image.nuxt.com) — Cloudflare provider |
| SEO | [@nuxtjs/seo](https://nuxtseo.com) · [@nuxtjs/robots](https://nuxtseo.com/robots) |
| Animation | [AOS](https://michalsnik.github.io/aos/) · IntersectionObserver · OffscreenCanvas |
| Carousel | [nuxt-swiper](https://github.com/cpreston321/nuxt-swiper) |
| Utilities | [VueUse](https://vueuse.org) |
| Linting | ESLint ([@nuxt/eslint-config](https://github.com/nuxt/eslint-config)) · Stylelint |
| Runtime | Node.js 22.17.1 (pinned via `.nvmrc`) |
| CI/CD | GitHub Actions → DigitalOcean droplet via rsync + PM2 |

## Project Structure

```
.
├── app.config.ts              # Nuxt UI theme tokens
├── app.vue                    # Root component
├── nuxt.config.ts             # Modules, SEO defaults, image provider
├── tailwind.config.js
│
├── pages/
│   └── index.vue              # Single-page layout — sections wired by refs
│
├── components/
│   ├── base/
│   │   ├── Navbar.vue         # Scroll-aware fixed navbar with hide-on-scroll
│   │   ├── Footer.vue         # Minimal branded footer
│   │   └── Button.vue         # Animated icon + label button primitive
│   ├── Skillset.vue           # Mouse-proximity gradient border on skill cards
│   ├── Logos.vue              # Infinite CSS marquee of tech logos
│   ├── Projects.vue           # Swiper carousel + OffscreenCanvas particles
│   ├── Cards.vue              # Stacked hover-reveal resume cards
│   ├── CharacterReveal.vue    # Line-by-line IntersectionObserver text reveal
│   ├── Contact.vue            # Contact links grid
│   ├── Slider.vue             # Holographic animated section divider
│   ├── Sign.vue               # SVG signature logo
│   └── particleWorker.js      # Web Worker for canvas particle simulation
│
├── composables/
│   ├── useNavigation.js       # Scroll direction detection for navbar
│   └── useUtils.js            # throttle, debounce, clamp, lerp helpers
│
├── assets/css/
│   └── main.css               # Global keyframe animations
│
├── public/                    # Static assets (favicons, images, robots)
├── server/                    # Nitro server routes (if any)
│
└── .github/workflows/
    └── deploy.yml             # Build on runner → rsync → PM2 reload
```

## Getting Started

**Prerequisites:** Node.js 22.17.1 (use `nvm use` to pick up `.nvmrc`).

```bash
# Match the pinned Node version
nvm install && nvm use

# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm run dev

# Production build (output: .output/)
npm run build

# Preview the built artifact
npm run preview

# Lint
npm run lint
npm run lint:fix
```

## Deployment

Production runs on a DigitalOcean droplet behind nginx, supervised by PM2. Pushes to `main` trigger an end-to-end deploy via GitHub Actions.

### Pipeline

```
push → main
   │
   ├── build job (GitHub runner)
   │     ├─ checkout
   │     ├─ setup-node (from .nvmrc)
   │     ├─ npm install
   │     ├─ nuxt build
   │     └─ upload .output/ as artifact
   │
   └── deploy job (GitHub runner)
         ├─ download .output/ artifact
         ├─ ssh-agent (DEPLOY_KEY secret)
         ├─ rsync .output/ → droplet:/var/www/kianmhz.me/.output/
         └─ ssh kianmhz@droplet bash deploy.sh
                                      │
                                      └─ pm2 reload nuxt-app  (zero-downtime)
```

The build runs on the Actions runner (≈7 GB RAM) rather than the droplet, avoiding OOM during Nuxt + Nitro compilation. Only the prebuilt `.output/` directory ships to the server.

### Required GitHub Secrets

| Secret | Purpose |
|---|---|
| `DEPLOY_KEY` | SSH private key authorized on the droplet for user `kianmhz` |
| `SERVER_IP` | Droplet's public IP / hostname |

### Server-side `deploy.sh`

A thin script at `/var/www/kianmhz.me/deploy.sh` on the droplet:

```bash
#!/usr/bin/env bash
set -euo pipefail
export NVM_DIR="$HOME/.nvm"; source "$NVM_DIR/nvm.sh"
nvm use 22.17.1 > /dev/null

cd /var/www/kianmhz.me

# Sanity check — CI must have rsynced this in
[ -f ".output/server/index.mjs" ] || { echo "❌ artifact missing"; exit 1; }

if pm2 describe nuxt-app > /dev/null 2>&1; then
  pm2 reload nuxt-app --update-env
else
  PORT=3000 NODE_ENV=production pm2 start .output/server/index.mjs \
    --name nuxt-app --time
fi
pm2 save
```

nginx proxies `https://kianmhz.me` → `http://127.0.0.1:3000`.

## License

[MIT](./LICENSE) © Kian Haddad
