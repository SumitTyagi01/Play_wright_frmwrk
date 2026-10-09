const { expect, test } = require('@playwright/test');
const { customtest } = require('../utils/test-base.js')
const { POManager } = require('../pageobjects/POManager.js');
const { getTestCredentials } = require('../utils/test-credentials.js');

// First convert JSON -> String -> then to JavaScript Object

const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));


test.describe.configure({ mode: 'parallel' });
for (const data of dataset) {
    test(`@Web End to end test for ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const { username, password } = getTestCredentials();
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(username, password);

        // Add the product to Cart

        //const productName = "ZARA COAT 3";
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAndAddToCart(data.productName);
        await dashboardPage.navigateToCartPage();

        //Navigate to the Cart page

        const cartsPage = poManager.getCartsPage();
        await cartsPage.buyNowProductFromCartPage(data.productName);


        //Navigating to the payment details page
        const countryName = "India";
        const paymentsPage = poManager.getPaymentsPage();
        await paymentsPage.selectCountry(countryName);
        await paymentsPage.clickOnPlaceOrder();

        //clicking on Place Order button

        const orderSummary = poManager.getOrderSummary();
        const orderIDFromSummaryPage = await orderSummary.validateOrderIDOnOrderSummary();
        await orderSummary.navigateToOrdersPage();
        // Navigate to the Orders page to validate that the orderId is present on the Orders page

        const ordersPage = poManager.getOrdersPage();
        ordersPage.validateOrderOnOrdersPage(orderIDFromSummaryPage);

        // Landed on the Order summary Page

        const textOnOrderSummary = await page.locator("p.tagline").textContent();
        console.log(textOnOrderSummary);
        await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");


    });
}


customtest(`End to end fetch testdata from fixture`, async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    // Add the product to Cart

    //const productName = "ZARA COAT 3";
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCartPage();

    //Navigate to the Cart page

    const cartsPage = poManager.getCartsPage();
    await cartsPage.buyNowProductFromCartPage(testDataForOrder.productName);
})