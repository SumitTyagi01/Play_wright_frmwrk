class CartsPage {

    constructor(page) {
        this.page = page;
        this.productsAtCartPage = this.page.locator(".cartSection");

    }

    async buyNowProductFromCartPage(productName) {

        const countCartPageProducts = await this.productsAtCartPage.count()

        for (let i = 0; i < countCartPageProducts; i++) {
            const getProduct = await this.productsAtCartPage.nth(i).locator("h3").textContent();
            console.log(getProduct);
            if (productName === getProduct) {
                await this.page.locator(".cart .removeWrap").nth(i).getByRole('button', { name: 'Buy Now❯', exact: true }).click();
                break;
            }

        }
    }
}

module.exports = { CartsPage };