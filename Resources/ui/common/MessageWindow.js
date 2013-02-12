function MessageWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        MessageInboxWindow = require('ui/common/MessageInboxWindow'),
        SentMessageWindow = require('ui/common/SentMessageWindow'),
        ComposeMessageWindow = require('ui/common/ComposeMessageWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('messages')},theme.styles.header.label)),
    messageFolderTableView = Ti.UI.createTableView({
        top: 110,
        left: 20,
        right: 20,
        height: Ti.UI.SIZE,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 2
    }),
    inboxRow = Ti.UI.createTableViewRow({
        height: 90,
        rightImage: '/images/arrow_right.png'
    }),
    sentRow = Ti.UI.createTableViewRow({
        height: 90,
        title: L('sent'),
        color: '#000',
        rightImage: '/images/arrow_right.png'
    }),
    inboxLabel = Ti.UI.createLabel({
        left: 5,
        color: '#000',
        text: L('inbox')
    }),
    messageIndicatorLabel = Ti.UI.createLabel({
        right: 30,
        color: '#fff',
        font: {fontWeight: 'bold', fontSize: 30},
        backgroundColor: '#4D8EFF',
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: 45,
        width: 75,
        borderRadius: 15,
        touchEnabled: false
    }),
    newMessageButton = Ti.UI.createButton({
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        title: L('new_message')
    });

    headerView.add(headerLabel);

    inboxRow.add(inboxLabel);
    inboxRow.add(messageIndicatorLabel);
    messageFolderTableView.setData([inboxRow, sentRow]);

    self.add(headerView);
    self.add(messageFolderTableView);
    self.add(newMessageButton);

    messageFolderTableView.addEventListener('click', function (e) {
        if (e.index) {
            var sentWindow = new SentMessageWindow({controller: controller});
            sentWindow.open();
        } else {
            var inboxWindow = new MessageInboxWindow({controller: controller});
            inboxWindow.open();
        }
    });

    newMessageButton.addEventListener('click', function (e) {
        var composeWindow = new ComposeMessageWindow({controller: controller});
        composeWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        checkMessage(e);
    });

    function checkMessage (e) {
        var MessageService = require('business/services/MessageService'),
            messageService = new MessageService();

        messageService.check().done(function (result) {
            messageIndicatorLabel.text = result.count;
        });
    }

    return self;
}

module.exports = MessageWindow;