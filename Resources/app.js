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
    
    var Window = require('ui/common/LoginWindow'),
        controller = new NavigationController();
    // Android uses platform-specific properties to create windows.
    // All other platforms follow a similar UI pattern.
    // if (osname === 'android') {
    //     // Window = require('ui/handheld/android/ApplicationWindow');
    // }
    // else {
    //     // Window = require('ui/handheld/ApplicationWindow');
    // }
    var data = {
            first_name: 'Vinh',
            last_name: 'Bachsy',
            gender: 1,
            phone: '01689951370',
            identity: '024340647',
            address: '108/7, duong 11, Linh Xuan, Thu Duc'
        },
        win = new Window({controller: controller});

    win.open();
})();