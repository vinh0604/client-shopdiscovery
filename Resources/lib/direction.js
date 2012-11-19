var Direction = (function() {
    var url = 'http://maps.googleapis.com/maps/api/directions/json';

    function decodePoly (encoded) {
        var poly = [];
        var index = 0, len = encoded.length,
            lat = 0, lng = 0;

        while (index < len) {
            var b, shift = 0, result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            var p = {
                latitude: lat * 1E-5,
                longitude: lng * 1E-5
            };
            poly.push(p);
        }

        return poly;
    }

    function getDirections (config) {
        var origin = config.origin,
        destination = config.destination,
        xhr = Ti.Network.createHTTPClient({
            onload: function () {
                var json = JSON.parse(this.responseText),
                    result = {};
                Ti.API.info(json);
                result.route = {
                    color: config.color || '#4086FF',
                    width: config.width || 7
                };
                result.route.points = decodePoly(json.routes[0].overview_polyline.points);
                result.steps = json.routes[0].legs[0].steps;
                result.start_location = json.routes[0].legs[0].start_location;
                result.end_location = json.routes[0].legs[0].end_location;
                config.callback(result);
            },
            onerror: function (e) {
                alert(e.error);
            },
            timeout: 5000
        });

        xhr.open('GET', url);

        if (origin.latitude !== undefined && origin.longitude !== undefined) {
            origin = origin.latitude.toString() + ',' + origin.longitude.toString();
        }

        if (destination.latitude !== undefined && destination.longitude !== undefined) {
            destination = destination.latitude.toString() + ',' + destination.longitude.toString();
        }
        xhr.send({
            sensor: false,
            origin: origin,
            destination: destination,
            language: config.language
        });
    }

    return {
        getDirections: getDirections
    };
})();

module.exports = Direction;