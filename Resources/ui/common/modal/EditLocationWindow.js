function EditLocationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        SelectLocationWindow = require('ui/components/SelectLocationWindow'),
        GeoCoding = require('network/GeoCoding'),
        GEO = require('helpers/geo'),
        opts = _args,
        location = _args.data.location ? GEO.WKT.read(_args.data.location) : {},
        address = _args.data.address,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        left: 50,
        right: 50,
        height: 500
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('select_location')},theme.styles.popup.header.label)),
    locationField = Ti.UI.createTextArea({
        editable: false,
        left: 10,
        right: 10,
        top: 110,
        bottom: 90,
        height: 200
    }),
    locationButton = Ti.UI.createButton({
        top: 320,
        height: 90,
        left: 10,
        right: 10,
        enabled: false,
        title: L('select_location')
    }),
    bottomBar = new DoneCancelButtonBar({
        parentWin: self,
        handler: function (e) {
            var result = {
                location: 'POINT('+location.longitude+' '+location.latitude+')'
            };
            self.close();

            opts.handler(result);
        }
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(locationField);
    view.add(locationButton);
    view.add(bottomBar);
    self.add(view);

    locationButton.addEventListener('click', function (e) {
        var selectLocationWindow = new SelectLocationWindow({
            location: location,
            handler: function (e) {
                locationField.value = e.address;
                location = _(e).pick('latitude', 'longitude');
            }
        });

        selectLocationWindow.open();
    });

    self.addEventListener('click', function (e) {
        if (e.source == self) {
            self.close();
        }
    });

    self.addEventListener('open', function (e) {
        if (!_(location).isEmpty()) {
            var latlng = location.latitude + ',' + location.longitude;
            getAddress(latlng);
        } else if (address) {
            getLatLng(address);
        }
    });

    function getAddress (latlng) {
        GeoCoding.geocode({latlng: latlng}).done(function (result) {
            if (result[0]) {
                locationField.value = result[0].formatted_address;
            }
            locationButton.enabled = true;
        }).fail(function (e) {
            locationButton.enabled = true;
        });
    }

    function getLatLng (address) {
        GeoCoding.geocode({address: address}).done(function (result) {
            if (result[0]) {
                locationField.value = result[0].formatted_address;
                location = {
                    latitude: result[0].geometry.location.lat,
                    longitude: result[0].geometry.location.lng
                };
            }
            locationButton.enabled = true;
        }).fail(function (e) {
            locationButton.enabled = true;
        });
    }

    return self;
}

module.exports = EditLocationWindow;