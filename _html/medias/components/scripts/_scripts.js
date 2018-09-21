//=require ./components/_utils.js
//=require ./components/_header.js
//=require ./components/_popup.js

if (!Array.isArray(window.pageResize)) {
	window.pageResize = [];
}

if (!Array.isArray(window.pageScroll)) {
    window.pageScroll = [];
}

var dragging = false;


// ----------------------------------- DOCUMENT READY -----------------------------------
// --------------------------------------------------------------------------------------
$(document).ready(function () {
    // --- INIT FUNCTIONS ---
    FastClick.attach(document.body);

	// CHECK DEVICE
    checkDevice();


    // --- ACTIONS ---

    // ON RESIZE
    window.onresize = windowResize;


    // ON SCROLL
    $(window).on('scroll', function() {
        var windowScroll = $(window).scrollTop();

        windowScrollFn(windowScroll);
    });


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


    // CLICK TO OPEN POPUP
    $('.open-popup').on('click', function(e) {
        var popupName = $(this).data('popup');
        var popup = new popupClass(popupName);

        popup.openPopup();

        e.preventDefault();
    });
});


$(window).load(function() {
    var body = document.getElementsByTagName('BODY')[0];
    body.classList.add('loaded');
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


	if(getDeviceKind() !== 'isMobile') {
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


function windowScrollFn(windowScroll) {
    var windowScroll = $(window).scrollTop();

    try {
        for (var i in window.pageScroll) {
            window.pageScroll[i](windowScroll);
        }
    }
    catch(e) {}
};