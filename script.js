$(document).ready(function() {

	$('img').fadeTo(1000, 1.0);

    $('.bodySecEntry').mouseenter(function () {
		$(this).fadeTo('fast', 1.0);
		$(this).siblings( ".secHeader" ).fadeTo('fast', 1.0);
	});

    $('.bodySecEntry').mouseleave(function () {
		$(this).fadeTo('slow', 0.6);
		$(this).siblings( ".secHeader" ).fadeTo('slow', 0.6);
	});

});
