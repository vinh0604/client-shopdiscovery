function ProductListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ProductGroupRow = require('ui/components/ProductGroupRow'),
        opts = _args,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

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
    productTableView = Ti.UI.createTableView({
        top: 135,
        left: 0,
        right: 0,
        bottom: 0
    });

    headerView.add(headerLabel);
    breadcrumbView.add(breadcrumbLabel);

    self.add(headerView);
    self.add(breadcrumbView);
    self.add(productTableView);

    productTableView.addEventListener('click', function (e) {
        
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    self.addEventListener('open', function (e) {
        controller.register(self);

        breadcrumbLabel.text = String.format(L('category'),'Smart phone');
        var data = [
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'},
            {id: 1, name: 'Sample Phone', photo: '/images/Phone.png', category: 'Smart phone', shop_count: 5, min_price: 2000000, price_unit: 'VND'}
        ];

        for (var i = 0, l = data.length; i < l; ++i) {
            var row = new ProductGroupRow({data: data[i]});
            productTableView.appendRow(row);
        }
    });

    return self;
}

module.exports = ProductListWindow;