//=require ./components/_utils.js
//=require ./components/_header.js
//=require ./components/_popup.js

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
    window.addEventListener('orientationchange', windowResize);


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
    $('#container').on('click', '.open-popup', function(e) {
        var popupName = $(this).data('popup');
        var popup = new popupClass(popupName);

        popup.openPopup();

        e.preventDefault();
    });
});


$(window).load(function() {
    document.body.classList.add('loaded');
});



// ----------------------------------- FUNCTIONS ----------------------------------------
// --------------------------------------------------------------------------------------