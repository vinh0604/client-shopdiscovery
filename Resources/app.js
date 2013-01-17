/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

(function() {
    //determine platform and form factor and render approproate components
    var osname = Ti.Platform.osname,
        version = Ti.Platform.version,
        height = Ti.Platform.displayCaps.platformHeight,
        width = Ti.Platform.displayCaps.platformWidth,
        NavigationController = require('business/NavigationController');
    
    // var Window = require('ui/common/LoginWindow'),
    var Window = require('ui/common/management/ShopInfoWindow'),
        controller = new NavigationController();
    // Android uses platform-specific properties to create windows.
    // All other platforms follow a similar UI pattern.
    // if (osname === 'android') {
    //     // Window = require('ui/handheld/android/ApplicationWindow');
    // }
    // else {
    //     // Window = require('ui/handheld/ApplicationWindow');
    // }
    // var win = new Window({controller: controller});
    var win = new Window({
        data: {id: 11},
        controller: controller
    });

    win.open();
})();