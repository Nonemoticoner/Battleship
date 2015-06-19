(function () {

	// get nick of player
	var nick = URI(window.location).query(true).nick;

	var address = DOMAIN + ":" + PORT.toString();

	$.ajax({
		type: "GET",
		url: address + "/lobby",
		dataType: "jsonp",
		success: function (res) {
			// assign res data to nicks
			var nicks = { players: res };

			// Handlebars
			var template = Handlebars.compile( $("#playersListTemplate").html() );
			$("ul#list").append( template(nicks) );
		},
		error: function (error) {
			alert("An error occured while connecting to server. See log for details.");
			console.log(error);
		}
	});

	// refresh lobby list
	$("#refresh").on("click", function () {
		window.location.reload(true);
	});

	// catch if player was clicked
	$("ul#list").on("click", "a.nickname", function(e) {

		e.preventDefault();

		var opponent = $(this).context.dataset.nick;

		$.ajax({
			type: "POST",
			url: address + "/challange",
			dataType: "jsonp",
			data: {
				fighters: [nick, opponent]
			},
			success: function (res) {
				if(res == "challanged")
					alert("You have successfully challanged the player. Now one has to confirm it by challanging you as well.");
				else if(res == "ready")
					window.location.href = "game.html" + "?nick=" + nick + "&opponent=" + opponent;
				else
					alert("Something went wrong. Go back to homepage.");
			},
			error: function (error) {
				alert("An error occured while connecting to server. See log for details.");
				console.log(error);
			}
		});
	});
})();