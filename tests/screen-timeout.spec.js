const { createDriver } = require('../helpers/driver');
const settings = require('../pages/settings.page');

describe('Settings App', function () {
    this.timeout(60000); // mobile tests need longer timeouts

    let driver;

    before(async function () {
        driver = await createDriver();
    });

    after(async function () {
        if (driver) {
            await driver.deleteSession();
        }
    });

    it('should change screen timeout to 1 minute', async function () {
        await settings.openSettings(driver);
        await settings.searchFor(driver, 'Display');

        // Navigate to Screen timeout
        await settings.tapTextViewByLabel(driver, 'Screen timeout');
        console.log('Opened Screen timeout');
        await driver.pause(2000);

        await settings.tapTextViewByLabel(driver, 'Screen timeout');
        console.log('Opened Screen timeout options');
        await driver.pause(2000);

        // Select 1 minute
        await settings.selectTimeout(driver, '1 minute');
        console.log('Selected 1 minute');
    });
});

