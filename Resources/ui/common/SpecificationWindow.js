function SpecificationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    item =  {
        id: 1,
        code: '211323245',
        name: 'Sample product name with some details',
        category: 'Phone & Tablet > Smartphone',
        features: {'Manufacturer': 'Samsung', 'Screen Size': '4.65 inche', 'Resolution': '768 x 1208', 'OS': 'Android Jelly Bean 4.2'}
    };

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('specific')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 0
    }),
    productCodeRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: '#BABABA'
    }),
    productCodeLabel = Ti.UI.createLabel({
        text: L('item_number') + ': ' + item.code,
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 10,
        top: 5,
        bottom: 5
    }),
    productNameRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    productNameLabel = Ti.UI.createLabel({
        top: 10,
        bottom: 10,
        left: 10,
        font: {fontSize: 30},
        color: '#000',
        text: item.name
    }),
    categoryTitleRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: '#BABABA'
    }),
    categoryTitleLabel = Ti.UI.createLabel({
        text: L('category_text'),
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 10,
        top: 5,
        bottom: 5
    }),
    categoryRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    categoryLabel = Ti.UI.createLabel({
        text: item.category,
        font: {fontSize: 28},
        color: '#000',
        left: 10,
        top: 10,
        bottom: 10
    }),
    specificationTitleRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: '#BABABA'
    }),
    specificationTitleLabel = Ti.UI.createLabel({
        text: L('specific'),
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 10,
        top: 5,
        bottom: 5
    });

    headerView.add(headerLabel);

    productCodeRow.add(productCodeLabel);
    productNameRow.add(productNameLabel);
    categoryTitleRow.add(categoryTitleLabel);
    categoryRow.add(categoryLabel);
    specificationTitleRow.add(specificationTitleLabel);
    tableView.setData([productCodeRow,productNameRow,categoryTitleRow,categoryRow,specificationTitleRow]);

    for (var key in item.features) {
        var row = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            className: 'featureRow'
        }),
        featureLabel = Ti.UI.createLabel({
            text: key,
            top: 5,
            left: 10,
            width: 250
        }),
        featureValueLabel = Ti.UI.createLabel({
            text: item.features[key],
            color: '#000',
            left: 260,
            top: 5,
            right: 10
        });

        row.add(featureLabel);
        row.add(featureValueLabel);

        tableView.appendRow(row);
    }

    self.add(headerView);
    self.add(tableView);

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = SpecificationWindow;