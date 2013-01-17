var GeoCoding = (function () {
    var _ = require('lib/underscore');
    _.mixin(require('lib/underscore.deferred'));

    var url = 'http://maps.googleapis.com/maps/api/geocode/json',
        defaultParams = {
            sensor: true,
            language: 'vi'
        };

    function geocode(_args) {
        var deferred = new _.Deferred(),
            params = _.defaults(_args, defaultParams),
            xhr = Ti.Network.createHTTPClient({
                onload: function () {
                    var json = JSON.parse(this.responseText);
                    if (json.status == 'OK') {
                        deferred.resolve(json.results);
                    } else {
                        deferred.reject(json);
                    }
                },
                onerror: function (e) {
                    deferred.reject(e.error);
                },
                timeout: 5000
            });
        xhr.open('GET', url);
        xhr.send(params);

        return deferred;
    }

    return {
        geocode: geocode
    };
})();

module.exports = GeoCoding;