const playwright = require("playwright");
require('dotenv').config();


(async () => {
  for (const browserType of ['chromium']) {
    // Setup von Playwright
    const browser = await playwright[browserType].launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();


    // Öffne migros.ch
    await page.goto('https://www.migros.ch/de.html');
    await page.waitForLoadState('networkidle');

    // Login via migros login
    await page.click('.ui-js-profile');
    await page.click('[name="username"]');
    await page.keyboard.type(process.env.M_LOGINUSER);
    await page.click('[name="password"]');
    await page.keyboard.type(process.env.M_LOGINPW);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    // Suche nach Ice Tea Lemon
    await page.click('.js-search-button');
    await page.keyboard.type('ice tea lemon');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    // Füge den Ice Tea zum Warenkorb hinzu
    await page.click('[data-testid="msrc-articles--article"] .mui-shoppinglist-button-add');
    await page.click('.mui-button-shoppinglist');
    
    // Kurz warten, dass alle sehen was passiert ist 🚀
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `screenshots/example-ice-tea.png` });
    await browser.close();
  }
})();