function ManagerService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        DB = require('business/database'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (manager) {
        var data = _.pick(manager, 'id', 'owner', 'user');
        if (data.user.avatar) {
            data.user.avatar = api.HOST + data.user.avatar;
        } else {
            data.user.avatar = APP_CONST.DEFAULT.USER_PHOTO;
        }
        return data;
    }

    self.shop = function (shop_id) {
        var params = {shop_id: shop_id},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','managers',params);

        api_deferred.done(function (json) {
            var result = [];
            for (var i = 0, l= json.length; i<l ; ++i) {
                var manager = json[i],
                    row_data = convertData(manager);
                result.push(row_data);
            }
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.create = function (params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','managers',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.remove = function (id, params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','managers/' + id,params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    return self;
}

module.exports = ManagerService;