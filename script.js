$(document).ready(function() {

	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	$('#nameBanner').append('<div class="pageSize">Page Width: ' + pageWidth + "</div>");
	$('#nameBanner').append('<div class="pageSize">Page Height: ' + pageHeight + "</div>");

	

	$(window).resize(function(){

		$( ".pageSize" ).remove();
		
		pageWidth = $(window).width();
		pageHeight = $(window).height();
		$('#nameBanner').append('<div class="pageSize">Page Width: ' + pageWidth + "</div>");
		$('#nameBanner').append('<div class="pageSize">Page Height: ' + pageHeight + "</div>");


	});

	
	

});
