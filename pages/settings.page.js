// Settings app actions

async function openSettings(driver) {
    await driver.execute('mobile: startActivity', {
        intent: 'com.android.settings/.Settings'
    });
    await driver.pause(3000);
}

async function searchFor(driver, text) {
    const searchButton = await driver.$('~Search settings');
    await searchButton.click();
    await driver.pause(1500);

    // Tap the search input area
    await driver.execute('mobile: clickGesture', { x: 300, y: 550 });
    await driver.keys(text);
    await driver.pause(2000);
}

async function tapTextViewByLabel(driver, label) {
    const elements = await driver.$$('android.widget.TextView');
    for (const element of elements) {
        if ((await element.getText()).trim() === label) {
            await element.click();
            return true;
        }
    }
    return false;
}

async function selectTimeout(driver, duration) {
    const option = await driver.$(
        `android=new UiSelector().resourceId("com.android.settings:id/timeout_title").text("${duration}")`
    );
    await option.click();
}

module.exports = { openSettings, searchFor, tapTextViewByLabel, selectTimeout };

