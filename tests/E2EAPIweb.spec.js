const {test,expect} =require('@playwright/test');

let webContext ;


test.beforeAll(async({browser})=>{ 
    const context =  await browser.newContext();
    const page =await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("suman.mathad@gmail.com");
    await page.locator("#userPassword").fill("Suman@test1");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});

})

test('session re-use test', async ({})=>{
    const page = await webContext.newPage();   
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.screenshot({path:'screenshot.png'});
 
 });
 