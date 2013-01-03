function ShopProductService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        DB = require('business/database'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop_product) {
        var data = _.pick(shop_product, 'id', 'price');
        var status = _.find(APP_CONST.DATA.CONDITION_ARRAY, function (c) {
            return c.code == shop_product.status;
        });
        data.status = status ? status.value : '';
        data.shop = shop_product.shop.name;
        if (shop_product.product) {
            data.name = shop_product.product.name;
            data.category = shop_product.product.category ? shop_product.product.category.name : '';
        }
        if (shop_product.photo) {
            data.photo = api.HOST + shop_product.photo.url;
        } else {
            data.photo = APP_CONST.DEFAULT.NO_PHOTO;
        }
        data.rating = shop_product.avg_score ? shop_product.avg_score : 0;
        data.rating_count = shop_product.review_count ? shop_product.review_count : 0;
        data.price_unit = 'VND';
        return data;
    }

    function convertDetailData (shop_product) {
        var data = _.pick(shop_product,'id', 'price', 'warranty', 'shop', 'description'),
            status = _.find(APP_CONST.DATA.CONDITION_ARRAY, function (c) {
                return c.code == shop_product.status;
            }),
            origin = _.find(APP_CONST.DATA.ORIGIN_ARRAY, function (o) {
                return o.code == shop_product.origin;
            });
        data.status = status ? status.value : '';
        data.origin = origin ? origin.value : '';
        if (shop_product.product) {
            data.product_id = shop_product.product.id;
            _.extend(data, _.pick(shop_product.product, 'name', 'category', 'barcode', 'specifics'));
        }
        if (shop_product.photos) {
            data.photos = _.map(shop_product.photos,function (p) {
                return p.photo ? {url: api.HOST + p.photo.url} : {url: ''};
            });
        }
        data.rating = shop_product.avg_score ? shop_product.avg_score : 0;
        data.rating_count = shop_product.review_count ? shop_product.review_count : 0;
        data.price_unit = 'VND';
        return data;
    }

    self.all = function (params) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','shop_products/', params);

        api_deferred.done(function (json) {
            var result = [];
            if (json.shop_products) {
                for (var i = 0, l= json.shop_products.length; i<l ; ++i) {
                    var shop_product = json.shop_products[i].shop_product,
                        row_data = convertData(shop_product);
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

    self.one = function (id) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','shop_products/' + id);

        api_deferred.done(function (json) {
            var result = convertDetailData(json);
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.checkWishlist = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','wish_lists/' + id, params);

        api_deferred.done(function (json) {
            var result = json.favorite;
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.addWishlist = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('POST','wish_lists/' + id, params);

        api_deferred.done(function (json) {
            if (json.success) {
                deferred.resolve(json.success);
            } else {
                deferred.reject({error: L('add_wishlist_fail')});
            }
            
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.removeWishlist = function (id) {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','wish_lists/' + id, params);

        api_deferred.done(function (json) {
            if (json.success) {
                deferred.resolve(json.success);
            } else {
                deferred.reject({error: L('remove_wishlist_fail')});
            }
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.allWishlist = function () {
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','wish_lists/', params);

        api_deferred.done(function (json) {
            var result = [];
            if (json.shop_products) {
                for (var i = 0, l= json.shop_products.length; i<l ; ++i) {
                    var shop_product = json.shop_products[i].shop_product,
                        row_data = convertData(shop_product);
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

    return self;
}

module.exports = ShopProductService;