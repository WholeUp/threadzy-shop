import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\NEEL\\.gemini\\antigravity\\brain\\eade43f7-dabe-4208-979c-64a6d1252a61';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("Waiting 60 seconds for Render to deploy the flatlay update...");
  await delay(60000);

  if (!fs.existsSync(CHROME_PATH)) {
    console.error("Chrome not found at:", CHROME_PATH);
    process.exit(1);
  }

  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1080 });

  // Listen for console logs
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]:`, msg.text());
  });

  console.log("Navigating to https://threadzy.shop...");
  try {
    // Navigate with a cache-busting query parameter
    await page.goto('https://threadzy.shop?v=' + Date.now(), { waitUntil: 'networkidle2', timeout: 30000 });
    console.log("Navigation complete.");

    // Check first product name in grid
    const firstProductName = await page.evaluate(() => {
      const el = document.querySelector('.product-card .product-name');
      return el ? el.textContent : null;
    });

    console.log("First product name on live site:", firstProductName);

    console.log("Taking screenshot of the flatlays grid...");
    await page.screenshot({ path: `${ARTIFACTS_DIR}/live_flatlays_verified.png`, fullPage: false });
    console.log("Screenshot saved!");
  } catch (err) {
    console.error("Verification failed:", err);
  } finally {
    await browser.close();
    console.log("Browser closed.");
  }
}

run();
