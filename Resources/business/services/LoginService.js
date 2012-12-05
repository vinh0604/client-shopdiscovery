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
            userRs = db.execute('SELECT * FROM users WHERE email = ? LIMIT 1', json.email);
            if (userRs.isValidRow()) {
                db.execute('UPDATE users SET authentication_token = ? WHERE email = ?', json.authentication_token, json.email);
            } else {
                db.execute('INSERT INTO users(username, password, email, authentication_token) VALUES(?,?,?,?)',
                            json.username, data.password, json.email, json.authentication_token);
            }

            userRs.close();
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

    return self;
}

module.exports = LoginService;