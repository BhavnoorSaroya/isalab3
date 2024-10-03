// Import required modules
const http = require('http');
const url = require('url');
const DateModule = require('./modules/utils.js'); 
const messages = require('./lang/en/en.js').MESSAGES; 
const FileHandler = require('./fileHandler/fileHandler'); 

// Define the Server class
class Server {
    constructor(port) {
        this.port = port; // Initialize the port number
        this.dateModule = new DateModule(); 
        this.fileHandler = new FileHandler(); 
    }

    
    getDateRoute(req, res) {
        const q = url.parse(req.url, true); // Parse query parameters
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const responseMessage = `<span style="color:blue;">${messages.HELLO} ${q.query['name'] || 'Guest'} ${messages.MAIN_MESSAGE} + ${this.dateModule.getCurrentDate()}</span>`;
        res.end(responseMessage);
    }

    // Method to handle the /readFile route with dynamic file names
    readFileRoute(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const fileName = parsedUrl.pathname.split('/').pop(); // Extract the file name from the URL

        // Use the FileHandler to read the specified file
        this.fileHandler.readFile(fileName, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<h1>404: ${err.message}</h1>`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data); // Serve the file content as plain text
            }
        });
    }

    // Method to handle the /writeFile route (writes to file.txt)
    writeFileRoute(req, res) {
        const q = url.parse(req.url, true); // Parse query parameters
        const textToAppend = q.query['text'] || 'No text provided'; // Get text from query string

        // Use the FileHandler to append to file.txt
        this.fileHandler.appendToFile(textToAppend, (err, message) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Error writing to file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(message);
            }
        });
    }

    // Method to handle routing based on the URL path
    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true); // Parse the URL

        // Route handling
        if (parsedUrl.pathname === '/getDate') {
            this.getDateRoute(req, res); // Handle /getDate route
        } else if (parsedUrl.pathname.startsWith('/readFile')) {
            this.readFileRoute(req, res); 
        } else if (parsedUrl.pathname === '/writeFile') {
            this.writeFileRoute(req, res); // Handle /writeFile route
        } else {
            // Handle 404 for other routes
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        }
    }

    // Method to start the server
    start() {
        http.createServer((req, res) => this.handleRequest(req, res)).listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

// Create a new instance of the Server class and start it
const serverInstance = new Server(8888);
serverInstance.start();

