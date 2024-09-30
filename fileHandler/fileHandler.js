// Import required modules
const fs = require('fs');
const path = require('path');

// Define the FileHandler class
class FileHandler {
    constructor() {
        // Define a default file path for write operations
        this.defaultFilePath = path.join(__dirname, '..', 'file.txt');
    }

    // Method to append text to the default file (file.txt)
    appendToFile(text, callback) {
        fs.appendFile(this.defaultFilePath, `${text}\n`, (err) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, `Text "${text}" successfully appended to file.`);
        });
    }

    // Method to read any file based on file name from the URL
    readFile(fileName, callback) {
        const filePath = path.join(__dirname, '..', fileName);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return callback(new Error(`File "${fileName}" not found`), null);
            }

            // Read the file asynchronously
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, data); // Return the file content
            });
        });
    }
}

// Export the FileHandler class
module.exports = FileHandler;
