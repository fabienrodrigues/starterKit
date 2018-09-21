
// --- MENU ---
// SWITCH MENU MOBILE
var switchMenu = function () {
	if ($('#container_menu').hasClass('open')) {
		
		closeMenu(false);

	} else {

		openMenu();

	}

	return false;
};


var openMenu = function () {
	$('.navbar_toggle, #container_menu').addClass('open');

	setTimeout(function() {
		if(window.checkDevice() != 'isMobile') $('#header .filter').fadeIn(250);

		$('html,body').css('overflow-y','hidden');

		$('#header .filter').on('touchmove',function(e) {
		  e.preventDefault();
		});
	}, 250);
};


var closeMenu = function () {
	$('#header .filter').hide();
	$('.navbar_toggle, #container_menu').removeClass('open');

	$('html,body').css({'overflow-y': 'auto'});
};