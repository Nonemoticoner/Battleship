(function () {

	var address = DOMAIN + ":" + PORT.toString();
	
	var join = $("button#submit"),
		form = $("input");

	join.on('click', function (e) {
		e.preventDefault();

		var nick = form[0].value;

		$.ajax({
			type: "POST",
			url: address + "/register",
			data: {
				nick: nick
			}
		}).done(function (res) {
			console.log(res);
			

			// go to next page when success (async)
			if(false)
				window.location.href = DOMAIN + "/locate-set.html" + "?nick=" + nick;
			else
				alert("Error: There is already such nick taken. Choose different one!");
		});
	});

})();