const {test} = require('@playwright/test');

test('Launch browser and Navigate to test page', async ({browser, page})=>{
   // const context= await browser.newContext();
   // const page = await context.newPage();
   await page.goto('https://the-internet.herokuapp.com/');
});

