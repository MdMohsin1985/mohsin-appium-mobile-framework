# Mohsin Appium Mobile Framework

A lightweight mobile automation framework for Android using **Appium** and **WebDriverIO**, with **Mocha** as the test runner.

---

## Framework Structure

```
mohsin-appium-mobile-framework/
├── config/
│   └── device.config.js         # Appium server & device capabilities
├── helpers/
│   └── driver.js                # Reusable driver session setup
├── pages/
│   └── settings.page.js         # Settings app actions (search, navigate, tap)
├── tests/
│   └── screen-timeout.spec.js   # Mocha test with describe/it blocks
├── first-test.js                # Standalone test (no test runner needed)
├── package.json
├── .gitignore
└── README.md
```

| Folder | Purpose |
|--------|---------|
| `config/` | Device UDID, Appium server host/port, and capabilities. Change your device here without touching tests. |
| `helpers/` | Driver setup logic. Call `createDriver()` from any test to get a session. |
| `pages/` | Page actions grouped by app screen. Keeps tests clean and readable. |
| `tests/` | Test files using Mocha's `describe`/`it` pattern. File names end with `.spec.js`. |

---

## Setup Guide

### Prerequisites

- **Node.js** (v18 or later) — [Download](https://nodejs.org/)
- **Java JDK** (v11 or later) — [Download](https://adoptium.net/)
- **Android Studio** — [Download](https://developer.android.com/studio)
- A physical Android device or an Android emulator

### Step 1 — Install Android SDK & Set Environment Variables

1. Install **Android Studio** and open it once to let it download the Android SDK.
2. Set the following environment variables:

```bash
# Windows (System Environment Variables)
ANDROID_HOME = C:\Users\<your-username>\AppData\Local\Android\Sdk
JAVA_HOME    = C:\Program Files\Java\jdk-<version>

# Add to PATH
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

3. Verify by running:

```bash
adb --version
java -version
```

### Step 2 — Set Up an Android Device

#### Option A: Physical Device
1. Enable **Developer Options** on your phone (tap "Build Number" 7 times in Settings → About Phone).
2. Enable **USB Debugging** in Developer Options.
3. Connect via USB and run `adb devices` to confirm it shows up.
4. Note down your device UDID from the `adb devices` output.

#### Option B: Android Emulator (AVD)
1. Open Android Studio → **Device Manager** → **Create Virtual Device**.
2. Pick a device (e.g., Pixel 6) and a system image (e.g., API 34).
3. Launch the emulator.
4. Run `adb devices` to get the emulator's UDID (e.g., `emulator-5554`).

### Step 3 — Install Appium

```bash
# Install Appium globally
npm install -g appium

# Install the UiAutomator2 driver (for Android automation)
appium driver install uiautomator2

# Verify installation
appium --version
appium driver list --installed
```

### Step 4 — Install Appium Inspector (Optional but Recommended)

Appium Inspector lets you visually inspect elements on your device to find selectors.

1. Download from [Appium Inspector Releases](https://github.com/appium/appium-inspector/releases).
2. Install and open it.
3. Set the remote host to `127.0.0.1`, port `4723`, path `/`.
4. Add the same capabilities from `config/device.config.js` and start a session.

### Step 5 — Clone & Install Project Dependencies

```bash
git clone https://github.com/MdMohsin1985/mohsin-appium-mobile-framework.git
cd mohsin-appium-mobile-framework
npm install
```

### Step 6 — Update Device Config

Open `config/device.config.js` and update the UDID to match your device:

```js
'appium:udid': 'YOUR_DEVICE_UDID'   // from `adb devices`
```

---

## Running Tests

You need **two terminals** in VS Code — one for the Appium server, one for running tests. No need to open a separate VS Code window.

> **Tip:** Press `Ctrl + Shift + `` ` to open a new terminal, or click the **＋** icon in the terminal panel. Switch between terminals using the dropdown.

### Terminal 1 — Start the Appium Server

Keep this running in the background. Don't close it while tests are running.

```bash
appium
```

You should see: `Appium REST http interface listener started on 0.0.0.0:4723`

### Terminal 2 — Run Your Tests

Open a second terminal and run either of the following:

#### Option A: Run `first-test.js` (Standalone — No Test Runner)

```bash
node first-test.js
```

This runs the test directly with Node.js. You'll see console logs as it executes each step. Good for quick debugging.

#### Option B: Run Tests with Mocha

```bash
# Run all spec files
npm test

# Or run a specific test
npx mocha tests/screen-timeout.spec.js --timeout 60000
```

Mocha output looks like:

```
  Settings App
    ✓ should change screen timeout to 1 minute (12000ms)

  1 passing (15s)
```

---

## Quick Reference

| Command | What it does |
|---------|-------------|
| `appium` | Start the Appium server |
| `adb devices` | List connected Android devices |
| `node first-test.js` | Run standalone test |
| `npm test` | Run all Mocha tests |
| `npx mocha tests/<file>.spec.js --timeout 60000` | Run a specific test |
| `adb shell dumpsys window \| find "mCurrentFocus"` | Find the current app's package/activity |

