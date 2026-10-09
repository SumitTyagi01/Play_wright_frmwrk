import { expect, test, request } from '@playwright/test';
const { APIUtils } = require('../utils/APIUtils.js');
const { getTestCredentials } = require('../utils/test-credentials.js');

const ordersPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {

    //Login API
    const { username, password } = getTestCredentials();
    const loginPayload = { userEmail: username, userPassword: password };
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(ordersPayload);

})

test('End to end test', async ({ page }) => {

    //The below code inject the token received from the API call directly to the Local storgae in the browser, So login is not required
    await page.addInitScript(value => {
        (
            window.localStorage.setItem('token', value)
        )

    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client");

    // Before clicking on the orders link, the network response interception/mocking should happen, 
    // hence the below code is written before clicking on the Orders button/link.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body,
            })
            //intercepting the response - API response -> {faking response through palywright} ->  browser -> render data on front end
        }
    )

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await page.locator(".mt-4").waitFor();
    const message = await page.locator(".mt-4").textContent();
    console.log(message)
})