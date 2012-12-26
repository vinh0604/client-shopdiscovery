function FavoriteShopsWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ShopService = require('business/services/ShopService'),
        ShopRow = require('ui/components/tablerow/ShopRow'),
        controller = _args.controller,
        opts = _args,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('favorite_shop')},theme.styles.header.label)),
    shopTableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 0,
        data: []
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    shopService = new ShopService();

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(shopTableView);

    shopTableView.addEventListener('click', function (e) {
        var ShopWindow = require('ui/common/ShopWindow'),
            shopWindow = new ShopWindow({controller: controller, data: {id: e.rowData._id}});
        shopWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        shopService.allFavorite().done(function (result) {
            var tableRows = [];
            for (var i = 0, l=result.rows.length; i < l; ++i) {
                var row = new ShopRow({ data: result.rows[i] });
                tableRows.push(row);
            }
            shopTableView.setData(tableRows);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });
    return self;
}

module.exports = FavoriteShopsWindow;