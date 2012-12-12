function LocationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DirectionListWindow = require('ui/common/modal/DirectionListWindow'),
        MapView = require('ui/common/MapView'),
        mapView = new MapView(),
        item = _args.data,
        annotations = [],
        steps = [],
        currentStep = 0,
        route = null,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var mapContainerView = Ti.UI.createView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 90
    }),
    bottomView = Ti.UI.createView({
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: '#BABABA'
    }),
    getDirectionButton = Ti.UI.createButton({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: 'transparent',
        backgroundSelectedColor: '#FFA600',
        backgroundFocusedColor: '#FFA600',
        title: L('get_direction'),
        font: {fontWeight: 'bold', fontSize: 32}
    }),
    directionView = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: 'transparent',
        zIndex: 1,
        visible: false
    }),
    directionListButton = Ti.UI.createButton({
        left: 0,
        right: 240,
        height: Ti.UI.FILL,
        backgroundColor: 'transparent',
        backgroundSelectedColor: '#FFA600',
        backgroundFocusedColor: '#FFA600',
        title: L('direction_list')
    }),
    nextButton = Ti.UI.createButton({
        right: 0,
        width: 120,
        height: 90,
        backgroundColor: 'transparent',
        title: '>',
        font: {fontWeight: 'bold', fontSize: 48},
        backgroundSelectedColor: '#FFA600',
        backgroundFocusedColor: '#FFA600'
    }),
    previousButton = Ti.UI.createButton({
        right: 120,
        width: 120,
        height: 90,
        backgroundColor: 'transparent',
        title: '<',
        font: {fontWeight: 'bold', fontSize: 48},
        backgroundSelectedColor: '#FFA600',
        backgroundFocusedColor: '#FFA600'
    });

    setupLocation(item);

    directionView.add(directionListButton);
    directionView.add(previousButton);
    directionView.add(nextButton);

    mapContainerView.add(mapView);
    bottomView.add(getDirectionButton);
    bottomView.add(directionView);

    self.add(mapContainerView);
    self.add(bottomView);

    getDirectionButton.addEventListener('click', getDirections);
    nextButton.addEventListener('click', navigationHandler);
    previousButton.addEventListener('click', navigationHandler);
    directionListButton.addEventListener('click',function (e) {
        var directionListWindow = new DirectionListWindow({steps: steps});
        directionListWindow.open({modal: true});
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        mapView.selectAnnotation(annotations[0]);
    });
    
    function setupLocation (item) {
        var annotation = Ti.Map.createAnnotation({
            image: '/images/pin.png',
            leftView: Ti.UI.createLabel({
                text: item.name,
                color: '#fff',
                backgroundColor: 'transparent'
            }),
            latitude: item.location.latitude,
            longitude: item.location.longitude,
            title: ''
        });

        mapView.setRegion({
            latitude: item.location.latitude,
            longitude: item.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        });

        mapView.addAnnotation(annotation);
        annotations.push(annotation);
    }

    function navigationHandler (e) {
        var annotation;
        if (e.source == nextButton) {
            ++currentStep;
            previousButton.enabled = true;
            if (currentStep < annotations.length) {
                annotation = annotations[currentStep];
                mapView.setLocation({
                    latitude: annotations[currentStep].latitude,
                    longitude: annotations[currentStep].longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                });
                mapView.selectAnnotation(annotation);
            } else {
                mapView.deselectAnnotation('');
                nextButton.enabled = false;
            }
        } else {
            --currentStep;
            nextButton.enabled = true;
            if (currentStep > 0) {
                annotation = annotations[currentStep];
                mapView.setLocation({
                    latitude: annotations[currentStep].latitude,
                    longitude: annotations[currentStep].longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                });
                mapView.selectAnnotation(annotation);
            } else {
                mapView.deselectAnnotation('');
                previousButton.enabled = false;
            }
        }
    }

    function panToRoute (data) {
        var region = {};
        region.latitude = (data.start_location.lat + data.end_location.lat) / 2,
        region.longitude = (data.start_location.lng + data.end_location.lng) / 2;
        region.latitudeDelta = Math.abs(data.start_location.lat - data.end_location.lat) + 0.01;
        region.longitudeDelta = Math.abs(data.start_location.lng - data.end_location.lng) + 0.01;

        mapView.setLocation(region);
    }

    function getDirections (e) {
        directionView.visible = true;
        directionListButton.enabled = false;
        previousButton.enabled = false;
        nextButton.enabled = false;
        getDirectionButton.visible = false;
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.purpose = 'Get Current Location';
            Ti.Geolocation.getCurrentPosition(function(e) {
                if (e.error) {
                    Ti.API.error('Error: ' + e.error);
                } else {
                    var direction = require('lib/direction'),
                    config = {
                        callback: locationCallBack
                    };

                    config.destination = item.location;
                    config.language = 'vi';
                    config.origin = e.coords;

                    direction.getDirections(config);
                }
            });
        } else {
            alert('Please enable location services');
        }
    }

    function locationCallBack (result) {
        route = result.route;
        steps = result.steps;
        mapView.addRoute(route);

        for (var i = 0, l=steps.length; i < l; ++i) {
            var annotation = Ti.Map.createAnnotation({
                latitude: steps[i].start_location.lat,
                longitude: steps[i].start_location.lng,
                image: '/images/round.png',
                title: '',
                leftView: Ti.UI.createLabel({
                    backgroundColor: 'transparent',
                    color: '#fff',
                    width: 450,
                    html: steps[i].html_instructions
                })
            });
            mapView.addAnnotation(annotation);
            annotations.push(annotation);
        }
        panToRoute(result);
        directionListButton.enabled = true;
        nextButton.enabled = true;
    }

    return self;
}

module.exports = LocationWindow;