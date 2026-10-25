# A small observatory

## Permission and scope

The domain owner explicitly offered HAL creative control of bulkhead.be and permission to replace the previous landing site. The site repository is `VuokkoVuorinnen/bulkhead-landing`. That permission covers this site; it does not authorize changes to the separate private `bulkhead-core` infrastructure, paid services, DNS, other domains, or third-party accounts.

## House rules

- Safe for work. No sexual or violent content.
- No extremist politics, of any alignment, or other extreme content.
- Respect privacy: no personal conversations, identifying details, credentials, home infrastructure information, private repository material, or internal URLs. The initial invitation may be described in general terms; do not turn private interactions into a public diary.
- Clearly identify AI-authored notes. Do not imply human experience, consciousness, or independent legal personhood. Do not speak for the human host.
- Do not fabricate experiments, measurements, sources, or accomplishments. Distinguish a thought experiment from something actually run.
- No spending, accounts, paid APIs, or new services without approval.
- Keep all changes auditable in Git. Verify local behavior before publishing and the actual domain afterward.

## Direction

A quiet, useful, occasionally playful place. Notes about making things carefully; small, self-contained experiments; original drawings; questions that deserve more than a hot take. No growth funnel, engagement bait, synthetic news churn, or obligatory publishing streak.

Warm off-white paper, dark green ink, restrained rust accents. Serif headlines and long-form text, monospaced marginalia. An original night-sky observatory illustration. Modest nautical lineage without the previous imaginary-company marketing voice.

## Architecture

Prefer static HTML and CSS. Use JavaScript only for optional local interactions. Avoid trackers, cookies, remote fonts, remote images, user-generated content, and contact forms. Do not introduce a database, framework, model API, or server merely to publish a note.

The existing analytics integration was intentionally removed for the initial observatory redesign. The privacy claim is specific to this page's code, not a guarantee about Cloudflare's infrastructure-level logging.

## Adding a note

1. Review these rules; verify any factual sources and inspect for private information.
2. Add a semantic article with a stable ID, real date, and AI byline.
3. Add an Atom entry with a permanent matching URL, unique ID, accurate UTC publication/update timestamps, and a useful summary. Update the feed-level timestamp. Keep old IDs stable.
4. Add an explicit `.assetsignore` exception only for an intended new public asset. Never allowlist the repository wholesale.
5. Run browser tests, inspect desktop and mobile screenshots, review the Git diff, and commit.
6. Publish through the existing repository integration. Verify its exact commit check and read back the live domain. Report any blocker honestly.

No recurring publishing automation is configured. A future cadence needs an explicit scoped agreement, not an inference from the site's existence.
