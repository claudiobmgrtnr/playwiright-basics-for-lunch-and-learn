const playwright = require("playwright");

(async () => {
  for (const browserType of ['chromium']) {
    // Setup von Playwright
    const browser = await playwright[browserType].launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();

    // Browseranweisungen
    await page.goto('https://www.migros.ch/de.html');
    await page.screenshot({ path: `screenshots/example-${browserType}.png` });
    await browser.close();
  }
})();