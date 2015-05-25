$(document).ready(function() {

	var pageWidth = $(window).width();
	var pageHeight = $(window).height();

	pageWidth = $(window).width();
	pageHeight = $(window).height();
	var idealWidth = 1000;
	var fontsize = 100;
	var percentage = pageWidth / idealWidth;
	var newFontSize = Math.floor(fontsize * percentage) -1;
	$(".nameBanner").css("font-size", newFontSize);

	
	$(window).resize(function(){
		pageWidth = $(window).width();
		pageHeight = $(window).height();
		percentage = pageWidth / idealWidth;
		newFontSize = Math.floor(fontsize * percentage) -1;
		$(".nameBanner").css("font-size", newFontSize);










	});



});
