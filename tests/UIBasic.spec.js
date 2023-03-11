const {test, expect} = require('@playwright/test');

/* ---test code for copy---
test('test name', async ({page})=>{
   
});
*/

test('Launch browser and Navigate to test page through default context', async ({page})=>{
   await page.goto('https://the-internet.herokuapp.com/');
});

test('Launch Browser through new browser context',async({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://google.co.in');
   await expect(page).toHaveTitle('Google');
});

test('Login to app and verify the landing page', async({page})=>{
   await page.goto('https://the-internet.herokuapp.com/');
   await expect(page).toHaveTitle('The Internet');
   await page.locator("a[href='/login']").click();
   await page.locator("#username").type("tomsmith");
   await page.locator("#password").type("SuperSecretPassword!");
   await page.locator(".fa").click();
   await expect(page.locator("#content > div > h2")).toContainText("Secure Area");
   
});

test('Web form validation', async ({page})=>{
   await page.goto('https://bonigarcia.dev/selenium-webdriver-java/');
   await page.getByText('Web form').click();
   await page.locator("[name='my-select']").selectOption("3");
});

test('child window handling', async ({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://the-internet.herokuapp.com/');
   await page.getByText('Multiple Windows').click();
   const clickme = page.getByText("Click Here");
   
   const [newPage] = await Promise.all(
      [
         context.waitForEvent('page'),
         clickme.click(),
      ]
   )
     const text = await newPage.locator("div.example > h3").textContent();
    console.log(text);

});

//#my-options > option[value='Chicago']
// --- Multiple elements ---
//  // console.log(await page.locator(".card-body>a").nth(0).textContent());
   //const a = await page.locator(".card-body>a").allTextContents();
   //console.log(a)
/* --- datalist dropdown ---
   await page.locator("#my-options > option[value='Chicago']").click();
await page.pause(); 
*/