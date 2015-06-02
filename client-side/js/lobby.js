(function () {

	// get nick of player
	var nick = URI(window.location).query(true).nick;

	var address = DOMAIN + ":" + PORT.toString();

	$.ajax({
		type: "GET",
		url: address + "/lobby"
	}).done(function (res) {
		console.log(res);

		// assign res data to nicks
		var nicks = { players: ["machina", "yolo"] };

		// Handlebars
		var template = Handlebars.compile( $("#playersListTemplate").html() );
		$("ul#list").append( template(nicks) );

	});

	// refresh lobby list
	$("#refresh").on("click", function () {
		window.location.reload(true);
	});

	// catch if player was clicked
	$("a.nickname").on("click", function () {
		var opponent = $(this).data.nick;

		window.location.href = DOMAIN + "/game.html" + "?nick=" + nick + "&opponent=" + opponent;
	});
	
})();