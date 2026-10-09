const { test, expect } = require('@playwright/test');
const { getTestCredentials } = require('../utils/test-credentials.js');

//This request mocking can be used for security testing, when a user should only
// view the orders which he has created, not the ones which are not created by user


test('Network Intercept request call for security testing', async ({ page }) => {

    // login and reach orders page

    const { username, password } = getTestCredentials();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(username)
    await page.locator('#userPassword').fill(password)
    await page.locator('input#login').click()
    await page.waitForLoadState('networkidle')

    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=654488374893" }));


    await page.locator("button:has-text('View')").first().waitFor();
    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})