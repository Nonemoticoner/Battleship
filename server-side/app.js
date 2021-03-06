var express =require('express');
var bodyParser =require('body-parser');
var bs =require('./battleship.js');

var app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

/*
 * CONSTANTS --------------------------------------------------------------------------------------------------------------
 */

var Battle =bs.Battle;

var GLOBAL = {
	battles: [],
	users: [],
	challanges: []
};

/*
 * ATTACK --------------------------------------------------------------------------------------------------------------
 */
app.get('/attack', function (req, res) {	// POST
	var battleNo =-1;

	// find battle
	for (var i = GLOBAL.battles.length - 1; i >= 0 && battleNo ==-1; i--) {
		if(GLOBAL.battles[i].attacker.nick == req.query.attacker.nick && GLOBAL.battles[i].defender.nick == req.query.defender.nick)
			battleNo =i;
		else if(GLOBAL.battles[i].attacker.nick == req.query.attacker.nick && GLOBAL.battles[i].defender.nick == req.query.defender.nick)
			battleNo =i;
	}

	// update
	if(battleNo !=-1){
		// initialize battle object
		var battle = new Battle(req.query.attacker.nick, req.query.defender.nick, [req.query.attacker, req.query.defender]);
		battle.turn = req.query.turn;

		GLOBAL.battles[battleNo] = battle;

		res.jsonp(true);
	}
	else
		res.jsonp(false);
});

/*
 * REGISTER --------------------------------------------------------------------------------------------------------------
 */

app.get('/register', function (req, res) {	// POST
	var ans = true;

	for (var i = GLOBAL.users.length - 1; i >= 0; i--)
		if(GLOBAL.users[i].nick == req.query.nick)
			ans = false;

	if(ans){
		var player = new bs.Player(req.query.nick, "pending", req.query.set);
		GLOBAL.users.push(player);
	}
	
	res.jsonp(ans);
});

/*
 * CHALLANGE ------------------------------------------------------------------------------------------------------------
 */
app.get('/challange', function (req, res) {	// POST
	var ans = "error",
		fighters = req.query.fighters;

	// check if challange already exists
	for (var i = GLOBAL.challanges.length - 1; i >= 0; i--)
		if(GLOBAL.challanges[i][0] == fighters[0] && GLOBAL.challanges[i][1] == fighters[1])
			ans = "ready";
		else if(GLOBAL.challanges[i][1] == fighters[1] && GLOBAL.challanges[i][0] == fighters[0])
			ans = "ready";

	// add a challange to db
	if(ans == "error"){
		GLOBAL.challanges.push(fighters);
		ans = "challanged";
	}

	// add to battles 
	if(ans == "ready"){
		// initialize battle object
		var battle = new Battle(fighters[0], fighters[1], GLOBAL.users);
		
		GLOBAL.battles.push(battle);
	}
	
	res.jsonp(ans);
});

/*
 * LOBBY ----------------------------------------------------------------------------------------------------------------
 */
app.get('/lobby', function (req, res) {
	var ans = [];

	for (var i = GLOBAL.users.length - 1; i >= 0; i--)
		ans.push(GLOBAL.users[i].nick);
	
	res.jsonp(ans);
});

/*
 * GET BATTLE -----------------------------------------------------------------------------------------------------------
 */
app.get('/getBattle', function (req, res) {
	var ans = {};

	// find battle
	for (var i = GLOBAL.battles.length - 1; i >= 0; i--)
		if(GLOBAL.battles[i].attacker.nick == req.query.nick && GLOBAL.battles[i].defender.nick == req.query.opponent)
			ans = GLOBAL.battles[i];
		else if(GLOBAL.battles[i].attacker.nick == req.query.opponent && GLOBAL.battles[i].defender.nick == req.query.nick)
			ans = GLOBAL.battles[i];
	
	res.jsonp(ans);
});

/*
 * IS AVAILABLE ---------------------------------------------------------------------------------------------------------
 */
app.get('/isAvailable', function (req, res) {
	var ans = true;

	for (var i = GLOBAL.users.length - 1; i >= 0; i--)
		if(GLOBAL.users[i].nick == req.query.nick)
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