function ShopManagementService (_args) {
    var _ = require('lib/underscore'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop_product) {
        var data = _.pick(shop_product,'id', 'price', 'warranty', 'shop', 'description', 'status', 'origin');
        if (shop_product.product) {
            data.product_id = shop_product.product.id;
            _.extend(data, _.pick(shop_product.product, 'name', 'category', 'barcode', 'specifics'));
        }
        if (shop_product.photos) {
            data.photos = _.map(shop_product.photos,function (p) {
                return p.photo ? {url: api.HOST + p.photo.url} : {url: ''};
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
        var params = {auth_token: DB.getAuthToken()},
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','managements/shop_products/'+id, params);

        api_deferred.done(function (json) {
            var result = convertData(json);
            deferred.resolve(result);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    return self;
}

module.exports = ShopManagementService;