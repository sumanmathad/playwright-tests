const {test,expect} = require('@playwright/test');

test.only('E2E test case for product order', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill("suman.mathad@gmail.com");
    await page.locator("#userPassword").fill("Suman@test1");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    
    const countOfProducts = await page.locator(".card-body").count();
    

    for(let i=0; i<countOfProducts;i++){
        if(await page.locator(".card-body").nth(i).locator("b").textContent()=="zara coat 3");
        {
            await page.locator(".card-body").nth(i).locator("text= Add To Cart").click();
            break;
        }
        
    }
    
    await page.waitForSelector("button[routerlink='/dashboard/cart'] > label");
    expect(await page.locator("button[routerlink='/dashboard/cart'] > label").textContent()).toStrictEqual("1");
    
    await page.locator("button[routerlink*='board/cart']").click();
    await page.waitForLoadState('networkidle');
    
    expect(await page.locator(".cartWrap >li > div > div > h3").textContent()).toEqual("zara coat 3");
    await page.getByText("Checkout").click();

    await page.waitForLoadState('networkidle')
    await page.locator("[placeholder*='Country']").type("India", { delay: 100 })
    const dropdown = page.locator(".list-group")
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count()
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent()
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click()
            break;
        }
    }


    await expect(page.locator(".user__name label[type='text']")).toHaveText("suman.mathad@gmail.com");
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    console.log(await page.locator("label.ng-star-inserted").textContent());
    
});


// --- helpful reusable code snippets---
// await page.pause();
// await page.screenshot({path:'screenshot.png'});
// await page.waitForLoadState('networkidle');