class OrdersPage {

    constructor(page) {
        this.page = page;
        this.yourOrders = this.page.locator(".table-bordered .ng-star-inserted th");


    }

    async validateOrderOnOrdersPage(orderIDFromSummaryPage) {
        await this.yourOrders.first().waitFor();
        const allOrderIds = await this.yourOrders;
        const countOfAllOrderIDs = await allOrderIds.count();
        console.log("Total OrderIds present on the Orders page " + countOfAllOrderIDs);

        for (let i = 0; i < countOfAllOrderIDs; i++) {
            const OrderIdReceived = await allOrderIds.nth(i).textContent();
            console.log("Order ID received from UI: " + OrderIdReceived);
            if (OrderIdReceived === orderIDFromSummaryPage) {

                //  await expect(OrderIdReceived.includes(orderIDFromSummaryPage)).toBeTruthy();
                await this.page.locator(".table-bordered .ng-star-inserted").nth(i).getByRole('button', { name: 'View' }).click();
                break;
            }

        }
    }
}

module.exports = { OrdersPage };