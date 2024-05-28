// create web server 
// and listen on port 3000
// create a route for /comments, set the content type to application/json, and send back a JSON object with the key comments and a value of an array of comments
// run the server with node comments.js
// open a browser and navigate to localhost:3000/comments to see the JSON object

const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ comments: ['one', 'two', 'three'] }));
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});