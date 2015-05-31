//(function () {

	// which ship is set currently
	//var hash = parseInt((window.location.hash).substr(1)) || null;
	var hash = 5;

	var	spans = $("button:nth-child(0) span");
	console.log(spans.removeClass("glyphicon-pencil").addClass("glyphicon-remove"));
	var icons =[];

	// for (var i = 0; i <10; i++) {
	// 	var arr =[];
	// 	for (var j = 0; j <10; j++)
	// 		arr.push(spans[j+i*10]);
	// 	icons.push(arr);
	// }
	// console.log(icons);

	var set = new Set();

	// script for locate-set.html
	$('a').on('click', function () {
		// get data
		var row = $(this).data().row,
			col = $(this).data().col,
			or = $(this).data().or;

		// create ship
		var ship = new Ship(letter2digit(col), row, or, hash);
		if(set.locate(ship)){
			alert("Error: Couldn't add there a ship because it collides with other ship or end of map");
		}
		console.log(ship);
		console.log(set);
		// map ship so user can see
		for(var i =0; i <10; i++)
			for(var j =0; j <10; j++)
				if(set.map[i][j] == 1){
					console.log("iy: " + i + ", jx: " + j);
					$(icons[i][j]).removeClass("glyphicon-pencil").addClass("glyphicon-remove");
				}

		// to next ship choosing
		hash--;
		
	});

//})();