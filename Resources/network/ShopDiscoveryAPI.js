var ShopDiscoveryAPI = (function () {
    var _ = require('lib/underscore');
    _.mixin(require('lib/underscore.deferred'));

    // var API_URL = 'http://113.173.29.163:3000/api/v1/',
    //     HOST = 'http://113.173.29.163:3000';

    var API_URL = 'http://192.168.1.10:3000/api/v1/',
        HOST = 'http://192.168.1.10:3000';

    function request(method, path, params) {
        var deferred = new _.Deferred(),
            url = API_URL + path,
            xhr = Ti.Network.createHTTPClient({});
        xhr.timeout = 15000;
        xhr.onload = function () {
            var json = JSON.parse(this.responseText);
            if (this.status == 200 || this.status == 201) {
                deferred.resolve(json);
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
        method = method ? method : 'GET';

        if (method.toLowerCase() == 'put' || method.toLowerCase() == 'delete') {
            params._method = method;
            xhr.open('POST', url);
        } else {
            xhr.open(method, url);
        }
        xhr.send(params);

        return deferred;
    }

    return {
        HOST: HOST,
        API_URL: API_URL,
        request: request
    };
})();

module.exports = ShopDiscoveryAPI;