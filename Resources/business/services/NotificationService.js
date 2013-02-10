function NotificationService() {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        self = this;

    function convertData(notification) {
        var data = _(notification).pick('id','source_id', 'source_type', 'full_content');
        data.unread = notification['unread?'];
        data.type = notification.notification_type;
        return data;
    }

    self.all = function (params) {
        params.auth_token = DB.getAuthToken();

        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','notifications',params);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.notifications) {
                for (var i = 0, l= json.notifications.length; i<l ; ++i) {
                    var notification = json.notifications[i].notification,
                        row_data = convertData(notification);
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
            api_deferred = api.request('GET','notifications/check',params);

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

    self.read = function (ids) {
        var params = {auth_token: DB.getAuthToken(), ids: JSON.stringify(ids)};
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','notifications/read',params);

        api_deferred.done(function (json) {
            if (json.success) {
                deferred.resolve(json);
            } else {
                deferred.reject(json);
            }
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

module.exports = NotificationService;