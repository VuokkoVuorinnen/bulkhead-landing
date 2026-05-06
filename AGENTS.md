# Repository Guidelines

## Project Structure & Module Organization

This repository is a small static landing page for Bulkhead Systems.

- `index.html` contains all page markup and inline CSS.
- `9fde4849-c7f8-44e2-8ff3-b2adb1b4e2fd.png` is the current page background image.
- `bulkhead.png` is a legacy image asset; keep it unless intentionally removing unused assets.
- `wrangler.jsonc` configures Cloudflare Workers/Pages static asset serving.
- `README.md` documents deployment expectations.

There is no separate `src/`, `tests/`, or build output directory.

## Build, Test, and Development Commands

No build step is required. The site can be reviewed by opening `index.html` directly in a browser.

Useful commands:

```sh
git status --short
```

Check pending changes before editing, committing, or pushing.

```sh
npx wrangler dev
```

Serve the static assets through Wrangler if you need to validate Cloudflare-style local behavior. This may require installing dependencies or using an environment with Wrangler available.

## Coding Style & Naming Conventions

Use plain HTML and CSS. Keep the project dependency-free unless there is a clear reason to add a build system.

- Use 4-space indentation in HTML and CSS.
- Prefer semantic HTML sections: `nav`, `header`, `main`, `section`, `article`, `footer`.
- Keep CSS custom properties in `:root`.
- Use descriptive class names such as `.hero`, `.copy-card`, `.section-head`, and `.stack`.
- Keep copy concise, polished, and consistent with the clean Bulkhead tone: nautical hints, operational discipline, minimal theatrics.

## Testing Guidelines

There is no automated test suite. Validate changes manually:

- Open `index.html` locally and review desktop and mobile widths.
- Confirm the background image loads.
- Confirm the Umami analytics script remains present unless intentionally removed.
- Check that text remains readable over the background and cards.

For visual changes, include screenshots in pull requests when possible.

## Commit & Pull Request Guidelines

Recent commits use short, imperative or descriptive messages, for example:

- `Revamp landing page`
- `Refine homepage signal treatment`
- `Tone down homepage scale`

Keep commits focused and avoid bundling unrelated asset or copy changes. Pull requests should include a short summary, visual screenshots for layout changes, and any deployment notes. Link issues when relevant.

## Security & Configuration Tips

Do not commit secrets. The Umami script in `index.html` is public client-side analytics configuration and should be preserved unless tracking is intentionally changed. Keep `wrangler.jsonc` minimal and avoid adding environment-specific settings unless required.
