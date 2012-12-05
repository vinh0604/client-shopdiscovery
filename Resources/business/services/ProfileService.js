function LogoutService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    var rules = [
            {field: 'password', regex: /^.{6,}$/, message: L('password_short')},
            {field: 'password_confirmation', custom: function(data){return (data.password == data.password_confirmation);}, message: L('password_not_match')}
        ];

    self.validate = function (data) {
        var errors = {};
        for(var i=0, rule; i<rules.length; ++i) {
            rule = rules[i];
            if (rule.regex) {
                if (!rule.regex.test(data[rule.field])) {
                    errors[rule.field] = rule.message;
                }
            } else if (_.isFunction(rule.custom)){
                if (!rule.custom(data)) {
                    errors[rule.field] = rule.message;
                }
            }
        }
        return errors;
    };

    self.load = function () {
        var data = {};
        data.auth_token = getToken();

        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','profile',data);

        api_deferred.done(function (json) {
            var result = {
                photo: api.HOST + json.avatar.url,
                first_name: json.contact.first_name,
                last_name: json.contact.last_name,
                gender: json.contact.gender,
                phone: json.contact.phone,
                identity: json.contact.identity,
                address: json.contact.address
            };
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

    self.process = function (data) {
        var params = {},
            contact = {
                first_name: data.first_name,
                last_name: data.last_name,
                gender: _.find(APP_CONST.DATA.GENDER_ARRAY,function (obj) {
                                return obj.value == data.gender;
                            }).code,
                phone: data.phone,
                // identity: data.identity,
                address: data.address
            };
        params.contact = JSON.stringify(contact);
        if (data.avatar) {
            params.avatar = data.avatar;
        }
        params.auth_token = getToken();

        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','profile',params);

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

    self.processChangePassword = function (data) {
        data.auth_token = getToken();

        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','passwords',data);

        api_deferred.done(function (json) {
            var db = Ti.Database.install('/database/appdata', 'appdata');
            db.execute('UPDATE users SET password = ?', data.password);
            db.close();
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            if (e.status == 401) {
                e.error = L('authentication_fail');
            } else if (e.status == 400 && _.has(e.error, 'current_password')) {
                e.error = {current_password: L('current_password_invalid')};
            }
            deferred.reject(e);
        });

        return deferred;
    };

    function getToken () {
        var db = Ti.Database.install('/database/appdata', 'appdata'),
            userRs = db.execute('SELECT * FROM users LIMIT 1'),
            token = "";

        if (userRs.isValidRow()) {
            token = userRs.fieldByName('authentication_token');
        }
        userRs.close();
        db.close();
        return token;
    }

    return self;
}

module.exports = LogoutService;