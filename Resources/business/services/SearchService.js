function SearchService (_args) {
    var _ = require('lib/underscore'),
        GEO = require('helpers/geo'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (shop_product) {
        var data = _.pick(shop_product,'id', 'price');
        var status = _.find(APP_CONST.DATA.CONDITION_ARRAY, function (c) {
            return c.code == shop_product.status;
        });
        data.status = status ? status.value : '';
        data.shop = shop_product.shop.name;
        data.distance = shop_product.shop.distance;
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

    self.search = function (data) {
        var deferred = new _.Deferred();
        var api_deferred = api.request('GET','search',data);

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

    return self;
}

module.exports = SearchService;