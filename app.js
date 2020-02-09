const express = require('express')
const app = express()
const port = 3000
var path = require('path');

app.use(express.static('public'));
app.use('/css',express.static(__dirname +'/css'));
app.use(express.static(__dirname + '/public'));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/test.html'));
})
app.get('/addStock.html', function(req,res){
    res.sendFile(path.join(__dirname + '/addStock.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))