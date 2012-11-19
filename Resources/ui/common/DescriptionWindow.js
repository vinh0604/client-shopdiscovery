function DescriptionWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    item =  {
        id: 1,
        name: 'Sample product name with some details',
        description: 'Sample description.'
    };

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('description')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 0
    }),
    productNameRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    productNameLabel = Ti.UI.createLabel({
        top: 10,
        bottom: 10,
        left: 10,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        text: item.name
    }),
    descriptionRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    descriptionWebView = Ti.UI.createWebView({
        left: 0,
        right: 0,
        html: '<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />' + item.description
    });

    headerView.add(headerLabel);

    productNameRow.add(productNameLabel);
    descriptionRow.add(descriptionWebView);
    tableView.setData([productNameRow, descriptionRow]);

    self.add(headerView);
    self.add(tableView);

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = DescriptionWindow;