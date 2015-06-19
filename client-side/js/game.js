(function () {
	
	// get uri
	var nick = URI(window.location).query(true).nick;
	var opponent = URI(

	// disable 'My Ships'
	for (var i = 0; i < 100; i++) {
		$($("#nick table button")[i]).addClass("disabled");
	}

	// local battle
	var battle = {};

	// download battle
	$.ajax({
		type: "GET",
		url: address + "/getBattle",
		dataType: "jsonp",
		success: function (res) {
			console.log(res);

			// add data to local objects
			battle = res.query;
			
			// My ships
			// map data to html
			var vector = [];

			// map => vector
			for (var i = 0; i < 10; i++)
				for (var j = 0; j < 10; j++)
					vector.push(map[i][j]);


			



		},
		error: function (error) {
			alert("An error occured while connecting to server. See log for details.");
			console.log(error);
		}
	});

})();