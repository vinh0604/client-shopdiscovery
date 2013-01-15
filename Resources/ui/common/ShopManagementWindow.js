function ShopManagementWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ShopManagementService = require('business/services/ShopManagementService'),
        MyShopRow = require('ui/components/tablerow/MyShopRow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('my_shops')},theme.styles.header.label)),
    myShopTableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90
    }),
    newShopButton = Ti.UI.createButton({
        bottom: 0,
        height: 90,
        left: 0,
        right: 0,
        title: L('new_shop')
    }),
    service = new ShopManagementService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(myShopTableView);
    self.add(newShopButton);

    myShopTableView.addEventListener('click', function (e) {
        if (e.source.backgroundImage == '/images/trash_blue.png') {
            return;
        }
        if (e.rowData) {
            var ShopInfoWindow = require('ui/common/management/ShopInfoWindow'),
                shopInfoWindow = new ShopInfoWindow({
                    controller: controller,
                    data: {id: e.rowData._id}
                });
            shopInfoWindow.open();
        }
    });

    newShopButton.addEventListener('click', function (e) {
        var ShopEditWindow = require('ui/common/management/ShopEditWindow'),
            shopEditWindow = new ShopEditWindow({
                controller: controller,
                handler: reloadData
            });
        shopEditWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        reloadData();
    });

    function deleteHandler (e) {
        var confirmDialog = Ti.UI.createAlertDialog({
            buttonNames: [L('cancel'), L('ok')],
            title: L('delete_confirmation'),
            message: L('confirm_delete_shop')
        });
        confirmDialog.addEventListener('click', function (evt) {
            if (evt.index === 1) {
                service.remove(e.item_id).done(reloadData).fail(function (e) {
                    alert(e.error);
                });
            }
        });
        confirmDialog.show();
    }

    function reloadData () {
        activityIndicator.show();
        service.all().done(function (data) {
            myShopTableView.setData([]);
            for (var i = 0, l = data.length; i < l; ++i) {
                var row = new MyShopRow({data: data[i], deleteHandler: deleteHandler});
                myShopTableView.appendRow(row);
            }
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = ShopManagementWindow;