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

class Ship{
	constructor (x, y, orientation, length) {
		this.x =x;
		this.y =y;
		this.or = orientation;	// vertical - true, horizontal - false
		this.length = length;
		this.hp =[];

		if (this.len ==5)
			this.type = "Aircraft Carrier";
		else if (this.len ==4)
			this.type = "Battleship";
		else if (this.len ==3)
			this.type = "Submarine";
		else if (this.len ==2)
			this.type = "Cruiser";
		else if (this.len ==1)
			this.type = "Patrol Boat";
		else
			this.type = "Unknown";

		for (var i = this.length - 1; i >= 0; i--) {
			this.hp.push(true);
		}
	}

	get isDead(){
		for (var i = this.hp.length - 1; i >= 0; i--) 
			if (this.hp[i] ==true)
				return false;

		return true;
	}

}



var battles =[],
	users =[];


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