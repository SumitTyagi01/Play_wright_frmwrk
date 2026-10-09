const { expect, test } = require('@playwright/test');
const { clear } = require('node:console');
const { getTestCredentials } = require('../utils/test-credentials.js');


let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const { username, password } = getTestCredentials();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(username)
    await page.locator('#userPassword').fill(password)
    await page.locator('input#login').click()
    await page.waitForLoadState('networkidle')
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })

})

test('Test case through storage state', async () => {

    // Add the product to Cart

    const productName = "ZARA COAT 3";

    const page = await webContext.newPage(); // This is now the new page with the storage state information
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card .card-body");
    await page.locator(".card .card-body").first().waitFor();
    const productsCount = await products.count();
    console.log(productsCount);

    //loop to iterate over the products and add the product to cart if it is present
    for (let i = 0; i < productsCount; i++) {
        const productAvailable = await products.nth(i).locator("b").textContent();

        if (productName === productAvailable) {
            await products.nth(i).locator("text= Add To Cart").click()
            break;
        }
    }


    //Navigate to the Cart page

    await page.locator("[routerlink*='cart']").waitFor({ state: 'visible', timeout: '3000' });
    await page.locator("[routerlink*='cart']").click();

    const productsAtCartPage = await page.locator(".cartSection");
    const countCartPageProducts = await productsAtCartPage.count()

    for (let i = 0; i < countCartPageProducts; i++) {
        const getProduct = await productsAtCartPage.nth(i).locator("h3").textContent();
        console.log(getProduct);
        if (productName === getProduct) {
            await page.locator(".cart .removeWrap").nth(i).getByRole('button', { name: 'Buy Now❯', exact: true }).click()
            break;
        }

    }

    //Navigating to the payment details page

    await page.locator("input[placeholder='Select Country']").waitFor();
    await page.locator("input[placeholder='Select Country']").pressSequentially("Ind", { delay: 200 });

    await await page.locator("section.ta-results button").first().waitFor();
    const countries = await page.locator("section.ta-results button")
    const totalCountries = await countries.count()
    console.log(totalCountries)

    for (let i = 0; i < totalCountries; i++) {
        const getCountryName = await countries.nth(i).textContent();
        console.log(getCountryName)

        if (getCountryName.trim() === "India") {
            await countries.nth(i).click();
            break;
        }
    }

    //clicking on Place Order button

    await page.locator(".actions a[class*='btnn']").waitFor();
    await page.locator(".actions a[class*='btnn']").click();

    await page.locator(".em-spacer-1 .ng-star-inserted").waitFor();
    const orderIDFromUI = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderIDFromUI)

    const orderIDformat = orderIDFromUI.split("|");
    const orderID = orderIDformat[1].split("|");
    const orderIDAfterFormatting = orderID[0].trim();
    console.log("Order ID created after placing the Order: " + orderIDAfterFormatting);

    // Navigate to the Orders page to validate that the orderId is present on the Orders page

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator(".table-bordered .ng-star-inserted th").first().waitFor();
    const allOrderIds = await page.locator(".table-bordered .ng-star-inserted th");
    const countOfAllOrderIDs = await allOrderIds.count();
    console.log("Total OrderIds present on the Orders page " + countOfAllOrderIDs);

    for (let i = 0; i < countOfAllOrderIDs; i++) {
        const OrderIdReceived = await allOrderIds.nth(i).textContent();
        console.log("Order ID received from UI: " + OrderIdReceived);
        if (OrderIdReceived === orderIDAfterFormatting) {

            await expect(OrderIdReceived.includes(orderIDAfterFormatting)).toBeTruthy();
            await page.locator(".table-bordered .ng-star-inserted").nth(i).getByRole('button', { name: 'View' }).click();
            break;
        }

    }

    // Landed on the Order summary Page

    const textOnOrderSummary = await page.locator("p.tagline").textContent();
    console.log(textOnOrderSummary);
    await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");


})


test('Test case two', async () => {

    // Add the product to Cart

    const productName = "ZARA COAT 3";

    const page = await webContext.newPage(); // This is now the new page with the storage state information
    await page.goto("https://rahulshettyacademy.com/client");

    const products = page.locator(".card .card-body");
    await page.locator(".card .card-body").first().waitFor();
    const allProducts = await page.locator(".card .card-body b").allTextContents();
    console.log(allProducts)
    const productsCount = await products.count();
    console.log(productsCount);

})
