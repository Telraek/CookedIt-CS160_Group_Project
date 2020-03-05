var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
let database = require('./database');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//database schema
const personSchema = new database.Schema({
  fName: String,
  lName: String
});
let Person = database.model('Person', personSchema);


app.use('/', indexRouter);
app.get('/users', function(req,res){

  let first = req.query.first;
  let last =  req.query.last;
  let name = first + " " + last;
  let newPerson = new Person({fName:first, lName:last });
  newPerson.save(function(err,data){
    if(err) return console.error(err);
  })
  Person.find().lean().exec(function(err,data){
   if(err) return console.error(err);
   return res.end(name + " added to DB \n\n\n\n" + "DATABASE\n" + JSON.stringify(data));
  
  })
  
});

module.exports = app;
