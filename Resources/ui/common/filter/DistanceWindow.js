function DistanceWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        SelectLocationWindow = require('ui/components/SelectLocationWindow'),
        GeoCoding = require('network/GeoCoding'),
        opts = _args,
        location = opts.location,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        width : theme.platformWidth - 100,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('distance_text')},theme.styles.popup.header.label)),
    locationLabel = Ti.UI.createLabel({
        top: 100,
        left: 10,
        text: L('current_location'),
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000'
    }),
    locationTextArea = Ti.UI.createTextArea({
        left: 10,
        right: 10,
        top: 140,
        editable: false,
        height: 200
    }),
    locationButton = Ti.UI.createButton({
        top: 350,
        height: 90,
        left: 10,
        right: 10,
        title: L('select_location')
    }),
    distanceLabel = Ti.UI.createLabel({
        text: L('distance_text'),
        font: {fontSize: 30, fontWeight: 'bold'},
        left: 10,
        color: '#000',
        top: 475
    }),
    distanceField = Ti.UI.createTextField({
        width: 200,
        right: 80,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        top: 450
    }),
    unitLabel = Ti.UI.createLabel({
        text: L('km'),
        font: {fontSize: 30},
        right: 20,
        color: '#000',
        top: 475
    }),
    buttonBar = new CustomButtonBar({
        top: 550,
        buttons: [L('clear'),L('done')],
        handler: function (e) {
            if (e.index) {
                e.location = null;
                e.distance = distanceField.value;
                self.close();
                opts.handler(e);
            } else {
                distanceField.value = '';
            }
        }
    });

    locationButton.addEventListener('click', function (e) {
        var selectLocationWindow = new SelectLocationWindow({location: location});

        selectLocationWindow.open();
    });

    self.addEventListener('open', function (e) {
        if (location) {
            var latlng = location.latitude + ',' + location.longitude;
            getAddress(latlng);
        } else {
            location = {};
            if (Ti.Geolocation.locationServicesEnabled) {
                Ti.Geolocation.purpose = 'Get Current Location';
                Ti.Geolocation.getCurrentPosition(function(e) {
                    if (e.error) {
                        Ti.API.error('Error: ' + e.error);
                    } else {
                        var latlng = e.coords.latitude + ',' + e.coords.longitude;
                        _.extend(location, e.coords);
                        getAddress(latlng);
                    }
                });
            } else {
                alert('Please enable location services');
            }
        }
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(distanceLabel);
    view.add(distanceField);
    view.add(unitLabel);
    view.add(locationLabel);
    view.add(locationTextArea);
    view.add(locationButton);
    view.add(buttonBar);
    self.add(view);

    function getAddress (latlng) {
        GeoCoding.geocode({latlng: latlng}).done(function (result) {
            if (result[0]) {
                locationTextArea.value = result[0].formatted_address;
            }
        });
    }

    return self;
}

module.exports = DistanceWindow;