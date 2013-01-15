var PhotoService = (function () {
    var api = require('network/ShopDiscoveryAPI'),
        DB = require('business/database'),
        _ = require('lib/underscore');

    function upload (media) {
        var deferred = new _.Deferred(),
            url = api.API_URL + 'photos',
            xhr = Ti.Network.createHTTPClient({});
        xhr.onload = function () {
            var json = JSON.parse(this.responseText);
            if (this.status == 200 || this.status == 201) {
                var url = api.HOST + json.image.url;
                deferred.resolve({complete: true, photo: {
                    id: json.id,
                    url: url
                }});
            } else {
                deferred.reject({status: this.status, error: json});
            }
        };
        xhr.onerror = function (e) {
            if (this.status) {
                var json;
                try {
                    json = JSON.parse(this.responseText);
                } catch(ex) {
                    json = this.responseText;
                }
                deferred.reject({status: this.status, error: json});
            } else {
                deferred.reject(e);
            }
        };
        xhr.onsendstream = function (e) {
            deferred.resolve({complete: false, progress: e.progress});
        };
        xhr.open('POST', url);
        xhr.send({
            auth_token: DB.getAuthToken(),
            image: media
        });

        return {deferred: deferred.promise(), xhr: xhr};
    }

    return {
        upload: upload
    };
})();

module.exports = PhotoService;