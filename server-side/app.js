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

var battles =[],
	users =[];


/*
 * REGISTER --------------------------------------------------------------------------------------------------------------
 */
app.post('/register', function (req, res) {
	console.log(req.query);

	var ans = true;

	for (var i = users.length - 1; i >= 0; i--)
		if(users[i].nick == req.query.nick)
			ans = false;

	if(ans)
		users.push(req.query);
	
	res.jsonp(ans);
});

/*
 * LOBBY ----------------------------------------------------------------------------------------------------------------
 */
app.get('/lobby', function (req, res) {
	var ans = [];

	for (var i = users.length - 1; i >= 0; i--)
		ans.push(users[i].nick);
	
	res.jsonp(ans);
});

/*
 * IS AVAILABLE ---------------------------------------------------------------------------------------------------------
 */
app.get('/isAvailable', function (req, res) {
	var ans = true;console.log(req.query.nick);

	for (var i = users.length - 1; i >= 0; i--)
		if(users[i].nick == req.query.nick)
			ans = false;
	
	res.jsonp(ans);
});

/*
 * HOME -----------------------------------------------------------------------------------------------------------------
 */
app.get('/', function (req, res) {
	res.send('Battleship by Nonemoticoner');
});

/*
 * APP RUN --------------------------------------------------------------------------------------------------------------
 */
var server =app.listen(3001, function () {
	var host =server.address().address;
	var port =server.address().port;

	console.log('Battleship server is listening at http://%s:%s', host, port);
});