A simple command line Steam web store scraper built using Typescript and Playwright.

## Install:

- To install the required packages, simply run ```npm i``` in the root directory.
- it may also be necessary to run ```npx playwright install``` in order to get required drivers for the browser.

## Usage:

- There are 2 modes, searching for games with a search string, and returning the transaction history for a user with a supplied username and password.

**Mode 1**
```npm run search -- -s "YOUR SEARCH STRING"```
- This mode will perform a search on the Steam web store with the given search string and output a formatted JSON to the console with the following fields for each game: name, price, link, originalPrice, salePercent

**Mode 2**
```npm run history -- -u "USERNAME" -p "PASSWORD"```
- This mode will login with the information supplied and then return the transaction history of that account in a formatted JSON with the following fields: name, date, totalChange, type, finalBalance
- This mode requires the user to maunally perform MFA with the Steam App for the account.
- Certain strings such as "$$" that have meaning in linux shell environments may cause the password fill to not work correctly.

