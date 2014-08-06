$(document).ready(function() {

	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	$('#contentDiv').append('<div class="pageSize">Page Width: <strong>' + pageWidth + "</strong></div>");
	$('#contentDiv').append('<div class="pageSize">Page Height: <strong>' + pageHeight + "</strong></div>");
	
	$(window).resize(function(){
		$( ".pageSize" ).remove();
		pageWidth = $(window).width();
		pageHeight = $(window).height();
		$('#contentDiv').append('<div class="pageSize">Page Width: <strong>' + pageWidth + "</strong></div>");
		$('#contentDiv').append('<div class="pageSize">Page Height: <strong>' + pageHeight + "</strong></div>");
	});
});
