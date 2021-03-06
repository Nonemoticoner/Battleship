// var Classes = (function () {
// 	var Classes ={};

	// GLOBAL VARIABLES
	window.DOMAIN = "http://localhost";
	window.PORT = 3001;

	var Ship =(function () {
		function Ship (x, y, orientation, length) {
			this.x =x;
			this.y =y;
			this.orientation = orientation;	// vertical - ver, horizontal - hor
			this.length = length;
			this.hp =[];

			if (this.length ==5)
				this.type = "Aircraft Carrier";
			else if (this.length ==4)
				this.type = "Battleship";
			else if (this.length ==3)
				this.type = "Submarine";
			else if (this.length ==2)
				this.type = "Cruiser";
			else if (this.length ==1)
				this.type = "Patrol Boat";
			else
				this.type = "Unknown";

			for (var i = this.length - 1; i >= 0; i--) {
				this.hp.push(true);
			}
		}

		Object.defineProperty(Ship.prototype, "isDead", {
			get: function(){
				for (var i = this.hp.length - 1; i >= 0; i--) 
					if (this.hp[i] ==true)
						return false;

				return true;
			},
			enumerable: true,
			configurable: true
		});

		return Ship;
	})();

	var Set =(function () {
		function Set (ships_arg) {
			//0 empty space
			//1 ship
			//2 killed ship
			//3 missed shot
			this.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
			this.ships = [];

			typeof ships_arg =="undefined" ? ships_arg =[]: 0;

			// locates all ships on map
			for (var i = ships_arg.length - 1; i >= 0; i--) {
				this.locate(ships_arg[i]);
			}
		}

		Set.prototype.locate = function(ship) {
			if(typeof ship == "undefined")
				return 1;

			var temp = this.map;
			if(ship.orientation == 'ver'){
				for(var i =0; i <ship.length; i++){
						if(temp[ship.y +i][ship.x] ==0)
							temp[ship.y +i][ship.x] =1;
						else
							return 1;	// error
				}
				this.ships.push(ship);
				this.map = temp;

				return 0; // success
			}
			else if(ship.orientation == 'hor'){
				for(var i =0; i <ship.length; i++){
						if(temp[ship.y][ship.x +i] ==0)
							temp[ship.y][ship.x +i] =1;
						else
							return 1;	// error
				}
				this.ships.push(ship);
				this.map = temp;

				return 0;	// success
			}
		};

		return Set;
	})();

	var Player =(function () {
		function Player(nick, status, set){
			this.nick =nick;
			this.set =set || new Set();
			this.status = status || "pending";	// pending or playing
		}

		Player.prototype.attackedBy = function(opponent, x, y) {
			if(typeof this.set == "undefined")	// freak call protection
				return -1;

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
		};

		Object.defineProperty(Player.prototype, "isDead", {
			get: function(){
				for (var i = 0; i < 10; i++) {
					for (var j = 0; j < 10; j++) {
						if(parseInt(this.set.map[i][j]) == 1)
							return false;
					}
				}
				return true;
			},
			enumerable: true,
			configurable: true
		});

		return Player;
	})();

	var Battle =(function () {
		function Battle (attacker, defender, users) {
			this.turn = 0;	// incrementable

			this.attacker = {};
			this.defender = {};

			for (var i = 0; i < users.length; i++) {
				if(users[i].nick == attacker)
					this.attacker = users[i];
				else if(users[i].nick == defender)
					this.defender = users[i];
			}
		}

		return Battle;
	})();

	function letter2digit (letter) {
		switch(letter){
			case "A":
				return 0;
			case "B":
				return 1;
			case "C":
				return 2;
			case "D":
				return 3;
			case "E":
				return 4;
			case "F":
				return 5;
			case "G":
				return 6;
			case "H":
				return 7;
			case "I":
				return 8;
			case "J":
				return 9;
		}
	}

// 	Classes.Ship = Ship;
// 	Classes.Set = Set;
// 	Classes.Player = Player;
	
// 	return Classes;
// })();