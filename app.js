const express = require('express')
var hbs = require( 'express-handlebars');
const app = express()
const port = 3000
var path = require('path');


app.use(express.static(__dirname + '/public'));
app.use('/css',express.static(__dirname +'/css'));
app.use('/js',express.static(__dirname +'/js'));
app.use('/views', express.static(__dirname +'/views'));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/addStock.html', function(req,res){
    res.sendFile(path.join(__dirname + '/addStock.html'));
});

// view engine setup
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/pages/',
  partialsDir: __dirname + '/views/partials/'
}));

app.get('/settings', function(req,res) {
    res.sendFile(path.join(__dirname + '/views/settings.html'));
} )
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
