import { waitForKeypress } from "./utility";
const playwright = require('playwright');

interface Transaction {
    name: string;
    date: string;
    totalChange: string;
    link: string;
    finalBalance?: string;
}

export async function crawlPurchaseHistory(username: string, password: string): Promise<void> {
    // Initialize chromium browser and page
    const browser = await playwright['chromium'].launch({ headless: false });
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        // Navigate to the Steam login page
        await page.goto('https://store.steampowered.com/login/');

        await page.waitForSelector('[class*="TextInput"]');
        // Fill in the login form and submit
        const inputs = await page.$$('[class*="TextInput"]');
        console.log(inputs.length);
        await inputs[0].fill(username);
        console.log(password)
        await inputs[1].fill(password);

        const loginButton = await page.$$('[class*="SubmitButton"]');
        console.log(loginButton.length);
        console.log(loginButton);
        await loginButton[0].click();

        // Wait for the login to complete
        console.log('Logging in...');
        console.log('Please allow the login through the Steam mobile app MFA.');
        console.log('Press any key to continue after allowing the log in.');

        await waitForKeypress();

        // Navigate to the Steam account transaction history page
        await page.goto('https://store.steampowered.com/account/history/');

        // Extract purchase history from the transaction history page


        return;
    } catch (error) {
        console.error('Error occurred while crawling Steam transaction history:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

function extractPurchaseHistory(page: any): void {
    // Extract purchase history from the transaction history page
}