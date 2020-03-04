// JavaScript source code
var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});