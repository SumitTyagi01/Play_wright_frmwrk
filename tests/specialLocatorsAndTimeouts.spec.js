import { expect, test } from '@playwright/test';

test('Different Locators', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();

    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    const value = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    console.log(value)

    // 5 seconds is the default timeout for expect assertions but we are overriding it with 10 seconds 
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({ timeout: 10_000 });

    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole("button").click();


})


test('Playwright test level timeout demo', async ({ page }) => {

    test.setTimeout(60000) // this is test level timeout however in playwright.config.ts field timout is 30 seconds but now this test will wait for 60 seconds
    const slowExpect = expect.configure({ timeout: 10000 }) // this timeout is expect level timeout

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();

    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", { name: 'Submit' }).click();
    const value = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    console.log(value)

    // 5 seconds is the default timeout for expect assertions but we are now using test configured timeout 
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link", { name: 'Shop' }).click({ timeout: 9000 }); // this is step level action timeout 
    //first Global level -> Test level -> Step level
    //await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

    await slowExpect(page.locator('.my-4').first()).toHaveText("Shop Name");

})