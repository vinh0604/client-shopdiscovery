function MessageService() {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        self = this;

    function convertData(message_receiver) {
        var data = {};
        return data;
    }

    self.all = function (params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','messages',params);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.message_receivers) {
                for (var i = 0, l= json.message_receivers.length; i<l ; ++i) {
                    var message_receiver = json.message_receivers[i].message_receiver,
                        row_data = convertData(message_receiver);
                    result.rows.push(row_data);
                }
            }
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            }
            deferred.reject(e);
        });

        return deferred;
    };

    self.all_sent = function (params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','messages',params);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.message_receivers) {
                for (var i = 0, l= json.message_receivers.length; i<l ; ++i) {
                    var message_receiver = json.message_receivers[i].message_receiver,
                        row_data = convertData(message_receiver);
                    result.rows.push(row_data);
                }
            }
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            }
            deferred.reject(e);
        });

        return deferred;
    };

    self.check = function () {
        var params = {auth_token: DB.getAuthToken()};
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','messages/check',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            }
            deferred.reject(e);
        });

        return deferred;
    };

    self.get = function (id) {
        var params = {auth_token: DB.getAuthToken()};
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','messages/'+id,params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            }
            deferred.reject(e);
        });

        return deferred;
    };

    self.compose = function (params) {
        params.auth_token = DB.getAuthToken();
        params.receivers = JSON.stringify(params.receivers);
        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','messages',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            }
            deferred.reject(e);
        });

        return deferred;
    };

    self.remove = function (id, params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','messages/'+id,params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            }
            deferred.reject(e);
        });

        return deferred;
    };

    return self;
}

module.exports = MessageService;