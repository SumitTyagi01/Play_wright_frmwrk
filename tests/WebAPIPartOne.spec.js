import { expect, test, request } from '@playwright/test';
const { APIUtils } = require('../utils/APIUtils');
const { getTestCredentials } = require('../utils/test-credentials.js');

const ordersPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let response;

test.beforeAll(async () => {

    //Login API
    const { username, password } = getTestCredentials();
    const loginPayload = { userEmail: username, userPassword: password };
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(ordersPayload);

})

test('@API End to end test', async ({ page }) => {

    //The below code inject the token received from the API call directly to the Local storgae in the browser, So login is not required
    await page.addInitScript(value => {
        (
            window.localStorage.setItem('token', value)
        )

    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client");

    // Navigate to the Orders page to validate that the orderId is present on the Orders page

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator(".table-bordered .ng-star-inserted th").first().waitFor();
    const allOrderIds = await page.locator(".table-bordered .ng-star-inserted th");
    const countOfAllOrderIDs = await allOrderIds.count();
    console.log("Total OrderIds present on the Orders page " + countOfAllOrderIDs);

    for (let i = 0; i < countOfAllOrderIDs; i++) {
        const OrderIdReceived = await allOrderIds.nth(i).textContent();
        console.log("Order ID received from UI: " + OrderIdReceived);
        if (OrderIdReceived === response.orderId) {

            await expect(OrderIdReceived.includes(response.orderId)).toBeTruthy();
            await page.locator(".table-bordered .ng-star-inserted").nth(i).getByRole('button', { name: 'View' }).click();
            break;
        }

    }

    // Landed on the Order summary Page

    const textOnOrderSummary = await page.locator("p.tagline").textContent();
    console.log(textOnOrderSummary);
    await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");

})