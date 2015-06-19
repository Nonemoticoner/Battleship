//(function () {

	// which ship is set currently
	// var hash = parseInt((window.location.hash).substr(1)) || null;
	var hash = 5;

	var nick = URI(window.location).query(true).nick;

	// get icons
	var spans =[], span, icons = [];;

	for(var i =0; i <100; i++){
		span = $("button:eq(" + i.toString() + ") span");
		spans.push(span);
	}

	for (var i = 0; i <10; i++) {
		var arr =[];
		for (var j = 0; j <10; j++)
			arr.push(spans[j+i*10]);
		icons.push(arr);
	}

	var set = new Set();

	// event on click
	$('a').on('click', function () {
		// get data
		var row = $(this).data().row,
			col = $(this).data().col,
			or = $(this).data().or;

		// create ship
		var ship = new Ship(letter2digit(col), row, or, hash);
		if(set.locate(ship)){
			alert("Error: Couldn't add there a ship because it collides with other ship or end of map");
			return;
		}
		
		// map ship so user can see
		for(var i =0; i <10; i++)
			for(var j =0; j <10; j++)
				if(set.map[i][j] == 1){
					$(icons[i][j]).removeClass("glyphicon-pencil").addClass("glyphicon-remove");
				}

		// to next ship choosing
		hash--;

		if(hash == 0){
			// send data to server with assigning set to exact player
			var dataToSend ={
				nick: nick,
				set: set
			};

			// ajax call here
			$.ajax({
				type: "POST",
				url: DOMAIN + ":" + PORT.toString() + "/register",
				dataType: "jsonp",
				data: dataToSend,
				success: function (res) {
					// go to next page when done (async)
					if(res)
						window.location.href = "lobby.html" + "?nick=" + nick;
					else
						alert("Something went wrong. Go to homepage and try again.");
					
				},
				error: function (error) {
					alert("An error occured while connecting to server. See log for details.");
					console.log(error);
				}
			});
		}
	});

//})();