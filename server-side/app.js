var express =require('express');
var path =require('path');
//var mysql =require('mysql');
var bodyParser =require('body-parser');

var app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

/*
 * CONSTANTS --------------------------------------------------------------------------------------------------------------
 */



/*
 * REGISTER ---------------------------------------------------------------------------------------------------------------
 */
app.post('/register', function (req, res) {
	
});

/*
 * HOME -----------------------------------------------------------------------------------------------------------------
 */
app.get('/', function (req, res) {
	res.send('Battleship');
});

/*
 * APP RUN --------------------------------------------------------------------------------------------------------------
 */
var server =app.listen(3001, function () {
	var host =server.address().address;
	var port =server.address().port;

	console.log('Battleship server is listening at http://%s:%s', host, port);
});