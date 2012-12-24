function CategoryService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    self.shop = function (args) {
        var deferred = new _.Deferred(),
            params = _.omit(args, 'shop_id'),
            api_deferred = api.request('GET','shops/'+args.shop_id+'/categories',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.all = function (params) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','categories',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.list = function (data) {
        var params = {};
        if (data.category) {
            params.category_id = data.category;
        }
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','categories/list',params);

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

module.exports = CategoryService;