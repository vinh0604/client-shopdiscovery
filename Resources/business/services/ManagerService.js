function ManagerService (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        api = require('network/ShopDiscoveryAPI'),
        opts = _args,
        self = this;

    function convertData (manager) {
        var data = {};
        return data;
    }

    self.shop = function (shop_id) {
        
    };

    return self;
}

module.exports = ManagerService;