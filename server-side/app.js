var express =require('express');
var path =require('path');
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

var Battle =(function () {
	function Battle (attacker, defender, users) {
		var attSet = {}, defSet = {};

		for (var i = 0; i < users.length; i++) {
			if(users[i].nick == attacker)
				attSet = users[i].set;
			else if(users[i].nick == defender)
				defSet = users[i].set;
		}

		this.turn = 0;	// incrementable

		this.attacker = {
			nick: attacker,
			set: attSet
		};
		this.defender = {
			nick: defender,
			set: defSet
		};
	}

	return Battle;
})();

var GLOBAL = {
	battles: [],
	users: [],
	challanges: []
};

/*
 * ATTACK --------------------------------------------------------------------------------------------------------------
 */
app.post('/attack', function (req, res) {
	var battleNo =-1;

	// find battle
	for (var i = GLOBAL.battles.length - 1; i >= 0 && battleNo ==-1; i--) {
		if(GLOBAL.battles[i].attacker == req.query.attacker && GLOBAL.battles[i].defender == req.query.defender)
			battleNo =i;
		else if(GLOBAL.battles[i].attacker == req.query.attacker && GLOBAL.battles[i].defender == req.query.defender)
			battleNo =i;
	}

	// make a copy to operate on
	var battle = GLOBAL.battles[battleNo];

	// make objects from classes (create module) to be able to use helper functions
	// ...

	// update
	GLOBAL.battles[battleNo] = battle;
	
	res.jsonp(battle);
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
		fighters = req.query.fighters;console.log(fighters);console.log("---------");console.log(GLOBAL.challanges);

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
		console.log("Battle: -------------");console.log(battle);
		GLOBAL.battles.push(battle);
	}
	
	res.jsonp(ans);console.log("=========");console.log(ans);
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
		if(GLOBAL.battles[i].attacker.nick == res.query.nick && GLOBAL.battles[i].defender.nick == res.query.opponent)
			ans = GLOBAL.battles[i];
		else if(GLOBAL.battles[i].attacker.nick == res.query.opponent && GLOBAL.battles[i].defender.nick == res.query.nick)
			ans = GLOBAL.battles[i];
	
	res.jsonp(ans);
});

/*
 * IS AVAILABLE ---------------------------------------------------------------------------------------------------------
 */
app.get('/isAvailable', function (req, res) {
	var ans = true;console.log(req.query.nick);

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