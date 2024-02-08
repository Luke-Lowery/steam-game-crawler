//Utility Function to wait for a keypress
import * as readline from 'readline';

export function waitForKeypress(): Promise<void> {
    return new Promise<void>((resolve) => {
        // Create readline interface
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Create a function to handle keypress event
        const handleKeypress = () => {
            // Remove the event listener to prevent memory leaks
            rl.off('line', handleKeypress);
            // Close the readline interface
            rl.close();
            // Resolve the promise when a key is pressed
            resolve();
        };

        // Add event listener for line event (keypress)
        rl.on('line', handleKeypress);
    });
}
