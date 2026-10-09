class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = this.page.locator(".card .card-body");
        this.allProducts = this.page.locator(".card .card-body b");
        this.cart = this.page.locator("[routerlink*='cart']")
    }


    async searchProductAndAddToCart(productName) {
        await this.products.first().waitFor();
        const productsCount = await this.products.count();
        console.log(productsCount);

        //loop to iterate over the products and add the product to cart if it is present
        for (let i = 0; i < productsCount; i++) {
            const productAvailable = await this.products.nth(i).locator("b").textContent();
            console.log(productAvailable);
            if (productName === productAvailable) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCartPage() {
        await this.cart.click();
    }

}

module.exports = { DashboardPage };