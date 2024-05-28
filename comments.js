// Create web server
// 1. Create a web server
// 2. Read the comments.json file
// 3. Send the JSON data back to the client
// 4. Use the URL to determine the type of request
// 5. Add a new comment to the JSON file

// Load the http module to create an http server
var http = require('http');
var fs = require('fs');

// Configure the HTTP server to respond with comments
var server = http.createServer(function (request, response) {
    // Read the comments.json file
    fs.readFile('comments.json', 'utf-8', function (err, data) {
        var comments = JSON.parse(data);
        response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

        // If the request is a POST request, then add a new comment
        if (request.method === 'POST') {
            var body = '';

            request.on('data', function (chunk) {
                body += chunk;
            });

            request.on('end', function () {
                var newComment = JSON.parse(body);
                comments.push(newComment);
                fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function (err) {
                    response.end(JSON.stringify(comments));
                });
            });
        } else {
            response.end(JSON.stringify(comments));
        }
    });
});

// Listen on port 8000, IP defaults to