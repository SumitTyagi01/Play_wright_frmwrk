const { test, expect, request } = require('@playwright/test');
const { customtest } = require("../utils/Fixtures.js");

customtest("Fixture Demo", async ({ authenticatedPage, createOrder, testDataOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataOrder.productName);
})
