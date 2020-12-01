const playwright = require("playwright");

(async () => {
  for (const browserType of ['webkit']) {
    const browser = await playwright[browserType].launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.migros.ch/fr.html');
    await page.screenshot({ path: `screenshots/example-${browserType}.png` });
    await browser.close();
  }
})();