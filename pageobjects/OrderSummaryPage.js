class OrderSummaryPage {

    constructor(page) {
        this.page = page;
        this.orderID = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersBtn = this.page.locator("button[routerlink*='myorders']")

    }

    async validateOrderIDOnOrderSummary() {
        await this.orderID.waitFor();
        const orderIDFromUI = await this.orderID.textContent();
        console.log(orderIDFromUI)

        const orderIDformat = orderIDFromUI.split("|");
        const orderID = orderIDformat[1].split("|");
        const orderIDAfterFormatting = orderID[0].trim();
        console.log("Order ID created after placing the Order: " + orderIDAfterFormatting);
        return orderIDAfterFormatting;
    }

    async navigateToOrdersPage() {
        await this.ordersBtn.click();
    }

}

module.exports = { OrderSummaryPage };