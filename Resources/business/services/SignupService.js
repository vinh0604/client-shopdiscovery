function SignupService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    var rules = [
            {field: 'username', regex: /^\w+$/, message: L('username_invalid')},
            {field: 'username', regex: /^.{4,20}$/, message: L('username_length_invalid')},
            {field: 'email', regex: /^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$/, message: L('email_invalid')},
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

    self.process = function (data) {
        data.gender = _.find(APP_CONST.DATA.GENDER_ARRAY, function(obj) {return obj.value == data.gender;}).code;
        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','users',data);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            var errors = {};
            alert(JSON.stringify(e));
            if (e.status == 400) {
                if (e.error.username &&
                        _.any(e.error.username, function(str) {return str.indexOf('taken') !== -1;})) {
                    errors.username = L('username_existed');
                }
                if (e.error.email &&
                        _.any(e.error.email, function(str) {return str.indexOf('taken') !== -1;})) {
                    errors.email = L('email_existed');
                }
            } else {
                errors.all = e.error;
            }
            deferred.reject(errors);
        });

        return deferred;
    };

    return self;
}

module.exports = SignupService;