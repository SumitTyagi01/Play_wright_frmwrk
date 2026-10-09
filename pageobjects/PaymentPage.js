class PaymentPage {

    constructor(page) {
        this.page = page;
        this.country = this.page.locator("input[placeholder='Select Country']");
        this.countryOptions = this.page.locator("section.ta-results button");
        this.placeOrderBtn = this.page.locator(".actions a[class*='btnn']")

    }

    async selectCountry(countryName) {
        await this.country.waitFor();
        await this.country.pressSequentially("Ind", { delay: 200 });

        await this.countryOptions.first().waitFor();
        const countries = await this.countryOptions;
        const totalCountries = await countries.count()
        console.log(totalCountries)

        for (let i = 0; i < totalCountries; i++) {
            const getCountryName = await countries.nth(i).textContent();
            console.log(getCountryName)

            if (getCountryName.trim() === countryName) {
                await countries.nth(i).click();
                break;
            }
        }

    }

    async clickOnPlaceOrder() {
        await this.placeOrderBtn.waitFor();
        await this.placeOrderBtn.click();

    }
}

module.exports = { PaymentPage };