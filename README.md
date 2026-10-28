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
- **`.github/workflows/deploy-pages.yml`** — builds the site and force-pushes it to
  the `gh-pages` branch on every push to `main`.

To serve that branch: **Settings → Pages → Build and deployment →
Source: Deploy from a branch**, then choose `gh-pages` and `/ (root)`.

`BASE_PATH` is derived from the repo name at build time, so assets resolve
whether the site is served from `/<repo>/` or a custom domain.

Publishing this way needs only `contents: write`. The Pages-native actions were
tried first and cannot work here: `actions/configure-pages` fails with "Get
Pages site failed" until Pages is enabled, and its `enablement` parameter
cannot enable it either, because creating a Pages site requires admin scope
that `GITHUB_TOKEN` is never granted.

Only the static site is deployed to Pages. The API server and Postgres can't run
there — keep those on Replit (or another host) if you start using them.

## Replit

`.replit`, `.replitignore` and the `.replit-artifact/artifact.toml` files are
unchanged and still drive Replit's dev and deploy flows. See `replit.md`.
