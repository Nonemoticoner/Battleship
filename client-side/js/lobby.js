(function () {

	// get nick of player
	var nick = URI(window.location).query(true).nick;

	var address = "http://nonemoticoner.asd-ent.pl" + ":" + PORT.toString();

	$.ajax({
		type: "GET",
		url: address + "/lobby",
		dataType: "jsonp",
		success: function (res) {
			console.log(res.query.nicks);

			// assign res data to nicks
			var nicks = res.query.nicks;

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
	$("a.nickname").on("click", function () {
		var opponent = $(this).data.nick;

		window.location.href = DOMAIN + "/battleship/client-side/game.html" + "?nick=" + nick + "&opponent=" + opponent;
	});
	
})();