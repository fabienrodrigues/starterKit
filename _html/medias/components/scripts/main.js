//=require ../../vendor/jquery/dist/jquery.min.js
//=require ../../vendor/fastclick/lib/fastclick.js
//=require ../../vendor/svgxuse/svgxuse.min.js


if (!Array.isArray(window.pageResize)) {
	window.pageResize = [];
}

if (!Array.isArray(window.pageScroll)) {
    window.pageScroll = [];
}

if (!Array.isArray(window.cbUnveilImgLoaded)) {
    window.cbUnveilImgLoaded = [];
}
var dragging = false;


// ----------------------------------- DOCUMENT READY -----------------------------------
// --------------------------------------------------------------------------------------
$(document).ready(function () {
    // --- INIT FUNCTIONS ---
    FastClick.attach(document.body);

	// CHECK DEVICE
    checkDevice();
    
    // LAZY LOAD IMGS
    $("img").unveil(0, callbackUnveil);


    // --- ACTIONS ---
    $(window).on('resize', windowResize);


    // SWITCH MENU MOBILE
    $("body").on("touchmove", function() {
        dragging = true;
    });


    $("body").on("touchstart", function() {
        dragging = false;
    });


    $('#header .navbar-toggle, #header .filter').on('touchend, click', function(e) {
        if(dragging) return;

        switchMenu();

        e.preventDefault();
    });


    $('.open-popup').on('click', function(e) {
        var popupName = $(this).data('popup');
        var popup = new popupClass(popupName);

        popup.openPopup();

        e.preventDefault();
    });
});


$(window).load(function() {
    $('body').addClass('loaded');
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

        checkDevice();
        
        try {
			for (var i in window.pageResize) {
				window.pageResize[i]();
			}
		}
		catch(e) {}

    }               
}


function windowScrollFn() {
    var windowScroll = $(window).scrollTop();

    try {
        for (var i in window.pageScroll) {
            window.pageScroll[i]();
        }
    }
    catch(e) {}
};


// ELEMENTS INVIEW
function showInview(e) {
	if(!$(e).hasClass('show')) 	$(e).addClass('show');
}