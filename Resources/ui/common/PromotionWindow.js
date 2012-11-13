function PromotionWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        PromotionRow = require('ui/components/tablerow/PromotionRow'),
        CategoryWindow = require('ui/common/filter/CategoryWindow'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('deals')},theme.styles.header.label)),
    promotionTableView = new InfiniteScrollTableView({
        config: {top: 90,bottom: 90},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    categoryButton = Ti.UI.createButton({
        bottom: 0,
        height: 90,
        left: 0,
        right: 0,
        title: L('select_category')
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(promotionTableView);
    self.add(categoryButton);

    categoryButton.addEventListener('click', function (e) {
        var categoryWindow = new CategoryWindow({
            data: {
                children: [
                    {name: 'Điện thoại thường'},
                    {name: 'Điện thoại thường'},
                    {name: 'Điện thoại thường'},
                    {name: 'Điện thoại thường'},
                    {name: 'Điện thoại thường'},
                    {name: 'Điện thoại thông minh'}
                ]
            },
            handler: function (e) {
                
            }
        });

        categoryWindow.open({modal: true});
    });

    self.addEventListener('open', function (e) {
        controller.register(self);

        var data = [
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND'}
        ];

        for (var i = 0, l = data.length; i < l; ++i) {
            var row = new PromotionRow({data: data[i]});
            promotionTableView.appendRow(row);
        }
    });

    function fetchData () {
        var deferred = new _.Deferred();

        return deferred;
    }

    function appendData (result) {
        
    }

    return self;
}

module.exports = PromotionWindow;