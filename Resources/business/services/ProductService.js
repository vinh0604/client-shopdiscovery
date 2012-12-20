function ProductService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (product) {
        var data = _.pick(product, 'id', 'name', 'shop_count', 'min_price');
        data.photo = (product.photo ? api.HOST + product.photo : APP_CONST.DEFAULT.NO_PHOTO);
        data.category = _.pick(product.category, 'name');
        data.price_unit = 'VND';
        return data;
    }

    self.all = function (params) {
        var deferred = new _.Deferred(),
            api_deferred = api.request('GET','products', params);

        api_deferred.done(function (json) {
            var result = {
                total: json.total,
                rows: []
            };
            if (json.products) {
                for (var i = 0, l= json.products.length; i<l ; ++i) {
                    var product = json.products[i].product,
                        row_data = convertData(product);
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

module.exports = ProductService;