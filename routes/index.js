// Get all of our friend data

var stockNames = ["AAPL", "SNAP", "GOOGL"]
var stockArray = []
var reqArr = ["GLOBAL_QUOTE", "MSFT", "1min", "H3FTWBXJYQ1YB9CK"]
var base = "https://www.alphavantage.co/query?"
var fs = require('fs');

var stockDictionary = new Object();
for(var i = 0; i < stockNames.length; i++){
    stockDictionary[stockNames[i]] = new Object();
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


exports.view = function(request, response){
	//console.log(data);
    var data = {stocks: dataArray}
    console.log(data)
	response.render('index', data);
};
