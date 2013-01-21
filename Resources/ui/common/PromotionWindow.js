function PromotionWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        PromotionService = require('business/services/PromotionService'),
        PromotionRow = require('ui/components/tablerow/PromotionRow'),
        CategoryWindow = require('ui/common/filter/CategoryWindow'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        controller = _args.controller,
        params = {page: 1, per_page: 30},
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

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
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    service = new PromotionService();

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(promotionTableView);
    self.add(categoryButton);

    categoryButton.addEventListener('click', function (e) {
        var categoryWindow = new CategoryWindow({
            params: params,
            handler: function (e) {
                reloadData();
            }
        });
        categoryWindow.open({modal: true});
    });

    promotionTableView.addEventListener('click', function (e) {
        if (e.rowData) {
            var ProductWindow = require('ui/common/ProductWindow'),
                productWindow = new ProductWindow({
                    controller: controller,
                    data: {id: e.rowData._id}
                });
            productWindow.open();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        // {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', price: 2000000, deal_price: 1200000, bid_count: 225, amount: 500, price_unit: 'VND', expires: new Date()}
        reloadData();
    });

    function reloadData () {
        params.page = 1;
        promotionTableView.setData([]);
        activityIndicator.show();
        fetchData().done(function (result) {
            activityIndicator.hide();
            return result;
        }).done(appendData).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    function fetchData () {
        var deferred = service.all(params);
        return deferred;
    }

    function appendData (result) {
        ++ params.page;
        for (var i = 0, l = result.rows.length; i < l; ++i) {
            var row = new PromotionRow({ data: result.rows[i] });
            promotionTableView.appendRow(row);
        }
        if (!result.total || promotionTableView.data[0].rowCount >= result.total) {
            promotionTableView.stopUpdate = true;
        }
    }

    return self;
}

module.exports = PromotionWindow;