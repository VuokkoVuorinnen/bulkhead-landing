/* Run against `npx wrangler dev --port 8799`.
 * npm install --no-save playwright @axe-core/playwright
 * CHROMIUM_PATH=/path/to/chrome node tests/browser.cjs
 * Or install Playwright's Chromium with `npx playwright install chromium`.
 */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.TEST_URL || 'http://127.0.0.1:8799';
const screenshots = process.env.SCREENSHOT_DIR;

(async () => {
    const browser = await chromium.launch({
        headless: true,
        ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
        args: ['--no-sandbox']
    });
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        const errors = [];
        const external = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
        page.on('request', request => { if (new URL(request.url()).origin !== new URL(base).origin) external.push(request.url()); });
        for (const width of [320, 375, 680, 768, 1280, 1920]) {
            await page.setViewportSize({ width, height: 1000 });
            await page.goto(base);
            await page.waitForLoadState('networkidle');
            assert.equal(await page.title(), 'Bulkhead — A small observatory');
            assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
            const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
            assert.deepEqual(accessibility.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `Accessibility violations at ${width}px`);
            if (screenshots && [375, 1280].includes(width)) {
                fs.mkdirSync(screenshots, { recursive: true });
                await page.screenshot({ path: `${screenshots}/bulkhead-${width}.png`, fullPage: true });
            }
            console.log(`PASS ${width}px: no overflow, WCAG A/AA automated checks clear`);
        }
        await page.getByRole('button', { name: 'Offer a little scritch' }).click();
        assert.match(await page.locator('#cat-status').innerText(), /small purr/);
        await page.getByRole('button', { name: 'Another direction' }).click();
        assert.match(await page.locator('#prompt-text').innerText(), /familiar room/);
        // Every internal fragment resolves; published feed links match real entries.
        assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(links => links.map(l => l.hash.slice(1)).filter(id => !document.getElementById(id))), []);
        const feed = await page.request.get(`${base}/feed.xml`);
        assert.equal(feed.status(), 200);
        const feedText = await feed.text();
        assert.match(feedText, /#hal-was-here/);
        assert.match(feedText, /#small-on-purpose/);
        for (const asset of ['/style.css', '/site.js', '/favicon.svg', '/robots.txt']) {
            assert.equal((await page.request.get(base + asset)).status(), 200, asset);
        }
        for (const file of ['/README.md', '/AGENTS.md', '/.git/config', '/wrangler.jsonc', '/tests/browser.cjs', '/automation/schedule.json', '/automation/weekly-session.md', '/cathedral-of-steel.png', '/_headers']) {
            assert.equal((await page.request.get(base + file)).status(), 404, `Private file served: ${file}`);
        }
        const response = await page.request.get(base);
        assert.match(response.headers()['content-security-policy'], /connect-src 'none'/);
        assert.equal(response.headers()['x-content-type-options'], 'nosniff');
        assert.deepEqual(await page.context().cookies(), []);
        assert.deepEqual(external, []);
        assert.deepEqual(errors, []);
        const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
        const staticPage = await noJS.newPage();
        await staticPage.goto(base);
        assert.ok(await staticPage.getByRole('heading', { name: 'HAL was here.' }).isVisible());
        assert.ok(await staticPage.locator('noscript p').isVisible());
        assert.match(await staticPage.locator('noscript p').innerText(), /JavaScript is optional; naps are not/);
        assert.equal(await staticPage.getByRole('button').count(), 0);
        await noJS.close();
        console.log('PASS interactions, fragment links, feed, assets, source exclusions, security headers, no cookies/external requests/console errors, JavaScript-disabled reading');
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
