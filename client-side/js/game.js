(function () {
	
	// get uri
	var nick = URI(window.location).query(true).nick;
	var opponent = URI(window.location).query(true).opponent;

	var address = DOMAIN + ":" + PORT.toString();

	// disable 'My Ships'
	for (var i = 0; i < 100; i++) {
		$($("#nick table button")[i]).addClass("disabled");
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
			battle = res;
			
			// get DOM
			for (var i = 0, x = 0; i < 10; i++)
				for (var j = 0; j < 10; j++, x++)
					nick_map[i][j] = ($($("#nick button")[x]));

			for (var i = 0, x = 0; i < 10; i++)
				for (var j = 0; j < 10; j++, x++)
					opponent_map[i][j] = ($($("#opponent button")[x]));

			// map nick ships
			if(battle.attacker.nick == nick){
				for (var i = 0; i < 10; i++)
					for (var j = 0; j < 10; j++)
						if(battle.attacker.set.map[i][j] == 1)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-stop");
			}
			else if(battle.attacker.nick == opponent){
				for (var i = 0; i < 10; i++)
					for (var j = 0; j < 10; j++)
						if(battle.defender.set.map[i][j] == 1)
							$(nick_map[i][j].context.firstChild).addClass("glyphicon-stop");
			}


		},
		error: function (error) {
			alert("An error occured while connecting to server. See log for details.");
			console.log(error);
		}
	});

	// attack listener
	

})();