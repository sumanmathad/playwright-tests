const {test,expect,request} = require('@playwright/test');
let token;


test.beforeAll(async()=>{
    const apiContext= await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {data:{userEmail: "suman.mathad@gmail.com", userPassword: "Suman@test1"}});

    expect (loginResponse).toBeOK;
    const loginResponseJSON =  await loginResponse.json();
     token =  loginResponseJSON.token;
    console.log(token);
});


test("login test with API", async({page})=>{    
    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.screenshot({path:'screenshot.png'});

});