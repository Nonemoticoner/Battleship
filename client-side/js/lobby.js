(function () {

	// get nick of player
	var nick = URI(window.location).query(true).nick;

	var address = DOMAIN + ":" + PORT.toString();

	$.ajax({
		type: "GET",
		url: address + "/lobby"
	}).done(function (res) {
		console.log(res);

		// template action
		var list_template = $("#list");

		for (var i = list.length - 1; i >= 0; i--) {
			
			list_template.innerHTML += "<li class='list-group-item'><a href='#'>" + list[i] + "</a></li>";
		}
	});

	// refresh lobby list
	$("#refresh").on("click", function () {
		window.location.reload(true);
	});
	
})();