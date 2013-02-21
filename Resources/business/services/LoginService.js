function LoginService (_args) {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    self.process = function (data) {
        if (_.isEmpty(data)) {
            var db = Ti.Database.install('/database/appdata', 'appdata'),
                userRs = db.execute('SELECT * FROM users LIMIT 1');
            data = {};

            if (userRs.isValidRow()) {
                data.login = userRs.fieldByName('email');
                data.password = userRs.fieldByName('password');
            }

            userRs.close();
            db.close();
        }

        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','sessions',data);

        api_deferred.done(function (json) {
            var db = Ti.Database.install('/database/appdata', 'appdata');
            db.execute('DELETE FROM users');
            db.execute('INSERT INTO users(username, password, email, authentication_token) VALUES(?,?,?,?)',
                json.username, data.password, json.email, json.authentication_token);
            db.close();

            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            var error = {status: e.status};
            if (e.status == 403) {
                error.message = L('login_failed');
            } else {
                error.message = e.error;
            }
            deferred.reject(error);
        });

        return deferred;
    };

    self.getCurrentUser = function () {
        var DB = require('business/database');
        return DB.getCurrentUser();
    };

    return self;
}

module.exports = LoginService;