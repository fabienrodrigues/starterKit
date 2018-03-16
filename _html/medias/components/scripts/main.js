//=require ../../vendor/jquery/dist/jquery.min.js
//=require ../../vendor/fastclick/lib/fastclick.js
//=require ../../vendor/svgxuse/svgxuse.min.js


if (!Array.isArray(window.pageResize)) {
	window.pageResize = [];
}


// ----------------------------------- DOCUMENT READY -----------------------------------
// --------------------------------------------------------------------------------------
$(document).ready(function () {
	// --- INIT FUNCTIONS ---

	// CHECK DEVICE
	checkDevice();


	// RESET SCROLLTOP
	resetScroll();


    // --- ACTIONS ---
    $(window).on('resize', windowResize);


    // SWITCH MENU MOBILE
    var dragging = false;

    $("body").on("touchmove", function() {
        dragging = true;
    });


    $("body").on("touchstart", function() {
        dragging = false;
    });


    $('#header .navbar_toggle, #header .filter').on('touchend, click', function(e) {
        if(dragging) return;

        switchMenu();

        e.preventDefault();
    });


    $('.bt_open_popup').on('click', function(e) {
        var popupType = $(this).data('popup');
        var popup = new popupClass(popupType);

        popup.openPopup();

        e.preventDefault();
    });
});



// ----------------------------------- FUNCTIONS ----------------------------------------
// --------------------------------------------------------------------------------------

// --- WINDOW RESIZE ---
var rtime;
var timeout = false;
var delta = 100;

function windowResize() {
	rtime = new Date();

    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }


	if(window.checkDevice() != 'isMobile') {
		closeMenu(true);
	}
}


function resizeend() {
    if (new Date() - rtime < delta) {

        setTimeout(resizeend, delta);

    } else {

        timeout = false;
        
        try {
			for (var i in window.pageResize) {
				window.pageResize[i]();
			}
		}
		catch(e) {}

    }               
}


// RESET SCROLLTOP
function resetScroll() {
	$('html, body').scrollTop(0);
}


// ELEMENTS INVIEW
function showInview(e) {
	if(!$(e).hasClass('show')) 	$(e).addClass('show');
}