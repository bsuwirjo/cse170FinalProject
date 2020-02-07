const express = require('express')
const app = express()
const port = 3000
var path = require('path');

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/test.html'));
});
app.get('/addStock.html', function(req,res){
    res.sendFile(path.join(__dirname + '/addStock.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))