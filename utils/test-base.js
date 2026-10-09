const base = require('@playwright/test');
const { getTestCredentials } = require('./test-credentials.js');

exports.customtest = base.test.extend({

    testDataForOrder: async ({}, use) => {
        const { username, password } = getTestCredentials();
        await use({
            username,
            password,
            productName: "ZARA COAT 3"
        });
    }
}

)