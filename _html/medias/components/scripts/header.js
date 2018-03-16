
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


var whichTransitionEvent = function () {
	var t;
	var el = document.createElement("fakeelement");

	var transitions = {
		"transition": "transitionend",
		"OTransition": "oTransitionEnd",
		"MozTransition": "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	}

	for (t in transitions) {

		if (el.style[t] !== undefined) return transitions[t];

	}
}

var transitionEvent = whichTransitionEvent();

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


var closeMenu = function (firstCall) {
	$('#header .filter').hide();
	$('.navbar_toggle, #container_menu').removeClass('open');

	$('html,body').css({'overflow-y': 'auto'});
};