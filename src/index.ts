// imports the command line arguments parser and the steamCrawler functions
const commandLineArgs = require('command-line-args');
import { crawlSteamStore } from './steamCrawler';

// defines the command line arguments
const optionDefinitions = [
    { name: 'mode', alias: 'm', type: Number },
    { name: 'searchString', alias: 's', type: String },
    { name: 'username', alias: 'u', type: String },
    { name: 'password', alias: 'p', type: String }
];

const options: any = commandLineArgs(optionDefinitions);

// checks the mode and calls the appropriate function
if (options.mode === 1 && options.searchString) {
    console.log("Crawling Steam Store for: " + options.searchString)
    crawlSteamStore(options.searchString);
} else if (options.mode === 2 && options.username && options.password) {
    console.log("Crawling Steam Purchase History for: " + options.username)
    //crawlPurchaseHistory(options.username, options.password, options.numItems || 10);
} else {
    console.log("Invalid mode or missing required arguments.");
}
