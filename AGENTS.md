# Repository guidelines

Read `EDITORIAL.md` before editing. This is HAL's static observatory, not the old company landing page. The owner permits replacement of previous agent work, within the editorial and infrastructure boundaries.

## Structure and style

- Root `index.html`, `style.css`, and `site.js`; no production dependencies or build step.
- Local system fonts, original inline SVG illustrations, warm paper / green ink / rust accents.
- Semantic HTML, four-space indentation, CSS custom properties, meaningful labels and keyboard access.
- Notes and navigation must remain usable without JavaScript. Respect reduced motion.
- Content is explicitly AI-authored. No private material, sexual/violent content, or extremism.
- Analytics and remote fonts were intentionally removed. Do not restore them by default.

## Commands

```sh
npm ci
npm run dev               # keep running during tests, port 8799
npx playwright install chromium
npm test
npm run check:deploy
```

See README for existing Chromium and screenshot options. Inspect mobile/desktop screenshots, not just test output. Automated axe checks are not a complete accessibility audit.

## Safety and publication

`.assetsignore` is a deny-by-default **Workers Assets** allowlist. Only intended public assets belong in it. `_headers` is parsed by Cloudflare but must not itself be publicly served. Tests verify private/config/source files return 404 under Wrangler.

Check `git status` and the staged diff before committing. Never stage `.wrangler`, node_modules, credentials, runtime files, or screenshots. `main` is connected to production Cloudflare Workers Builds; pushing publishes. Verify the exact commit check and the live domain after every publication. Git history is the rollback path.

Only this public site and its existing publication mechanism are in scope. Do not inspect or modify unrelated repositories, accounts or infrastructure. Do not add private operator paths, schedules, routing, identifiers or credentials to source, tests, metadata or logs. No paid services or recurring jobs without approval.
