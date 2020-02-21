
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
<<<<<<< HEAD
=======
app.get('/home',(req, res) => {
  var sinfo;
  fs.readFile('stocks.json', async (err, data) =>{
    var stocks = await JSON.parse(data);
    var info = await getStockInfo(stocks).then(res => res);
    console.log(info);
      sinfo = JSON.parse(info);
    //console.log(sinfo);
     var data = {stocks: sinfo};
     fs.writeFile('currInfo.json', JSON.stringify(data), ()=>{
       fs.readFile('currInfo.json', (err, data)=>{
          var sarr = JSON.parse(data);
          res.render('index', sarr);
       })
     })
  
  })

  });

   http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

>>>>>>> c81f50463de705ad8b5153a88b9a557fd570955f


app.get('/home', async (req,res) =>{
    user.email = req.query.email;
    user.password = req.query.password;
    loggedIn = true; 
  let data = {stocks: [{symbol:"", price: 0, changesPercentage: 0}]};
  switch(req.query.submit){
    case 'login': 
                var response = await fetch(loginPath + "username=" + req.query.email + "&password=" + req.query.password);
                var json = await response.json();
                console.log(json);
                if (json.response === -1){
                  console.log('invalid login');
                  //res.redirect('/login');
                  //return;
                }
                user.email = req.query.email;
                user.password = req.query.password;
                loggedIn = true; 
                console.log(json.Stocks);
                response = await fetch(updateStock + "stocks=" + json.Stocks);
                console.log(response);
                json = await response.json();
                data.string = json;
                break;
    case 'createAcct': console.log(`Making acct ${req.query.email}`);
                        var response = await fetch(fetchpath + "username=" + req.query.email + "&password=" + req.query.password);
                        var json = await response.json();
                        console.log(json);
                        return;
                        break;
  }
  const renderData = JSON.parse(data.string);
  console.log(renderData);
  res.render('index', {}); 
})


<<<<<<< HEAD
app.get('/addStock', (req,res) => {
  res.render('addStock', {});
});

app.get('/settings', (req,res) =>{
  res.render('settings', {});
})

app.get('/createAcct', (req,res)=>{
  res.render('createAccount', {});
})

=======
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
>>>>>>> c81f50463de705ad8b5153a88b9a557fd570955f
