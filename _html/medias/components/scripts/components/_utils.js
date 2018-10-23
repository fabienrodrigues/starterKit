
//CHECK DEVICE AND SET A CLASS TO THE BODY
function checkDevice() {
    var body = document.body;

    body.classList.remove('isMobile', 'isTablet', 'isDesktop', 'isApple', 'isAndroid', 'isWindowsPhone', 'isBlackberry', 'no-touch');

    var deviceModel = window.getDeviceModel();
    var deviceKind  = window.getDeviceKind();

    for(var i in deviceModel) {
        body.classList.add(deviceModel[i]);
    }

    body.classList.add(deviceKind);

    if(!isTouchDevice() && !hasClass(body, 'isAndroid') && !hasClass(body, 'isIOS')) {
        body.classList.add('no-touch');
    }
};


function getDeviceKind() {
    var widthDevice = window.widthDevice();
    var deviceKind = 'isDesktop';

    if (widthDevice <  768)                         deviceKind = 'isMobile';
    if (widthDevice >= 768 && widthDevice < 992)    deviceKind = 'isTablet';
    if (widthDevice >= 992)                         deviceKind = 'isDesktop';

    return deviceKind;
};


function getDeviceModel() {
    var deviceModel = [];
    var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (navigator.userAgent.match(/iphone|ipod|ipad/i))             deviceModel.push('isIOS');
    if (navigator.userAgent.match(/Android/i))                      deviceModel.push('isAndroid');
    if (navigator.userAgent.match(/iemobile/i))                     deviceModel.push('isWindowsPhone');
    if (navigator.userAgent.match(/BlackBerry/i))                   deviceModel.push('isBlackberry');
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)  deviceModel.push('isFirefox');
    if (window.chrome)                                              deviceModel.push('isChrome');
    if (navigator.userAgent.match(/Android/i) && window.chrome)     deviceModel.push('isAndroid');
    if (is_safari)                                                  deviceModel.push('isSafari');

    return deviceModel;
};


function isTouchDevice() {
    if(window.DocumentTouch && document instanceof DocumentTouch) {

        return true;

    } else {

        return false;
        
    }
};


function widthDevice() {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
};


function heightDevice() {
    return (window.innerHeight > 0) ? window.innerHeight : screen.height;
};


function hasClass( target, className ) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
};




// --- WINDOW RESIZE ---
if (!Array.isArray(window.pageResize)) {
    window.pageResize = [];
}

var delay = 100;
var throttled = false; // are we currently throttled?
var calls = 0;

function windowResize() {
    if (!throttled) {
        // actual callback actions
        checkDevice();
        
        try {
			for (var i in window.pageResize) {
				window.pageResize[i]();
			}
		}
        catch(e) {}
        

        // we're throttled!
        throttled = true;
        // set a timeout to un-throttle
        setTimeout(function () {
            throttled = false;
        }, delay);
    }
}

/* 
var rtime;
var timeout = false;
var delta = 60;
function windowResize() {
	rtime = new Date();

    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }


	if(getDeviceKind() !== 'isMobile') {
		closeMenu(true);
	}
};


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
}; */


// ON WINDOW SCROLL, EXECUTE FUNCTIONS
if (!Array.isArray(window.pageScroll)) {
    window.pageScroll = [];
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