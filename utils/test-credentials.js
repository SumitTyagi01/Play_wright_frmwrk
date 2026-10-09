function getTestCredentials() {
    const { TEST_USERNAME, TEST_PASSWORD } = process.env;

    if (!TEST_USERNAME || !TEST_PASSWORD) {
        throw new Error('Set TEST_USERNAME and TEST_PASSWORD before running tests that log in.');
    }

    return { username: TEST_USERNAME, password: TEST_PASSWORD };
}

module.exports = { getTestCredentials };
