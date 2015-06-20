(function () {
	
	// get uri
	var nick = URI(window.location).query(true).nick;
	var opponent = URI(window.location).query(true).opponent;

	var address = DOMAIN + ":" + PORT.toString();

	var isAttacker = undefined;

	// disable 'My Ships'
	for (var i = 0; i < 100; i++) {
		$($("#nick table button")[i]).addClass("disabled");
	}

	// disable 'Enemy Ships'
	for (var i = 0; i < 100; i++) {
		$($("#opponent table button")[i]).addClass("disabled");
	}

	// local battle
	var battle = {};

	// DOM
	var nick_map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
	opponent_map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

	// download battle on the beginning of game
	$.ajax({
		type: "GET",
		url: address + "/getBattle",
		dataType: "jsonp",
		data: {
			nick: nick,
			opponent: opponent
		},
		success: function (res) {
			// add data to local objects
			var att = new Player(res.attacker.nick, res.attacker.status, res.attacker.set),
				def = new Player(res.defender.nick, res.defender.status, res.defender.set);

			battle = new Battle(res.attacker.nick, res.defender.nick, [att, def]);

			// bring back ints
			for (var i = 0; i < 10; i++)
				for (var j = 0; j < 10; j++){
					battle.attacker.set.map[i][j] = parseInt(battle.attacker.set.map[i][j]);
					battle.defender.set.map[i][j] = parseInt(battle.defender.set.map[i][j]);
				}
			

			// update isAttacker
			(battle.attacker.nick == nick) ? isAttacker = true : isAttacker = false;
			
			// get DOM
			for (var i = 0, x = 0; i < 10; i++)
				for (var j = 0; j < 10; j++, x++)
					nick_map[i][j] = ($($("#nick button")[x]));

			for (var i = 0, x = 0; i < 10; i++)
				for (var j = 0; j < 10; j++, x++)
					opponent_map[i][j] = ($($("#opponent button")[x]));

			// map ships on map
			if(isAttacker){
				// map nick ships
				for (var i = 0; i < 10; i++)
					for (var j = 0; j < 10; j++)
						if(battle.attacker.set.map[i][j] == 1)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-stop");
						else if(battle.attacker.set.map[i][j] == 2)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-remove");
						else if(battle.attacker.set.map[i][j] == 3)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-certificate");

				// map opponent ships
				for (var i = 0; i < 10; i++)
					for (var j = 0; j < 10; j++)
						if(battle.defender.set.map[i][j] == 2)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-remove");
						else if(battle.defender.set.map[i][j] == 3)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-certificate");

			}
			else{
				// map nick ships
				for (var i = 0; i < 10; i++)
					for (var j = 0; j < 10; j++)
						if(battle.defender.set.map[i][j] == 1)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-stop");
						else if(battle.defender.set.map[i][j] == 2)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-remove");
						else if(battle.defender.set.map[i][j] == 3)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-certificate");

				// map opponent ships
				for (var i = 0; i < 10; i++)
					for (var j = 0; j < 10; j++)
						if(battle.attacker.set.map[i][j] == 2)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-remove");
						else if(battle.attacker.set.map[i][j] == 3)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-certificate");
			}

			// check if my turn
			if(isAttacker && battle.turn%2 == 0)
				for (var i = 0; i < 100; i++)
					$($("#opponent table button")[i]).removeClass("disabled");

			else if(!isAttacker && battle.turn%2 == 1)
				for (var i = 0; i < 100; i++) 
					$($("#opponent table button")[i]).removeClass("disabled");
			

		},
		error: function (error) {
			alert("An error occured while connecting to server. See log for details.");
			console.log(error);
		}
	});

	// attack listener
	$("#opponent button").on("click", function () {
		
		var x = $(this).data().x,
			y = $(this).data().y;

		// attack locally
		//0 empty space
		//1 ship
		//2 killed ship
		//3 missed shot
		switch( isAttacker ? battle.defender.attackedBy(battle.attacker, x, y) : battle.attacker.attackedBy(battle.defender, x, y)){
			case 0:	// miss
				$($(this).context.firstChild).addClass("glyphicon-certificate");

				// disable 'Enemy Ships'
				for (var i = 0; i < 100; i++) {
					$($("#opponent table button")[i]).addClass("disabled");
				}
				break;
			case 1:	// ship hit
				$($(this).context.firstChild).addClass("glyphicon-remove");

				// disable 'Enemy Ships'
				for (var i = 0; i < 100; i++) {
					$($("#opponent table button")[i]).addClass("disabled");
				}
				break;
			case 2:	// already hit
				alert("You can't shoot in the same place again!");
				break;
			case 3:	// already missed
				alert("You can't miss in the same place again!");
				break;
		}

		// increse turn
		battle.turn = parseInt(battle.turn)+1;
	
		// send updated battle object to server
		$.ajax({
			type: "POST",
			url: address + "/attack",
			dataType: "jsonp",
			data: battle,
			success: function (res) {
				if(!res)
					alert("No such battle is currently existing in database");
			},
			error: function (error) {
				alert("An error occured while connecting to server. See log for details.");
				console.log(error);
			}
		});

	});

	// refresh button
	// ...

})();