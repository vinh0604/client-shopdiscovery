function ShopManagementService (_args) {
    var _ = require('lib/underscore'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop_product) {
        var data = _.pick(shop_product,'id', 'price', 'warranty', 'shop', 'description', 'status', 'origin', 'promotion');
        if (shop_product.product) {
            data.product_id = shop_product.product.id;
            _.extend(data, _.pick(shop_product.product, 'name', 'category', 'barcode', 'specifics'));
        }
        if (shop_product.photos) {
            data.photos = _.map(shop_product.photos,function (p) {
                return p.photo ? {url: api.HOST + p.photo.url, id: p.photo.id} : {url: '', id: null};
            });
        }
        if (shop_product.photo) {
            data.photo = api.HOST + shop_product.photo.url;
        } else {
            data.photo = APP_CONST.DEFAULT.NO_PHOTO;
        }
        data.price_unit = 'VND';
        return data;
    }

    self.one = function (id) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','shop_products/'+id);

        api_deferred.done(function (json) {
            var result = convertData(json);
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.checkShopProduct = function (params) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','managements/shop_products/check', params);

        api_deferred.done(function (json) {
            var result = convertData(json);
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.create = function (params) {
        params.auth_token = DB.getAuthToken();
        if (!params.price) {
            delete params.price;
        }
        if (!params.warranty) {
            delete params.warranty;
        }
        params.added_photos = JSON.stringify(params.added_photos);
        params.deleted_photos = JSON.stringify(params.deleted_photos);
        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','managements/shop_products', params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.update = function (id,params) {
        params.auth_token = DB.getAuthToken();
        if (!params.price) {
            delete params.price;
        }
        if (!params.warranty) {
            delete params.warranty;
        }
        params.added_photos = JSON.stringify(params.added_photos);
        params.deleted_photos = JSON.stringify(params.deleted_photos);
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','managements/shop_products/'+id, params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.remove = function (id) {
        var params = {auth_token : DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('DELETE','managements/shop_products/'+id, params);

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