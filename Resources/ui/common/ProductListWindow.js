function ProductListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ProductService = require('business/services/ProductService'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        ProductGroupRow = require('ui/components/tablerow/ProductGroupRow'),
        opts = _args,
        item = _args.data,
        params = {
            page: 1,
            per_page: 30,
            category_id: item.id
        },
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('products')},theme.styles.header.label)),
    breadcrumbView = Ti.UI.createView({
        top: 90,
        left: 0,
        right: 0,
        height: 45,
        backgroundColor: '#BABABA'
    }),
    breadcrumbLabel = Ti.UI.createLabel({
        left: 10,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    productTableView = new InfiniteScrollTableView({
        config: {top: 135,bottom: 0},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    productService = new ProductService();

    headerView.add(headerLabel);
    breadcrumbView.add(breadcrumbLabel);

    self.add(headerView);
    self.add(breadcrumbView);
    self.add(productTableView);

    productTableView.addEventListener('click', function (e) {
        if (e.rowData) {
            var SecondProductListWindow = require('ui/common/SecondProductListWindow'),
                spListWindow = new SecondProductListWindow({
                    controller: controller,
                    data: {
                        product_id: e.rowData._id,
                        product: e.rowData._name
                    }
                });
            spListWindow.open();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        breadcrumbLabel.text = String.format(L('category'),item.name);
        // {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'}
        activityIndicator.show();
        fetchData().done(function (result) {
            activityIndicator.hide();
            return result;
        }).done(appendData).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    function fetchData () {
        var deferred = productService.all(params);
        return deferred;
    }

    function appendData (result) {
        ++ params.page;
        for (var i = 0, l = result.rows.length; i < l; ++i) {
            var row = new ProductGroupRow({data: result.rows[i]});
            productTableView.appendRow(row);
        }
        if (!result.total || productTableView.data[0].rowCount >= result.total) {
            productTableView.stopUpdate = true;
        }
    }

    return self;
}

module.exports = ProductListWindow;