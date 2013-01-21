function ManagersWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ManagerService = require('business/services/ManagerService'),
        ManagerRow = require('ui/components/tablerow/ManagerRow'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('shop_managers')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 90
    }),
    bottomView = Ti.UI.createView({
        bottom: 0,
        left: 0,
        right: 0,
        height: 90
    }),
    newManagerField = Ti.UI.createTextField({
        hintText: L('username'),
        left: 10,
        right: 120
    }),
    addButton = Ti.UI.createButton({
        title: L('add'),
        right: 10,
        width: 100,
        height: 80,
        enabled: false
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    service = new ManagerService();

    headerView.add(headerLabel);
    bottomView.add(newManagerField);
    bottomView.add(addButton);
    self.add(headerView);
    self.add(tableView);
    self.add(bottomView);

    newManagerField.addEventListener('change', function (e) {
        var currentValue = e.value.trim();
        if (currentValue && item.is_owner) {
            addButton.enabled = true;
        } else {
            addButton.enabled = false;
        }
    });

    addButton.addEventListener('click', function (e) {
        var username = newManagerField.value.trim();
        activityIndicator.show();
        service.create({username: username, shop_id: item.id}).done(function (result) {
            activityIndicator.hide();
            if (result.success) {
                newManagerField.value = "";
                reloadData();
            }
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        reloadData();
    });

    function deleteHandler (e) {
        var confirmDialog = Ti.UI.createAlertDialog({
            buttonNames: [L('cancel'), L('ok')],
            title: L('delete_confirmation'),
            message: L('confirm_delete_manager')
        });
        confirmDialog.addEventListener('click', function (evt) {
            activityIndicator.show();
            service.remove(e.item_id, {shop_id: item.id}).done(function (result) {
                activityIndicator.hide();
                if (result.success) {
                    reloadData();
                }
            }).fail(function (e) {
                activityIndicator.hide();
                alert(e.error);
            });
        });
        confirmDialog.show();
    }

    function reloadData () {
        activityIndicator.show();
        service.shop(item.id, {shop_id: item.id}).done(function (result) {
            var table_rows = [];
            for (var i = 0, l = result.length; i<l; ++i) {
                var row = new ManagerRow({
                    data: result[i],
                    owner: item.is_owner,
                    deleteHandler: deleteHandler
                });
                table_rows.push(row);
            }
            tableView.setData(table_rows);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = ManagersWindow;