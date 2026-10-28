# Volcanic Ash & the Respiratory System

An educational microsite by *the other cavaliers* showing respiratory anatomy and
how volcanic ash can affect breathing, with interactive anatomical hotspots.

This is a pnpm workspace that runs **both on Replit and on GitHub** — neither
setup replaces the other.

## Packages

| Path | What it is |
| --- | --- |
| `artifacts/volcanic-ash-anatomy` | **The site.** Vite + React + Tailwind, fully static. |
| `artifacts/mockup-sandbox` | Design/component preview sandbox (a tool, not part of the site). |
| `artifacts/api-server` | Express 5 API scaffolding. Unused by the site; needs Postgres. |
| `lib/*` | DB (Drizzle), Zod schemas, OpenAPI spec, generated API client. |

## Running locally

Requires Node 24 and pnpm 10.

```sh
pnpm install
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/volcanic-ash-anatomy run dev
```

Both Vite configs **throw unless `PORT` and `BASE_PATH` are set** — on Replit
these come from `.replit-artifact/artifact.toml`.

> Note: `pnpm-workspace.yaml` strips every esbuild/rollup/lightningcss binary
> except `linux-x64`, so installs and builds expect Linux. On Windows or macOS
> you'll need to drop those `overrides` locally (don't commit that).

## GitHub

- **`.github/workflows/ci.yml`** — typechecks and builds every package on each
  push and pull request.
- **`.github/workflows/deploy-pages.yml`** — builds the site and publishes it to
  GitHub Pages on every push to `main`.

To turn Pages on: **Settings → Pages → Build and deployment → Source: GitHub
Actions**. The workflow derives the correct `BASE_PATH` from the repo name, so
assets resolve whether the site is served from `/<repo>/` or a custom domain.

This is a one-time manual step and the workflow cannot do it for you.
`actions/configure-pages` accepts an `enablement` parameter, but creating a
Pages site needs admin scope that `GITHUB_TOKEN` is never granted, so it fails
with "Resource not accessible by integration". Until Pages is switched on, the
deploy fails at `configure-pages` with "Get Pages site failed".

Only the static site is deployed to Pages. The API server and Postgres can't run
there — keep those on Replit (or another host) if you start using them.

## Replit

`.replit`, `.replitignore` and the `.replit-artifact/artifact.toml` files are
unchanged and still drive Replit's dev and deploy flows. See `replit.md`.
