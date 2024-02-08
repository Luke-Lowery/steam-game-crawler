import { waitForKeypress } from "./utility";
const playwright = require('playwright');

interface Game {
    name: string;
    price: string;
    link: string;
    originalPrice?: string;
    salePercent?: string;
}

export async function crawlSteamStore(searchString: string): Promise<void> {
    // Crawling Steam store based on search string

    // Initialize chromium browser and page
    const browser = await playwright['chromium'].launch({headless: false});
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        // Navigate to the Steam store search page
        await page.goto(`https://store.steampowered.com/search/?term=${encodeURIComponent(searchString)}`);

        // Extract game information from the search results
        const games: Game[] = await extractGames(page);

        // Print the formatted JSON array of games
        console.log(JSON.stringify(games, null, 2));
    } catch (error) {
        console.error('Error occurred while crawling Steam store:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
}

async function extractGames(page: any): Promise<Game[]> {
    // Extract game information from the search results
    const games: Game[] = await page.evaluate(() => {
        const gameElements = Array.from(document.querySelectorAll('.search_result_row'));

        //filter so that we are only considering games and not music or other content
        gameElements.filter(element => (
            element.querySelector('.platform_img.win') !== null)
            || (element.querySelector('.platform_img.mac') !== null)
            || (element.querySelector('.platform_img.linux') !== null)
        );
        
        return gameElements.map(element => {
            const name = element.querySelector('.title')?.textContent?.trim() || 'Missing Title';
            const price = element.querySelector('.discount_final_price')?.textContent?.trim() || 'No Price Available';
            const originalPrice = element.querySelector('.discount_original_price')?.textContent?.trim() || 'N/A';
            const salePercent = element.querySelector('.discount_pct')?.textContent?.trim() || 'Not on Sale';
            const link = element.getAttribute('href') || 'No Link Available';

            return {
                name,
                price,
                link,
                originalPrice,
                salePercent
            };
        });
    });

    return games;
}