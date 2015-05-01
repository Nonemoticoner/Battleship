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
		this.orientation = orientation;	// vertical - true, horizontal - false
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

class Set{
	constructor(ships =[]){
		//0 empty space
		//1 ship
		//2 killed ship
		//3 missed shot
		this.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
		this.ships = ships;

		// locates all ships on map
		for (var i = this.ships.length - 1; i >= 0; i--) {
			this.locate(this.ships[i])
		}
	}

	locate(ship){
		if(ship.orientation == 'v'){
			for(int i =0; i <ship.length; i++){
				try{
					if(this.map[ship.y +i][ship.x] ==0)
						this.map[ship.y +i][ship.x] =1;
					else
						throw new Error("Ship you are trying to locate collides with another ship");
				}
				catch(error){
					console.log(error);
					return 1;
				}
			}
		}
		else if(ship.orientation == 'h'){
			for(int i =0; i <ship.length; i++){
				try{
					if(this.map[ship.y][ship.x +i] ==0)
						this.map[ship.y][ship.x +1] =1;
					else
						throw new Error("Ship you are trying to locate collides with another ship");
				}
				catch(error){
					console.log(error);
					return 1;
				}
			}
		}
	}


}


class Player{
	constructor(nick, status ="pending", set =new Set()){
		this.nick =nick;
		this.set =set;
		this.status = status;	// pending or playing
	}

	attackedBy(opponent, x, y){
		if(this.set.map[y][x] ==0){
			this.set.map[y][x] =3;
			return 0;
		}
		else if(this.set.map[y][x] ==1){
			this.set.map[y][x] =2;
			return 1;
		}
		else if(this.set.map[y][x] ==2)
			return 2;
		else if(this.set.map[y][x] ==3)
			return 3;
		else
			return -1;		//fail
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