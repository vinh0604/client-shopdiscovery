function LogoutService (_args) {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    self.process = function (logoutOnAppExit) {
        var db = Ti.Database.install('/database/appdata', 'appdata'),
            userRs = db.execute('SELECT * FROM users LIMIT 1'),
            data = {};

        if (userRs.isValidRow()) {
            data.auth_token = userRs.fieldByName('authentication_token');
        }
        userRs.close();
        db.close();

        var deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','sessions',data);

        api_deferred.done(function (json) {
            if (!logoutOnAppExit) {
                var db = Ti.Database.install('/database/appdata', 'appdata');
                db.execute('DELETE FROM users');
                db.execute('DELETE FROM profile');
                db.execute('DELETE FROM search_histories');
                db.close();
            }
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

module.exports = LogoutService;