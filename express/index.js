// JavaScript source code
var cors = require('cors');       //Security module required to interact with React
var express = require('express');
var app = express();

app.use(cors());
app.get('/', function (req, res) {
  res.send('Hello World!');       //Print hello world out into the web page.
});
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');  //If the app successfully runs, 
                                                        //this will be printed in the console
});