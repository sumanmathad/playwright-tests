const {test, expect} = require('@playwright/test');

test('Launch browser and Navigate to test page through default context', async ({page})=>{
   await page.goto('https://the-internet.herokuapp.com/');
});

test('Launch Browser through new browser context',async({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();

   await page.goto('https://google.co.in');
   await expect(page).toHaveTitle('Google');
});

test.only('Login to app and verify the landing page', async({page})=>{
   await page.goto('https://the-internet.herokuapp.com/');
   await expect(page).toHaveTitle('The Internet');
   await page.locator("a[href='/login']").click();
   await page.locator("#username").type("tomsmith");
   await page.locator("#password").type("SuperSecretPassword!");
   await page.locator(".fa").click();
   await expect(page.locator("#content > div > h2")).toContainText("Secure Area");
   
});



