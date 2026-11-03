const { remote } = require('webdriverio');
const config = require('../config/device.config');

// Create and return a WebDriverIO driver session
async function createDriver() {
    const driver = await remote({
        hostname: config.server.hostname,
        port: config.server.port,
        path: config.server.path,
        capabilities: config.capabilities
    });
    return driver;
}

module.exports = { createDriver };

