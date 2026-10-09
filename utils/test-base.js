const base = require('@playwright/test');
const { getTestCredentials } = require('./test-credentials.js');

exports.customtest = base.test.extend({

    testDataForOrder: async ({}, use, workerInfo) => {
        const { username, password } = getTestCredentials(workerInfo.project.name);
        await use({
            username,
            password,
            productName: "ZARA COAT 3"
        });
    }
}

)