function ShopService (_args) {
    var _ = require('lib/underscore'),
        GEO = require('helpers/geo'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop) {
        var data = _.pick(shop, 'id', 'name', 'description', 'phones', 'creator', 'website');
        data.address = shop.full_address;
        if (shop.photo) {
            data.photo = api.HOST + shop.photo.url;
        }
        if (shop.photos) {
            data.photos = _.map(shop.photos,function (p) {
                return p.photo ? {url: api.HOST + p.photo.url} : {url: ''};
            });
        }
        if (shop.location) {
            data.location = GEO.WKT.read(shop.location);
        }
        data.tags = _.pluck(shop.tags, 'value');
        data.rating = shop.avg_score ? shop.avg_score : 0;
        data.rating_count = shop.review_count ? shop.review_count : 0;
        return data;
    }

    self.one = function (id) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','shops/'+id);

        api_deferred.done(function (json) {
            var result = convertData(json);
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.all = function (data) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','shops',data);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.shops) {
                for (var i = 0, l= json.shops.length; i<l ; ++i) {
                    var shop = json.shops[i].shop,
                        row_data = convertData(shop);
                    result.rows.push(row_data);
                }
            }
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.checkFavorite = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','favorite_shops/' + id, params);

        api_deferred.done(function (json) {
            var result = json.favorite;
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.addFavorite = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('POST','favorite_shops/' + id, params);

        api_deferred.done(function (json) {
            if (json.success) {
                deferred.resolve(json.success);
            } else {
                deferred.reject({error: L('add_favorite_fail')});
            }
            
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.removeFavorite = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','favorite_shops/' + id, params);

        api_deferred.done(function (json) {
            if (json.success) {
                deferred.resolve(json.success);
            } else {
                deferred.reject({error: L('remove_favorite_fail')});
            }
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    return self;
}

module.exports = ShopService;