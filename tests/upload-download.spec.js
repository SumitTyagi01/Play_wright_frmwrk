const { test, expect } = require('@playwright/test')

const ExcelJs = require('exceljs');
const { clear, log } = require('node:console');

// In the below code we are updating the value of "Mango" price value from 299 to 350 in the excel
async function writeExcelTest(searchText, textTobeReplaced, change, filePath) {



    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, (output.column + change.colChange));
    cell.value = textTobeReplaced;
    await workbook.xlsx.writeFile(filePath)
}


async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };

    await worksheet.eachRow((row, rownumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(rownumber, colNumber);
                output.row = rownumber;
                output.column = colNumber;
            }

        })
    })
    return output;

}

//writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "C:\\Users\\Sumit\\Downloads\\excelDownloadTest.xlsx");


test('Upload download excel validation', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
    const downloadPromise = page.waitForEvent('download', { timeout: 5000 });
    await page.locator('#downloadButton').click();
    await downloadPromise;
    await page.waitForTimeout(6000);
    await writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "C:\\Users\\Sumit\\Downloads\\download.xlsx");
    await page.locator("#fileinput").click();

    //The below method setInputFiles only works when the attribute type=file is present in DOM for that locator
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Sumit\\Downloads\\download.xlsx");
    await page.waitForTimeout(4000);

    const rowCount = await page.locator("[role='row']")
    const cellCount = await page.locator("[role='cell']")
    let rowFound;
    let colFound;
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < cellCount; j++) {
            if (rowCount.nth[i] && cellCount.nth[j] === "Mango") {
                rowFound = rowCount.nth[i];
                console.log(rowCount.nth[i]);
                colFound = cellCount.nth[j];
                console.log(cellCount.nth[j]);

            }
        }

    }

    const value = await rowCount.nth(rowFound).locator("[role='cell']").nth(colFound).textContent();
    console.log(value);

})