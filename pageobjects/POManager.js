const { LoginPage } = require('../pageobjects/LoginPage.js');
const { DashboardPage } = require('../pageobjects/DashboardPage.js')
const { CartsPage } = require('../pageobjects/CartsPage.js')
const { PaymentPage } = require('../pageobjects/PaymentPage.js');
const { OrdersPage } = require('../pageobjects/OrdersPage.js');
const { OrderSummaryPage } = require('../pageobjects/OrderSummaryPage.js');

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartsPage = new CartsPage(this.page);
        this.paymentsPage = new PaymentPage(this.page);
        this.orderSummary = new OrderSummaryPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartsPage() {
        return this.cartsPage;
    }
    getPaymentsPage() {
        return this.paymentsPage;
    }

    getOrderSummary() {
        return this.orderSummary;
    }

    getOrdersPage() {
        return this.ordersPage;
    }

}
module.exports = { POManager };