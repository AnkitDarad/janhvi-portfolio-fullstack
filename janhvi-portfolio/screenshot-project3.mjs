#!/usr/bin/env node
/**
 * Screenshot script for /project/3 (Curated Art Marketplace - ProjectDetailType4)
 * Captures: Hero, Project Overview, Tabs, Design Direction, Primary User Flow
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://127.0.0.1:3000';
const OUTPUT_DIR = join(process.cwd(), 'screenshots-project3');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();
  const consoleLogs = [];
  const errors = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') errors.push(text);
  });

  try {
    // 1. Set auth in localStorage before loading (bypass login)
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.evaluate(() => localStorage.setItem('isAuthenticated', 'true'));

    // 2. Navigate to project 3 (will now show authenticated content)
    await page.goto(`${BASE_URL}/project/3`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForSelector('.cs4-page', { timeout: 10000 });
    await page.waitForTimeout(500);

    // Create output dir
    try {
      const { mkdirSync } = await import('fs');
      mkdirSync(OUTPUT_DIR, { recursive: true });
    } catch (_) {}

    // 3. Screenshot 1: Hero section (top of page)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(OUTPUT_DIR, '1-hero-section.png'), fullPage: false });
    console.log('✓ Captured: 1-hero-section.png');

    // 4. Screenshot 2: Project Overview section
    const overviewSection = page.locator('.cs4-overview-section');
    await overviewSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(OUTPUT_DIR, '2-project-overview.png'), fullPage: false });
    console.log('✓ Captured: 2-project-overview.png');

    // 5. Screenshot 3: Tabs section (The Gap in Art Platforms - default)
    const tabsSection = page.locator('.cs4-tabs-section');
    await tabsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(OUTPUT_DIR, '3-tabs-default.png'), fullPage: false });
    console.log('✓ Captured: 3-tabs-default.png');

    // 6. Click each tab and capture
    const tabButtons = page.locator('.cs4-tab-button');
    const tabCount = await tabButtons.count();
    for (let i = 0; i < tabCount; i++) {
      await tabButtons.nth(i).click();
      await page.waitForTimeout(200);
      await page.screenshot({ path: join(OUTPUT_DIR, `3-tabs-tab${i}.png`), fullPage: false });
      console.log(`✓ Captured: 3-tabs-tab${i}.png`);
    }

    // 7. Screenshot 4: Design Direction section
    const designSection = page.locator('.cs4-design-direction');
    await designSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(OUTPUT_DIR, '4-design-direction.png'), fullPage: false });
    console.log('✓ Captured: 4-design-direction.png');

    // 8. Screenshot 5: Primary User Flow section
    const userflowSection = page.locator('.cs4-userflow-section');
    await userflowSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(OUTPUT_DIR, '5-primary-userflow.png'), fullPage: false });
    console.log('✓ Captured: 5-primary-userflow.png');

    // 9. Full page screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.screenshot({ path: join(OUTPUT_DIR, '0-full-page.png'), fullPage: true });
    console.log('✓ Captured: 0-full-page.png');

    // Write console/error report
    const report = {
      pageLoaded: true,
      consoleErrors: errors,
      allConsoleLogs: consoleLogs.filter((l) => l.type === 'error'),
    };
    writeFileSync(join(OUTPUT_DIR, 'report.json'), JSON.stringify(report, null, 2));
    console.log('\nScreenshots saved to:', OUTPUT_DIR);
    if (errors.length) console.log('Console errors:', errors);
  } catch (err) {
    console.error('Error:', err.message);
    await page.screenshot({ path: join(OUTPUT_DIR || '.', 'error-state.png') }).catch(() => {});
  } finally {
    await browser.close();
  }
}

main();
