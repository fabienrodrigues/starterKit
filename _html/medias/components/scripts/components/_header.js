
// --- MENU ---
var isMenuOpen = false;

// SWITCH MENU MOBILE
var switchMenu = function () {
	if (hasClass('#header', 'open')) {
		
		closeMenu();

	} else {

		openMenu();

	}

	return false;
};


var openMenu = function () {
	if(!isMenuOpen) {
		document.getElementById('header').classList.add('open');

		setTimeout(function() {
			$('html,body').css('overflow-y','hidden');

			$('#header .filter').on('touchmove',function(e) {
				e.preventDefault();
			});

			isMenuOpen = true;
		}, 250);
	}
};


var closeMenu = function () {
	document.getElementById('header').classList.remove('open');

	isMenuOpen = false;

	$('html,body').css({'overflow-y': 'auto'});
};