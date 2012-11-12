var MapView = (function(){
    var mapView;

    function createMapView() {
        mapView =  Ti.Map.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            animate: true,
            regionFit: true,
            mapType: Ti.Map.STANDARD_TYPE,
            userLocation: true
        });

        var myLocationButton = Ti.UI.createButton({
            backgroundColor: 'transparent',
            image: '/images/mylocation.png'
        });

        myLocationButton.addEventListener('click', function (e) {
            if (Ti.Geolocation.locationServicesEnabled) {
                Ti.Geolocation.purpose = 'Get Current Location';
                Ti.Geolocation.getCurrentPosition(function(e) {
                    if (e.error) {
                        Ti.API.error('Error: ' + e.error);
                    } else {
                        var currentLocation = {
                            latitude: e.coords.latitude,
                            longitude: e.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        };

                        mapView.setLocation(currentLocation);
                    }
                });
            } else {
                alert('Please enable location services');
            }
            mapView.fireEvent('location:current');
        });

        mapView.add(myLocationButton);
    }

    function getInstance() {
        if (!mapView) {
            createMapView();
        }
        return mapView;
    }

    return {
        getInstance:getInstance
    };
})();

module.exports = MapView;