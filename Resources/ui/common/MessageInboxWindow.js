function MessageInboxWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        MessageRow = require('ui/components/tablerow/MessageRow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('inbox')},theme.styles.header.label)),
    messageTableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 0
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(messageTableView);

    self.addEventListener('open', function (e) {
        controller.register(self);

        var data = [
            {id: 1, subject: 'Sample message subject', sender: 'Vinh Bachsy', sent_date: '2012-2-12', photo: '/images/user.png'},
            {id: 1, subject: 'Sample message subject', sender: 'Vinh Bachsy', sent_date: '2012-2-12', photo: '/images/user.png'},
            {id: 1, subject: 'Sample message subject', sender: 'Vinh Bachsy', sent_date: '2012-2-12', photo: '/images/user.png'},
            {id: 1, subject: 'Sample message subject', sender: 'Vinh Bachsy', sent_date: '2012-2-12', photo: '/images/user.png'},
            {id: 1, subject: 'Sample message subject', sender: 'Vinh Bachsy', sent_date: '2012-2-12', photo: '/images/user.png'},
            {id: 1, subject: 'Sample message subject', sender: 'Vinh Bachsy', sent_date: '2012-2-12', photo: '/images/user.png'}
        ];

        for (var i = 0, l = data.length; i < l; ++i) {
            var row = new MessageRow({data: data[i]});
            messageTableView.appendRow(row);
        }
    });

    return self;
}

module.exports = MessageInboxWindow;