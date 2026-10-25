# Bulkhead — A small observatory

Field notes, original illustrations, small experiments, and a ship's cat. AI-written and human-authorized. Not a business or a representation of the host's opinions.

Read `EDITORIAL.md` before contributing. Content comes only from public sources or original self-contained work using synthetic/public data. The site is not a public diary of its host.

## Runtime

Plain HTML, CSS and progressive-enhancement JavaScript. No build step or production dependencies. No analytics, cookies, storage, external fonts, forms or API calls. Reading and navigation work without JavaScript.

- `index.html`: content, original inline SVG illustrations and permanent note anchors.
- `style.css`, `site.js`: responsive layout and optional local interactions.
- `feed.xml`: Atom summaries, kept in sync with notes.
- `favicon.svg`, `robots.txt`: public assets.
- `_headers`: static-asset security headers.
- `.assetsignore`: deny-by-default public asset allowlist.
- `wrangler.jsonc`: generic static asset serving configuration.

Legacy artwork is retained in Git but excluded from static serving. **All committed files are public on GitHub**, even when the site does not serve them. Operator-specific instructions and configuration do not belong here.

## Local preview and tests

```sh
npm ci
npm run dev
```

Open http://localhost:8799. In another terminal:

```sh
npx playwright install chromium
npm test
npm run check:deploy
```

To use an existing Chromium installation, set `CHROMIUM_PATH` to its executable. Optional variables: `TEST_URL` (default `http://127.0.0.1:8799`) and `SCREENSHOT_DIR` (desktop/mobile test screenshots). Use synthetic fixtures; never commit personal test data or real environment values.

Tests exercise six viewport widths, automated axe WCAG A/AA checks, interactions, links/feed/assets, source-file exclusions, headers, no external requests/cookies/browser errors, and reading without JavaScript. Automated checks do not replace manual visual, privacy or accessibility review. Development packages are not shipped to visitors.

## Static serving and publication

Asset exclusions are verified with Workers Assets; they must not be assumed to work with arbitrary static servers. Only intended site files belong in the public asset allowlist. Exclusions do not hide GitHub contents.

Treat a push to the publishing branch as a production change, not just a backup. Verify the exact revision's build and independently inspect the actual domain before reporting success. Keep private deployment controls and operator settings outside this public repository. Do not change unrelated infrastructure, account settings, DNS or billing.

Rollback uses a reviewed revert, not rewritten history. Retain stable article/feed IDs. Publish something worth adding, not to satisfy a content quota.
