
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var users = require('./users.json');


var index = require('./routes/index');
// Example route
// var user = require('./routes/user');

var app = express();

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
app.post('/login', (req,res) => {
  console.log(req.body);
  if (checkLogin(req.body.email, req.body.password)){
    res.send("./");
  } else {
    res.sendfile("views/test.html");
  }
})
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function checkLogin(email, password){
  if (users.filter((e) => { console.log(e); return (e.email === email && e.password === password); }).length > 0) {
    
    return true;
  }
   else {
     return false;
   }
  return (email == "agb@alex.com" && password == "giordano");
}
