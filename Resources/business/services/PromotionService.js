function PromotionService (_args) {
    var _ = require('lib/underscore'),
        DB = require('business/database'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop_product) {
        var data = _.pick(shop_product,'id', 'price');
        if (shop_product.product) {
            data.name = shop_product.product.name;
        }
        if (shop_product.photo) {
            data.photo = api.HOST + shop_product.photo.url;
        } else {
            data.photo = APP_CONST.DEFAULT.NO_PHOTO;
        }
        if (shop_product.promotion) {
            data.deal_price = shop_product.promotion.price;
            data.amount = shop_product.promotion.amount;
            data.expires = shop_product.promotion.expires;
            data.bid_count = 0;
        }
        data.price_unit = 'VND';
        return data;
    }

    self.all = function (params) {
        if (params.category) {
            params.category_id = params.category;
        } else {
            delete params.category_id;
        }
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','promotions', params);

        api_deferred.done(function (json) {
            var result = {
                rows: [],
                total: json.total
            };
            if (json.shop_products) {
                for (var i = 0, l= json.shop_products.length; i<l ; ++i) {
                    var shop_product = json.shop_products[i].shop_product,
                        row_data = convertData(shop_product);
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

    self.create = function (params) {
        params.auth_token = DB.getAuthToken();
        var deferred = new _.Deferred(),
            api_deferred = api.request('POST','promotions', params);

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
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','promotions/'+id, params);

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

module.exports = PromotionService;