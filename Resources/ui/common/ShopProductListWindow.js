function ShopProductListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ProductRow = require('ui/components/tablerow/ProductRow'),
        ShopProductService = require('business/services/ShopProductService'),
        opts = _args,
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('products')},theme.styles.header.label)),
    breadcrumbView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 45,
        backgroundColor: '#BABABA'
    }),
    breadcrumbLabel = Ti.UI.createLabel({
        left: 10,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        text: String.format(L('category'),item.category)
    }),
    productTableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 0,
        data: [],
        headerView: breadcrumbView
    }),
    shopProductService = new ShopProductService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);
    breadcrumbView.add(breadcrumbLabel);

    self.add(headerView);
    self.add(productTableView);

    productTableView.addEventListener('click', function (e) {
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
        activityIndicator.show();
        shopProductService.all(_.pick(item, 'shop_id', 'category_id')).done(function (result) {
            var tableRows = [];
            for (var i = 0, l=result.length; i < l; ++i) {
                row = new ProductRow({
                    data: result[i]
                });
                tableRows.push(row);
            }
            productTableView.setData(tableRows);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    return self;
}

module.exports = ShopProductListWindow;