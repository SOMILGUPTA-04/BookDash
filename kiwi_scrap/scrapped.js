import playwright from 'playwright';

const DEFAULT_TIMEOUT = 10000; // Increased timeout to 10 seconds

async function main() {
    const browser = await playwright.chromium.launch({
        headless: false, // Running in headful mode for better debugging
    });

    const page = await browser.newPage();

    const url = 'https://www.kiwi.com/en/search/results/jaipur-india/new-delhi-india/2024-07-05/2024-07-07?sortBy=price&sortAggregateBy=price';

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(DEFAULT_TIMEOUT);

    // Bypass "Your privacy, your choice" page
    const acceptButton = await page.locator('button:has-text("Accept")');
    if (await acceptButton.isVisible()) {
        await acceptButton.click();
        await page.waitForTimeout(DEFAULT_TIMEOUT);
    }

    try {
        // Wait for the first cheapest flight price element to be visible
        const cheapestPriceElement = await page.locator('span.length-7').first();
        await cheapestPriceElement.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        const cheapestPriceText = await cheapestPriceElement.textContent();

        console.log(`Cheapest flight price: ${cheapestPriceText}`);
    } catch (error) {
        console.error('Error retrieving cheapest flight price:', error);

        // Capture screenshot for debugging
        await page.screenshot({ path: 'error-screenshot.png' });
    }

    await browser.close();
}

main();
