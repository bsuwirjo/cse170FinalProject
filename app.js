
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var users = require('./users.json');
var fs = require('fs');

// Example route
// var user = require('./routes/user');

var app = express();
let loggedIn = false;
let email, password = "test";
let stocks = [];
// all environments

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('open-iconic'));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static('public'));

app.use('/loginPage', (req,res) => {res.sendfile('views/login.html')});

app.post('/login', (req,res) => {
  if (checkLogin(req.body.email, req.body.password)){
    var user = users.filter(e => {return (e.email === req.body.email && e.password === req.body.password)});
    stocks = user[0].stocks;
    console.log(stocks);
    email = req.body.email;
    password = req.body.password;
    var dataobj = [{}];
    dataobj[0].email = email;
    dataobj[0].password = password;
    dataobj[0].stocks = stocks;
    fs.writeFile('stocks.json', JSON.stringify(dataobj), () => {});
    console.log(JSON.stringify(dataobj));
    loggedIn = true;
    console.log(loggedIn);
    res.redirect('/');
  } else {
    res.sendfile("views/test.html");
  }
})
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', (req, res) => {loggedIn ? res.redirect('/home'): res.redirect('/loginPage')});
// Example route
// app.get('/users', user.list);
app.get('/home', (req, res) => {
  console.log(stocks);
  var stockInfo =  getStockInfo(stocks);
  res.render('index', {stocks: stockInfo})});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


app.get('/stocks', (req, res)=>{
  res.send(JSON.stringify(stocks));
})

app.post('/addStock', (req,res) => {
  var stock = req.body.stock;
  fs.readFile('users.json', (err, data) => {
    if (err){
      console.log(err);
    } else {
      var table = JSON.parse(data);
      var user = table.filter((e) => {
        return (e.email === email && e.password === password);
      });
      if (user.length == 1){
        user[0].stocks.push(stock);
      }
    }
  })
});
function checkLogin(email, password){
  if (users.filter((e) => { console.log(e); return (e.email === email && e.password === password); }).length > 0) {
    
    return true;
  }
   else {
     return false;
   }
}

async function getStockInfo(stockNames){

var stockArray = []
var reqArr = ["GLOBAL_QUOTE", "MSFT", "1min", "H3FTWBXJYQ1YB9CK"]
var base = "https://www.alphavantage.co/query?"
var fs = require('fs');


  var stockDictionary = {};
for(var i = 0; i < stockNames.length; i++){
    stockDictionary[stockNames[i]] = {};
}

var request = require('request');

var dataArray = []
request.get('/external-api', function(req, res){
	for(var i = 0; i < stockNames.length; i++)
    {
        var url = base + "function=" + reqArr[0] + "&symbol=" + stockNames[i] + "&interval=" + reqArr[2] + "&apikey="+reqArr[3]
		request(url, function (error, response, body) {
			  //console.log('error:', error); // Print the error if one occurred and handle it
			  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

              body = body.replace("01. symbol", "symbol");
              body = body.replace("05. price", "price");
              body = body.replace("10. change percent", "changePercent");

              var tmp = JSON.parse(body)
              console.log(tmp["Global Quote"])
              dataArray.push(tmp["Global Quote"])
			  //res.send(body)
		});
    }
})
return dataArray;
}
