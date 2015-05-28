(function () {

	var address = "http://nonemoticoner.asd-ent.pl:3001";
	
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
			alert("sent");
		});
	});

})();