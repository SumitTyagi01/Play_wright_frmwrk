const base = require('@playwright/test');
const { APIUtils } = require("../utils/APIUtils.js")
const { request } = require('@playwright/test')
const { getTestCredentials } = require("./test-credentials.js")

const ordersPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {

            const { username, password } = getTestCredentials();
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator('#userEmail').fill(username)
            await page.locator('#userPassword').fill(password)
            await page.locator('input#login').click()
            await page.waitForLoadState('networkidle')
            await use(page);

            //teardown
            await context.close();

        },

        createOrder: async ({ }, use) => {
            //Login API
            const { username, password } = getTestCredentials();
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, { userEmail: username, userPassword: password });
            const response = await apiUtils.createOrder(ordersPayload);
            await use(response);

            //teardown
            await apiContext.dispose()

        },

        testDataOrder: {
            productName: "Adidas Original"
        }
    }

)