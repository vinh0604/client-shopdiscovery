function ProductManagementService (_args) {
    var _ = require('lib/underscore'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (product) {
        var data = _(product).pick('id', 'name', 'barcode', 'category', 'specifics');
        return data;
    }

    self.one = function (id) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','products/'+id);

        api_deferred.done(function (json) {
            var result = convertData(json);
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.all = function (params) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','suggestions/products',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.barcode = function (barcode) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','products/barcode/'+barcode);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.create = function (params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','products', params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.update = function (id,params) {
        params.specifics = JSON.stringify(params.specifics);
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','products/'+id, params);

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

module.exports = ProductManagementService;