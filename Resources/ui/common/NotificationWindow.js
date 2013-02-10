function NotificationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        NotificationRow = require('ui/components/tablerow/NotificationRow'),
        NotificationService = require('business/services/NotificationService'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('notifications')},theme.styles.header.label)),
    notificationTableView = new InfiniteScrollTableView({
        config: {top: 90,bottom: 0},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    params = {page: 1, per_page: 30},
    notificationService = new NotificationService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(notificationTableView);

    notificationTableView.addEventListener('click', function (e) {
        if (e._source_type == 'ShopProduct') {
            var ProductWindow = require('ui/common/ProductWindow'),
                productWindow = new ProductWindow({controller: controller, data: {id: e.rowData['_source_id']}});
            productWindow.open();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
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
        var deferred = notificationService.all(params);
        return deferred;
    }

    function appendData (result) {
        ++ params.page;
        for (var i = 0, l = result.rows.length; i < l; ++i) {
            var row = new NotificationRow({ data: result.rows[i] });
            notificationTableView.appendRow(row);
        }
        if (!result.total || notificationTableView.data[0].rowCount >= result.total) {
            notificationTableView.stopUpdate = true;
        }
        var ids = _(result.rows).reduce( function( memo, r) {
            if (r.unread) {
                memo.push(r.id);
            }
            return memo;
        }, [] );
        if (ids.length) {
            notificationService.read(ids);
        }
    }

    return self;
}

module.exports = NotificationWindow;