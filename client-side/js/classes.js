// var Classes = (function () {
// 	var Classes ={};

	var Ship =(function () {
		function Ship (x, y, orientation, length) {
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

		{}.defineProperty(Ship.prototype, "isDead", {
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
		function Set (ships) {
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
			this.ships = ships || [];

			// locates all ships on map
			for (var i = this.ships.length - 1; i >= 0; i--) {
				this.locate(this.ships[i])
			}
		}

		Set.prototype.locate = function(ship) {
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

		return Ship;
	})();

// 	Classes.Ship = Ship;
// 	Classes.Set = Set;
// 	Classes.Player = Player;
	
// 	return Classes;
// })();