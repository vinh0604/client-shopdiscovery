function OrderManagementWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        controller = _args.controller,
        item = _args.data,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('order_management')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0
    }),
    newOrderTableRow = Ti.UI.createTableViewRow({
        height: 90
    }),
    indicatorLabel = Ti.UI.createLabel({
        right: 10,
        color: '#fff',
        font: {fontWeight: 'bold', fontSize: 30},
        backgroundColor: '#4D8EFF',
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        text: '0',
        height: 45,
        width: 75,
        borderRadius: 15,
        touchEnabled: false
    }),
    newOrderLabel = Ti.UI.createLabel({
        text: L('new_order'),
        touchEnabled: false,
        left: 5,
        color: '#000'
    }),
    completedOrderTableRow = Ti.UI.createTableViewRow({
        height: 90,
        color: '#000',
        title: L('completed_order')
    });

    headerView.add(headerLabel);
    newOrderTableRow.add(newOrderLabel);
    newOrderTableRow.add(indicatorLabel);
    tableView.setData([newOrderTableRow, completedOrderTableRow]);
    self.add(headerView);
    self.add(tableView);

    newOrderTableRow.addEventListener('click', function () {
        var NewOrderWindow = require('ui/common/management/NewOrderWindow'),
            newOrderWindow = new NewOrderWindow({controller: controller, data: item});
        newOrderWindow.open();
        newOrderWindow.addEventListener('close',checkNewOrder);
    });
    completedOrderTableRow.addEventListener('click', function () {
        var CompletedOrderWindow = require('ui/common/management/CompletedOrderWindow'),
            completedOrderWindow = new CompletedOrderWindow({controller: controller, data: item});
        completedOrderWindow.open();
    });
    self.addEventListener('open', function (e) {
        controller.register(self);
        checkNewOrder();
    });

    function checkNewOrder () {
        var OrderService = require('business/services/OrderService'),
            service = new OrderService();
        service.check_new(item.id).done(function (result) {
            indicatorLabel.text = result.count;
        });
    }

    return self;
}

module.exports = OrderManagementWindow;