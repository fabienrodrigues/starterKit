
function checkDevice() {
    var $body = $('body');
    //CHECK DEVICE AND SET A CLASS TO THE BODY
    $body.removeClass('isMobile isTablet isDesktop isApple isAndroid isWindowsPhone isBlackberry no-touch');

    var deviceModel = getDeviceModel();
    var deviceKind  = getDeviceKind();

    for(var i in deviceModel) {
        $body.addClass(deviceModel[i]);
    }

    $body.addClass(deviceKind);

    if(!isTouchDevice() && !$body.hasClass('isAndroid') && !$body.hasClass('isIOS')) {
        $body.addClass('no-touch');
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

    if (navigator.userAgent.match(/iphone|ipod|ipad/i))             deviceModel.push('isIOS');
    if (navigator.userAgent.match(/Android/i))                      deviceModel.push('isAndroid');
    if (navigator.userAgent.match(/iemobile/i))                     deviceModel.push('isWindowsPhone');
    if (navigator.userAgent.match(/BlackBerry/i))                   deviceModel.push('isBlackberry');
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)  deviceModel.push('isFirefox');
    if (window.chrome)                                              deviceModel.push('isChrome');
    if (navigator.userAgent.match(/Android/i) && window.chrome)     deviceModel.push('isAndroid');

    return deviceModel;
}


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
