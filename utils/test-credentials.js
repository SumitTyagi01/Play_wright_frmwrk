function getTestAccounts() {
    const configuredAccounts = process.env.TEST_ACCOUNTS;

    if (!configuredAccounts) {
        return null;
    }

    let accounts;
    try {
        accounts = JSON.parse(configuredAccounts);
    } catch (error) {
        throw new Error('TEST_ACCOUNTS must be a valid JSON array.', { cause: error });
    }

    if (!Array.isArray(accounts) || accounts.length === 0) {
        throw new Error('TEST_ACCOUNTS must contain at least one account.');
    }

    const names = new Set();
    for (const [index, account] of accounts.entries()) {
        if (
            !account ||
            typeof account.name !== 'string' ||
            !account.name.trim() ||
            typeof account.username !== 'string' ||
            !account.username ||
            typeof account.password !== 'string' ||
            !account.password
        ) {
            throw new Error(`TEST_ACCOUNTS entry ${index + 1} must have a name, username, and password.`);
        }

        if (names.has(account.name)) {
            throw new Error(`TEST_ACCOUNTS account names must be unique: "${account.name}".`);
        }
        names.add(account.name);
    }

    return accounts;
}

function getTestAccountNames() {
    return getTestAccounts()?.map(({ name }) => name) ?? ['default'];
}

function getTestCredentials(projectName = 'default') {
    const accounts = getTestAccounts();
    if (accounts) {
        const account = accounts.find(({ name }) => name === projectName);
        if (!account) {
            throw new Error(`No test account is configured for Playwright project "${projectName}".`);
        }
        return { username: account.username, password: account.password };
    }

    const { TEST_USERNAME, TEST_PASSWORD } = process.env;

    if (!TEST_USERNAME || !TEST_PASSWORD) {
        throw new Error('Set TEST_USERNAME and TEST_PASSWORD before running tests that log in.');
    }

    return { username: TEST_USERNAME, password: TEST_PASSWORD };
}

module.exports = { getTestAccountNames, getTestCredentials };
