function SelectLocationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        opts = _args,
        location = {},
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('select_location')},theme.styles.header.label)),
    mapContainerView = Ti.UI.createView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 90
    }),
    myLocationButton = Ti.UI.createButton({
        top: 10,
        left: 10,
        zIndex: 1,
        backgroundColor: 'transparent',
        image: '/images/mylocation.png'
    }),
    mapWebView = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        url: '/map.html'
    }),
    doneCancelButtonBar = new DoneCancelButtonBar({
        parentWin: self,
        handler: function (e) {
            
        }
    });

    headerView.add(headerLabel);

    mapContainerView.add(myLocationButton);
    mapContainerView.add(mapWebView);

    self.add(headerView);
    self.add(mapContainerView);
    self.add(doneCancelButtonBar);

    myLocationButton.addEventListener('click', selectMyLocation);

    mapWebView.addEventListener('load', function (e) {
        if (opts.location) {
            Ti.App.fireEvent('app:locationMoved', {
                latitude: opts.location.latitude,
                longitude: opts.location.longitude
            });
        } else {
            selectMyLocation(e);
        }
    });

    self.addEventListener('open', function (e) {
        Ti.App.addEventListener('webview:locationSelected', selectLocation);
    });

    self.addEventListener('close', function (e) {
        Ti.App.removeEventListener('webview:locationSelected', selectLocation);
    });

    function selectLocation (e) {
        location.latitude = e.latitude;
        location.longitude = e.longitude;
        location.address = e.address;
    }

    function selectMyLocation (e) {
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.purpose = 'Get Current Location';
            Ti.Geolocation.getCurrentPosition(function(e) {
                if (e.error) {
                    Ti.API.error('Error: ' + e.error);
                } else {
                    Ti.App.fireEvent('app:locationMoved', {
                        latitude: e.coords.latitude,
                        longitude: e.coords.longitude
                    });
                }
            });
        } else {
            alert('Please enable location services');
        }
    }

    return self;
}

module.exports = SelectLocationWindow;