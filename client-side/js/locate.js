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
					console.log("iy: " + i + ", jx: " + j);
					$(icons[i][j]).removeClass("glyphicon-pencil").addClass("glyphicon-remove");
				}

		// to next ship choosing
		hash--;

		if(!hash){
			// send data to server with assigning set to exact player
			var data ={
				map: set.map,
				ships: set:ships
			};

			// ajax call here
			// ...

			// go to next page when done (async)
			window.location.href = DOMAIN + "/lobby.html" + "?nick=" + nick;
		}
		
	});

//})();