(function () {

	var address = DOMAIN + ":" + PORT.toString();
	
	var join = $("button#submit"),
		form = $("input");

	join.on('click', function (e) {
		e.preventDefault();

		var nickname = form[0].value;console.log(nickname);

		$.ajax({
			type: "GET",
			url: "http://nonemoticoner.asd-ent.pl" + ":" + PORT.toString() + "/isAvailable",
			dataType: "jsonp",
			data: {
				nick: nickname
			},
			success: function (res) {console.log(res);
				if(res)
					window.location.href = DOMAIN + "/battleship/client-side/locate-set.html" + "?nick=" + nickname;
				else
					alert("Error: There is already such nick taken. Choose different one!");
			},
			error: function (error) {
				alert("An error occured while connecting to server. See log for details.");
				console.log(error);
			}
		});

		
		
	});

})();