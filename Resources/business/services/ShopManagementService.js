function ShopManagementService (_args) {
    var _ = require('lib/underscore'),
        GEO = require('helpers/geo'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop) {
        var data = _.pick(shop, 'id', 'name', 'description', 'phones',
                'website', 'is_owner', 'street_address', 'district',
                'city', 'location');
        data.address = shop.full_address;
        if (shop.photo) {
            data.photo = api.HOST + shop.photo.url;
        }
        if (shop.photos) {
            data.photos = _.map(shop.photos,function (p) {
                return p.photo ? {url: api.HOST + p.photo.url, id: p.photo.id} : {url: '', id: null};
            });
        }
        data.tags = _.pluck(shop.tags, 'value');
        data.rating = shop.avg_score ? shop.avg_score : 0;
        data.rating_count = shop.review_count ? shop.review_count : 0;
        return data;
    }

    self.one = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','managements/shops/'+id, params);

        api_deferred.done(function (json) {
            var result = convertData(json);
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.all = function () {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','managements/shops',params);

        api_deferred.done(function (json) {
            var result = [];
            if (json.shops) {
                for (var i = 0, l= json.shops.length; i<l ; ++i) {
                    var shop = json.shops[i].shop,
                        row_data = convertData(shop);
                    result.push(row_data);
                }
            }
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.update = function (id, params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','managements/shops/' + id,params);

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
            api_deferred = api.request('POST','managements/shops',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.remove = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','managements/shops/' + id, params);

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

module.exports = ShopManagementService;