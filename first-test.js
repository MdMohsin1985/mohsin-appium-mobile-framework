const { remote } = require('webdriverio');

async function main() {
    const driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        path: '/',
        capabilities: {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'Android Device',
            'appium:udid': 'RZCW11C1GQF',
            'appium:noReset': true
        }
    });

    // Open Settings
    await driver.execute('mobile: startActivity', {
        intent: 'com.android.settings/.Settings'
    });

    await driver.pause(3000);

    // Tap Search
const searchButton = await driver.$('~Search settings');
await searchButton.click();

await driver.pause(1500);

// Enter Display
await driver.execute('mobile: clickGesture', {
    x: 300,
    y: 550
});

await driver.keys('Display');

await driver.pause(2000);

// Tap Screen timeout
// Open Screen timeout
const elements1 = await driver.$$('android.widget.TextView');

for (const element of elements1) {
    if ((await element.getText()).trim() === 'Screen timeout') {
        await element.click();
        console.log('Opened Screen timeout');
        break;
    }
}

await driver.pause(2000);

// Open Screen timeout
// Open Screen timeout
const elements2 = await driver.$$('android.widget.TextView');

for (const element of elements2) {
    if ((await element.getText()).trim() === 'Screen timeout') {
        await element.click();
        console.log('Opened Screen timeout options');
        break;
    }
}

await driver.pause(2000);

// Select 1 minute
const oneMinute = await driver.$(
    'android=new UiSelector().resourceId("com.android.settings:id/timeout_title").text("1 minute")'
);

await oneMinute.click();

console.log('Selected 1 minute');

// Print search results
//console.log(await driver.getPageSource());

    await driver.pause(2000);
    await driver.deleteSession();
}

main().catch(console.error);