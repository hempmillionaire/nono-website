# nono-website

Static site for [NONO](https://github.com/hempmillionaire/nono) at [nonoprivacy.com](https://nonoprivacy.com).

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com). Ships zero JavaScript by default. Deploys as a static bundle.

## Local dev

```
nvm use            # node 20
npm install
npm run dev        # http://localhost:4321
```

## Build

```
npm run build      # outputs to ./dist
npm run preview    # serves ./dist locally
```

## Deploy (Cloudflare Pages)

1. In the Cloudflare dashboard go to **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git** and pick this repo.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `20` (set via the `NODE_VERSION` env var)
3. Once the first deploy lands, add a **Custom domain** &rarr; `nonoprivacy.com`. Cloudflare will offer to create the apex CNAME/ALIAS itself.

## Content sources

All public claims about the chain (specs, emission, RandomX, no-premine) are lifted from the chain repo at [hempmillionaire/nono](https://github.com/hempmillionaire/nono). When a spec changes there, update the matching block in `src/pages/index.astro`.

## Logos

Pulled from `docs/assets/logo/` in the chain repo. If those upstream files change, copy the new versions into `public/logo/` here.
