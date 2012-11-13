function NotificationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        NotificationRow = require('ui/components/tablerow/NotificationRow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('notifications')},theme.styles.header.label)),
    notificationTableView = new InfiniteScrollTableView({
        config: {top: 90,bottom: 0},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(notificationTableView);

    self.addEventListener('open', function (e) {
        controller.register(self);

        var data = [
            {id: 1, content: 'This is a sample notification', type: 1},
            {id: 1, content: 'This is a sample notification', type: 1},
            {id: 1, content: 'This is a sample notification', type: 1},
            {id: 1, content: 'This is a sample notification', type: 1},
            {id: 1, content: 'This is a sample notification', type: 1},
            {id: 1, content: 'This is a sample notification', type: 1}
        ];

        for (var i = 0, l = data.length; i < l; ++i) {
            var row = new NotificationRow({data: data[i]});
            notificationTableView.appendRow(row);
        }
    });

    function fetchData () {
        var deferred = new _.Deferred();

        return deferred;
    }

    function appendData (result) {
        
    }

    return self;
}

module.exports = NotificationWindow;