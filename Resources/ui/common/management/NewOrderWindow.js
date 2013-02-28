function NewOrderWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        OrderService = require('business/services/OrderService'),
        OrderRow = require('ui/components/tablerow/OrderRow'),
        OrderDetailWindow = require('ui/common/management/OrderDetailWindow'),
        controller = _args.controller,
        item = _args.data,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('new_order')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0
    }),
    service = new OrderService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);
    self.add(headerView);
    self.add(tableView);

    tableView.addEventListener('click', function (e) {
        if (e.rowData) {
            var orderDetailWindow = new OrderDetailWindow({
                controller: controller,
                data: {id: e.rowData._id},
                closeHandler: loadData
            });
            orderDetailWindow.open();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        loadData();
    });

    function loadData () {
        activityIndicator.show();
        service.load_new(item.id).done(function (result) {
            var rows = [];
            for (var i = 0, l = result.length; i < l; ++i) {
                var row = new OrderRow({data: result[i]});
                rows.push(row);
            }
            tableView.setData(rows);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = NewOrderWindow;