
function checkDevice() {
    //CHECK DEVICE AND SET A CLASS TO THE BODY
    var widthDevice = window.widthDevice();
    $('body').removeClass('isMobile isTablet isDesktop isApple isAndroid isWindowsPhone isBlackberry no_touch');

    var deviceModel = null;
    var deviceKind = 'isDesktop';

    if (navigator.userAgent.match(/iphone|ipod|ipad/i))             deviceModel = 'isApple';
    if (navigator.userAgent.match(/Android/i))                      deviceModel = 'isAndroid';
    if (navigator.userAgent.match(/iemobile/i))                     deviceModel = 'isWindowsPhone';
    if (navigator.userAgent.match(/BlackBerry/i))                   deviceModel = 'isBlackberry';
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)  deviceModel = 'isFirefox';
    if (window.chrome)                                              deviceModel = 'isChrome';

    if (widthDevice <  768)                                         deviceKind = 'isMobile';
    if (widthDevice >= 768 && widthDevice < 992)                    deviceKind = 'isTablet';
    if (widthDevice >= 992)                                         deviceKind = 'isDesktop';

    $('body').addClass(deviceModel).addClass(deviceKind);

    if(!window.isTouchDevice()) { $('body').addClass('no_touch'); }

    return deviceKind;
}


function isTouchDevice() {
    if('ontouchstart' in document.documentElement) {

        return true;

    } else {

        return false;
        
    }
}


function widthDevice() {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}


function heightDevice() {
    return (window.innerHeight > 0) ? window.innerHeight : screen.height;
}
