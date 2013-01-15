PhotoRecognitionAPI = (function () {
    var _ = require('lib/underscore'),
        moment = require('lib/moment'),
        CryptoJS = require('lib/hmac-sha1');
    _.mixin(require('lib/underscore.deferred'));

    var QUERY_URL = 'http://api.iqengines.com/v1.2/query/',
        UPDATE_URL = 'http://api.iqengines.com/v1.2/update/',
        API_KEY = '0a71e5d3e573474783753de2f9c93ef8',
        SECRET_KEY = 'dced0a82941843c5b119ddf54fdefeed';
    function send (image) {
        var deferred = new _.Deferred(),
            xhr = Ti.Network.createHTTPClient({});
        xhr.timeout = 15000;
        xhr.onload = function () {
            var json = JSON.parse(this.responseText);
            if (!json.data.error) {
                var update_xhr = Ti.Network.createHTTPClient({});
                update_xhr.timeout = 15000;
                update_xhr.onload = function () {
                    var json = JSON.parse(this.responseText);
                    if (!json.data.error) {
                        var result;
                        if (json.data.results && json.data.results.length &&
                                json.data.results[0].qui_data) {
                            result = json.data.results[0].qui_data.labels;
                        } else {
                            result = '';
                        }
                        deferred.resolve(result);
                    } else {
                        deferred.reject({error: json.data.comment});
                    }
                };
                update_xhr.onerror = function (e) {
                    deferred.reject({error: this.responseText});
                };
                update_xhr.open('POST', QUERY_URL);
                var params = {
                    json: 1,
                    api_key: API_KEY,
                    time_stamp: moment().format('YYYYmmDDHHMMSS')
                },
                message = 'api_key'+API_KEY+
                            'json1'+
                            'time_stamp'+params.time_stamp;
                params.api_sig = CryptoJS.HmacSHA1(message, SECRET_KEY);
                update_xhr.send(params);
            } else {
                deferred.reject({error: json.data.comment});
            }
        };
        xhr.onerror = function (e) {
            deferred.reject({error: this.responseText});
        };
        xhr.open('POST', QUERY_URL);
        var params = {
            json: 1,
            api_key: API_KEY,
            img: image,
            time_stamp: moment().format('YYYYmmDDHHMMSS')
        },
        message = 'api_key'+API_KEY+
                    'img'+image.nativePath+
                    'json1'+
                    'time_stamp'+params.time_stamp;
        params.api_sig = CryptoJS.HmacSHA1(message, SECRET_KEY);
        xhr.send(params);

        return deferred;
    }

    return {
        send: send
    };
})();

module.exports = PhotoRecognitionAPI;