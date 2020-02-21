
/**
 * Module dependencies.
 */

const fetchpath = 'http://bsuwirjo.com/cs170Project/createUser.php?';
const loginPath = 'http://bsuwirjo.com/cs170Project/login.php?';
const updateStock = 'http://bsuwirjo.com/cs170Project/updateStocks.php?';

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var users = require('./users.json');
var fs = require('fs');
var session = require('express-session');
// Example route
// var user = require('./routes/user');
var fetch = require('node-fetch');


var app = express();
let user = {email: "test", password: "test"};
let loggedIn = false;
// all environments

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('open-iconic'));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
// app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.methodOverride());
//app.use(express.cookieParser('Intro HCI secret key'));
// app.use(express.session());
// app.use(app.router);
app.use(express.static('public'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




app.get('/login', (req,res) => {
  if (req.query.submit === 'logout'){
    loggedIn = false;
  }
  // req.body.email/
  // fetch from server
  res.render('login');
})
app.use('login', (req,res) => {
  res.redirect('/login');
})
// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }


// Add routes here
app.get('/', (req, res) => {res.redirect('/login')});
// Example route
// app.get('/users', user.list);


app.get('/home', async (req,res) =>{
    user.email = req.query.email;
    user.password = req.query.password;
    loggedIn = true; 
  var data = {stocks: [{symbol:"", price: 0, changesPercentage: 0}]};
  switch(req.query.submit){
    case 'login': 
                var response = await fetch(loginPath + "username=" + req.query.email + "&password=" + req.query.password);
                var json = await response.json();
                console.log(json);
                if (json.response == -1){
                  console.log('invalid login');
                  res.redirect('/login');
                  return;
                }
                user.email = req.query.email;
                user.password = req.query.password;
                loggedIn = true; 
                console.log(json.Stocks);
                response = await fetch(updateStock + "stocks=" + json.Stocks);
                console.log(response);
                json = await response.json();
                console.log(json);
                
                break;
    case 'createAcct': console.log(`Making acct ${req.query.email}`);
                        var response = await fetch(fetchpath + "username=" + req.query.email + "&password=" + req.query.password);
                        var json = await response.json();
                        console.log(json);
                        return;
                        break;
  }
  res.render('index', {stocks: data.stocks}); 
})


app.get('/addStock', (req,res) => {
  res.render('addStock', {});
});

app.get('/settings', (req,res) =>{
  res.render('settings', {});
})

app.get('/createAcct', (req,res)=>{
  res.render('createAccount', {});
})

