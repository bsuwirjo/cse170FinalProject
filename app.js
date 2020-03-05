
/**
 * Module dependencies.
 */

const fetchpath = 'http://bsuwirjo.com/cs170Project/createUser.php?';
const loginPath = 'http://bsuwirjo.com/cs170Project/login.php?';
const updateStock = 'http://bsuwirjo.com/cs170Project/updateStocks.php?';
const addStock = 'http://bsuwirjo.com/cs170Project/addStock.php?';

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
let user = {email: "test", password: "test", up: 0, down:0, stocks: []};
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

//HandlebarsReg.registerPartial("navbar", "{{navbar}}");

http.createServer(app).listen(app.get('port'), function(){
  //console.log('Express server listening on port ' + app.get('port'));
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
    loggedIn = true;
  let data = {stocks: [{symbol:"", price: 0, changesPercentage: 0}]};
  //console.log(req.query.submit);
  switch(req.query.submit){
    case 'login':
              try{
                var response = await fetch(loginPath + "username=" + req.query.email + "&password=" + req.query.password);
                var json = await response.json();
                if (json.response === -1){
                  //console.log('invalid login');
                  //res.redirect('/login');
                  //return;
                }
                response = await fetch(updateStock + "stocks=" + json.Stocks);
                json = await response.json();
                data.string = json;
              }
              catch(e){
                //console.log(e);
              }
                break;
    case 'createAcct':
                        var response = await fetch(fetchpath + "username=" + req.query.email + "&password=" + req.query.password);
                        var json = await response.json();
                        break;
    case 'settings': //console.log(req.query);
                    //console.log(user);
                    user.up = req.query.percentUp;
                    user.down = req.query.percentDown;
                    break;
    case '!addStock':
                try {
                  //console.log(addStock+ "userName=" + user.email + "&password=" + user.password + "&stock=" +req.query.stock);
                  var response = await fetch(addStock+ "userName=" + user.email + "&password=" + user.password + "&stock=" +req.query.stock);
                  response = await fetch(loginPath + "username=" + user.email + "&password=" + user.password);
                  var json = await response.json();
                  //console.log(json.Stocks);
                  response = await fetch(updateStock + "stocks=" + json.Stocks);
                  json = await response.json();
                  data.string = json;
                } catch(e){
                  //console.log(e);
                }
                  break;
  }
  if (req.query.submit == 'login'){
    user.email = req.query.email;
    user.password = req.query.password;
    user.stocks= JSON.parse(data.string);
  } else if (req.query.submit == 'addStock'){
    //user.stocks = JSON.parse(data.string);
  }
  //console.log(user);
  // Add ajax
  //
  res.render('index', user);

})

app.post('/addNewStock', (req, res) => {
  user.stocks.push({symbol: req.body.symbol});
  res.send(req.body.symbol);
});

app.get('/addStock',  (req,res) => {
  res.render('addStock', user);
});

app.post('/changePercents', (req, res) =>{
  console.log('changing pcts');
  user.up = req.body.upPercent;
  user.down = req.body.downPercent;
  res.send('Changed percent!');
})
app.get('/settings', (req,res) =>{
  res.render('settings', user);
})

app.get('/createAcct', (req,res)=>{
  res.render('createAccount', {});
})

app.get('/settingsAlt', (req, res) =>{
  res.render('settingsAlt', user);
})
