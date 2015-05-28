(function () {
	var sh = new Ship(0, 0, true, 1);
	console.log(sh);

	// which ship is set currently
	var hash =parseInt((window.location.hash).substr(1)) || null;

	// script for locate-set.html
	$('a').on('click', function () {
		var row = $(this).data().row,
			col = $(this).data().col,
			or = $(this).data().or;


		
	});

})();