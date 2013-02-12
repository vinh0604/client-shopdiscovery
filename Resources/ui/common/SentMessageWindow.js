function SentMessageWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SentMessageRow = require('ui/components/tablerow/SentMessageRow'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        MessageService = require('business/services/MessageService'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('sent_messages')},theme.styles.header.label)),
    messageTableView = new InfiniteScrollTableView({
        config: {top: 90,bottom: 0},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    params = {page: 1, per_page: 30},
    messageService = new MessageService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(messageTableView);

    messageTableView.addEventListener('click', function (e) {
        if (e.rowData) {
            var MessageDetailWindow = require('ui/common/MessageDetailWindow'),
                detailWindow = new MessageDetailWindow({controller: controller, data: {id: e.rowData['_id']}});
            detailWindow.open();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);

        // var data = [
        //     {id: 1, subject: 'Sample message subject', receivers: ['vinhbachsy', 'ducvinh'], sent_date: '2012-2-12', photo: '/images/user.png'},
        //     {id: 1, subject: 'Sample message subject', receivers: ['vinhbachsy', 'ducvinh'], sent_date: '2012-2-12', photo: '/images/user.png'},
        //     {id: 1, subject: 'Sample message subject', receivers: ['vinhbachsy', 'ducvinh'], sent_date: '2012-2-12', photo: '/images/user.png'},
        //     {id: 1, subject: 'Sample message subject', receivers: ['vinhbachsy', 'ducvinh'], sent_date: '2012-2-12', photo: '/images/user.png'},
        //     {id: 1, subject: 'Sample message subject', receivers: ['vinhbachsy', 'ducvinh'], sent_date: '2012-2-12', photo: '/images/user.png'},
        //     {id: 1, subject: 'Sample message subject', receivers: ['vinhbachsy', 'ducvinh'], sent_date: '2012-2-12', photo: '/images/user.png'}
        // ];

        // for (var i = 0, l = data.length; i < l; ++i) {
        //     var row = new SentMessageRow({data: data[i]});
        //     messageTableView.appendRow(row);
        // }
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
        var deferred = messageService.all_sent(params);
        return deferred;
    }

    function appendData (result) {
        ++ params.page;
        for (var i = 0, l = result.rows.length; i < l; ++i) {
            var row = new MessageRow({ data: result.rows[i] });
            messageTableView.appendRow(row);
        }
        if (!result.total || messageTableView.data[0].rowCount >= result.total) {
            messageTableView.stopUpdate = true;
        }
    }

    return self;
}

module.exports = SentMessageWindow;