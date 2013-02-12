function MessageService() {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        self = this;

    function convertData(message) {
        var data = _(message).pick('id','title', 'content', 'sent_date', 'headline');
        data.unread = message['unread?'];
        if (message.user) {
            data.sender = message.user;
        }
        if (message.receivers) {
            data.receivers = _(message.receivers).map( function( r) {
                return r.receiver.username;
            });
        }
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
            if (json.messages) {
                for (var i = 0, l= json.messages.length; i<l ; ++i) {
                    var message = json.messages[i].message,
                        row_data = convertData(message);
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
            api_deferred = api.request('GET','messages/sent',params);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.messages) {
                for (var i = 0, l= json.messages.length; i<l ; ++i) {
                    var message = json.messages[i].message,
                        row_data = convertData(message);
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
            api_deferred = api.request('GET','messages/'+id,params);

        api_deferred.done(function (json) {
            var result = {};
            if (json.message) {
                result = convertData(json.message);
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