// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/comments', function(req, res) {
  fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
    var comments = JSON.parse(data);
    res.json(comments);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 4), function(err) {
      res.json(comments);
    });
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
