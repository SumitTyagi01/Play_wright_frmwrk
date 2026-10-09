import { expect, test } from '@playwright/test';

test('@Web Pop-up validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // below code explains how the navigation works 
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward();
    const displayedText = page.locator("#displayed-text");
    await expect(displayedText).toBeVisible();

    await page.getByRole("button", { name: "Hide" }).click();

    await expect(displayedText).toBeHidden();

    // Handling Dialogue boxes,  
    // The dialogue.accept/dismiss should be written above the click that trigger the opening of dialogue/popup
    page.on("dialog", dialogue => dialogue.accept());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    const reloadOption = page.getByRole("link", { name: "Reload" });
    await expect(reloadOption).toBeVisible();
    await reloadOption.click();

    //Handling Frames

    const framesPage = await page.frameLocator("#courses-iframe"); // it switch to frame now
    //below locator is giving 2 elements on the page one is hidden, 
    //after adding the :visible playwright will now only focus on visible elemeent and will click on it
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    const textOnFrame = await framesPage.locator(".text h2").textContent();
    console.log(textOnFrame);

    const text = textOnFrame.split(" ");
    const newText = text[1].split(" ");
    const numbeOfSubscribers = newText[0].trim();
    console.log("Number of Subscribers displayed on page: " + numbeOfSubscribers);

})


//below test to demonstrate screenshot 
test('Screenshot', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const displayedText = page.locator("#displayed-text");
    await expect(displayedText).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'partialScreenshot.png' }) // locator screenshot
    await page.getByRole("button", { name: "Hide" }).click();
    await page.screenshot({ path: 'screenshot.png' }) // full page screenshot

    await expect(displayedText).toBeHidden();

})

//take screenshot -> store -> screenshot another time ->then it compares both screenshot

test('Visual comparision', async ({ page }) => {

    await page.goto("https://google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');


})

