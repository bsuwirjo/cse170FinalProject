
/**
 * Module dependencies.
 */

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
// app.use(express.cookieParser('Intro HCI secret key'));
// app.use(express.session());
// app.use(app.router);
app.use(express.static('public'));

app.use('/loginPage', (req,res) => { if(loggedIn)  {res.redirect('/home')} else { res.sendfile ('views/login.html')}});

app.post('/login', (req,res) => {
  if (checkLogin(req.body.email, req.body.password)){
    var user = users.filter(e => {return (e.email === req.body.email && e.password === req.body.password)});
    fs.writeFile('stocks.json', JSON.stringify(user[0].stocks), () => {});
    email = req.body.email;
    password = req.body.password;
    loggedIn = true;
    res.redirect('/home');
  } else {
    res.redirect('/loginPage');
  }
})
// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// Add routes here
app.get('/', (req, res) => {res.redirect('/loginPage')});
// Example route
// app.get('/users', user.list);
app.get('/home',(req, res) => {
  var sinfo;
  fs.readFile('stocks.json', async (err, data) =>{
    var stocks = JSON.parse(data);
    var info = await getStockInfo(stocks).then(res => res);
    console.log(info);
    sinfo = JSON.parse(info);
    //console.log(sinfo);
  var data = {stocks: sinfo};
  //console.log(data);
  res.render('index', data);
  })

  });

   http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


app.get('/stocks', (req, res)=>{

})

app.post('/addStock', (req,res) => {
  var stock = req.body.stock;
  var stocks = [];
  fs.readFile('stocks.json', (err, data) => {
    stocks = JSON.parse(data);
    stocks.push(stock);
    fs.writeFile('stocks.json', JSON.stringify(stocks), () => {});

    res.redirect('/home');
  })


});

app.get('/addStockPage', (req, res) =>{
  var data = [];

})

function checkLogin(email, password){
  if (users.filter((e) => { console.log(e); return (e.email === email && e.password === password); }).length > 0) {

    return true;
  }
   else {
     return false;
   }
}

async function getStockInfo(stockNames){
if (!stockNames){
  return;
}
var stockArray = []
var reqArr = ["GLOBAL_QUOTE", "MSFT", "1min", "H3FTWBXJYQ1YB9CK"]
var base = "https://www.alphavantage.co/query?"
var stockDictionary = {};
for(var i = 0; i < stockNames.length; i++){
    stockDictionary[stockNames[i]] = {};
}

var request = require('request');

var dataArray = [];
	for(var i = 0; i < stockNames.length; i++)
    {
        var url = base + "function=" + reqArr[0] + "&symbol=" + stockNames[i] + "&interval=" + reqArr[2] + "&apikey="+reqArr[3];
        let res = await fetch(url);
        let body = await res.text();


              body = body.replace("01. symbol", "symbol");
              body = body.replace("05. price", "price");
              body = body.replace("10. change percent", "changePercent");

              var tmp = JSON.parse(body);

              var stockUrl = "https://finance.yahoo.com/quote/" + stockNames[i] + "?p=" + stockNames[i] + "&.tsrc=fin-srch"

              tmp["Global Quote"]["url"] = "<div onclick = \"window.location=\'" + stockUrl + "\';\">"
              console.log(tmp["Global Quote"]);
              dataArray.push(tmp["Global Quote"])


    }
    //console.log(dataArray);
return JSON.stringify(dataArray);
}
