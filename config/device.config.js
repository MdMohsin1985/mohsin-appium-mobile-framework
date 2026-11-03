// Appium server and device configuration
// Update these values to match your setup

module.exports = {
    server: {
        hostname: '127.0.0.1',
        port: 4723,
        path: '/'
    },
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Device',
        'appium:udid': 'RZCW11C1GQF',
        'appium:noReset': true
    }
};

