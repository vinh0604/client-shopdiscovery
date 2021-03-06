function OrderService (_args) {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        APP_CONST = require('business/constants'),
        DB = require('business/database'),
        opts = _args,
        self = this;

    self.create = function (shop_product_id, amount, contact) {
        var params = {
                shop_product_id: shop_product_id,
                amount: amount,
                contact: JSON.stringify(contact),
                auth_token: DB.getAuthToken()
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('POST','orders',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.check_new = function (shop_id) {
        var params = {
                shop_id: shop_id,
                auth_token: DB.getAuthToken(),
                status: APP_CONST.DATA.ORDER_STATUS.NEW
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','orders/check',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.load_new = function (shop_id) {
        var params = {
                shop_id: shop_id,
                auth_token: DB.getAuthToken(),
                status: APP_CONST.DATA.ORDER_STATUS.NEW
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','orders',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.load_complete = function (shop_id) {
        var params = {
                shop_id: shop_id,
                auth_token: DB.getAuthToken(),
                status: APP_CONST.DATA.ORDER_STATUS.FINISHED
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','orders',params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.get_order = function (order_id) {
        var params = {
                auth_token: DB.getAuthToken()
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('GET','orders/'+order_id,params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.cancel_order = function (order_id) {
        var params = {
                auth_token: DB.getAuthToken(),
                status: APP_CONST.DATA.ORDER_STATUS.CANCELED
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('PUT','orders/'+order_id,params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.confirm_order = function (order_id, params) {
        params.order_shipment = JSON.stringify(params.order_shipment);
        params.auth_token = DB.getAuthToken();
        params.status = APP_CONST.DATA.ORDER_STATUS.CONFIRMED;
        var deferred = new _.Deferred(),
            api_deferred = api.request('PUT','orders/'+order_id,params);

        api_deferred.done(function (json) {
            deferred.resolve(json);
        });

        api_deferred.fail(function (e) {
            deferred.reject(e);
        });

        return deferred;
    };

    self.pay_order = function (order_id) {
        var params = {
                auth_token: DB.getAuthToken()
            },
            deferred = new _.Deferred(),
            api_deferred = api.request('POST','orders/'+order_id+'/payment',params);

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

module.exports = OrderService;