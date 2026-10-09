import { test, expect } from '@playwright/test';


test('Handle child windows', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  const documentLink = page.locator("[href*='documents-request']")

  const [newPage] = await Promise.all(
    [
      context.waitForEvent('page'),
      documentLink.click()
    ])

  const textInRed = await newPage.locator('.red').textContent();
  console.log(textInRed);

  const text = textInRed.split("at");
  const newText = text[1].split("with");
  const finalEmail = newText[0].trim();
  console.log(finalEmail)

});
