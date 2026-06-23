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

## Deploy (Cloudflare Workers, static assets)

This site deploys as a Cloudflare Worker serving static assets, configured by `wrangler.toml`. The build runs through Cloudflare's [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) CI, triggered on every push to this repo.

In the Cloudflare dashboard, under **Workers & Pages** &rarr; **nono-website** &rarr; **Settings** &rarr; **Build**, confirm:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (default)
- Build output directory: `dist` (matches the `[assets] directory` in `wrangler.toml`)
- Node version: `20` (set via `NODE_VERSION` env var)
- Root directory: leave blank

After the first successful deploy, add a **Custom domain** &rarr; `nonoprivacy.com` on the Worker. Cloudflare creates the CNAME automatically since the zone is already in your account.

## Content sources

All public claims about the chain (specs, emission, RandomX, no-premine) are lifted from the chain repo at [hempmillionaire/nono](https://github.com/hempmillionaire/nono). When a spec changes there, update the matching block in `src/pages/index.astro`.

## Logos

Pulled from `docs/assets/logo/` in the chain repo. If those upstream files change, copy the new versions into `public/logo/` here.
