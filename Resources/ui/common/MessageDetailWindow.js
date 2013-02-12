function MessageDetailWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        MessageService = require('business/services/MessageService'),
        controller = _args.controller,
        data = _args.data,
        isSentMessage = !!_args.sentMessage,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff', layout: 'vertical'},theme.styles.Window));

    var topTableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        height: Ti.UI.SIZE
    }),
    infoRow = Ti.UI.createTableViewRow({
        touchEnabled: false,
        layout: 'vertical'
    }),
    fromView = Ti.UI.createView({
        left: 10,
        layout: 'horizontal'
    }),
    fromLabel = Ti.UI.createLabel({
        text: L('from') + ': '
    }),
    fromValueLabel = Ti.UI.createLabel({
        color: '#000'
    }),
    toView = Ti.UI.createView({
        left: 10,
        layout: 'horizontal'
    }),
    toLabel = Ti.UI.createLabel({
        text: L('to') + ': '
    }),
    toValueLabel = Ti.UI.createLabel({
        color: '#000'
    }),
    dateView = Ti.UI.createView({
        left: 10,
        layout: 'horizontal'
    }),
    dateLabel = Ti.UI.createLabel({
        text: L('date') + ': '
    }),
    dateValueLabel = Ti.UI.createLabel({
        color: '#000'
    }),
    subjectRow = Ti.UI.createTableViewRow({
        touchEnabled: false,
        layout: 'horizontal',
        height: 60
    }),
    subjectLabel = Ti.UI.createLabel({
        top: 10,
        left: 10,
        text: L('subject') + ': '
    }),
    subjectValueLabel = Ti.UI.createLabel({
        top: 10,
        color: '#000'
    }),
    contentView = Ti.UI.createView({
        left: 0,
        right: 0,
        bottom: 0
    }),
    contentWebView = Ti.UI.createWebView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 90
    }),
    bottomView = Ti.UI.createView({
        height: 90,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#BABABA'
    }),
    deleteButton = Ti.UI.createButton({
        left: 30,
        width: 80,
        height: 80,
        backgroundImage: '/images/trash_blue.png',
        backgroundFocusedImage: '/images/trash_red.png',
        backgroundSelectedImage: '/images/trash_red.png'
    }),
    replyButton = Ti.UI.createButton({
        right: 30,
        width: 80,
        height: 80,
        backgroundImage: '/images/undo_blue.png',
        backgroundFocusedImage: '/images/undo_red.png',
        backgroundSelectedImage: '/images/undo_red.png',
        visible: !isSentMessage
    }),
    messageService = new MessageService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    fromView.add(fromLabel);
    fromView.add(fromValueLabel);
    toView.add(toLabel);
    toView.add(toValueLabel);
    dateView.add(dateLabel);
    dateView.add(dateValueLabel);
    infoRow.add(fromView);
    infoRow.add(toView);
    infoRow.add(dateView);
    subjectRow.add(subjectLabel);
    subjectRow.add(subjectValueLabel);

    bottomView.add(deleteButton);
    bottomView.add(replyButton);

    topTableView.setData([infoRow,subjectRow]);
    contentView.add(contentWebView);
    contentView.add(bottomView);

    self.add(topTableView);
    self.add(contentView);

    deleteButton.addEventListener('click', function (e) {
        activityIndicator.show();
        messageService.remove(data.id, {sent: isSentMessage}).done(function (result) {
            activityIndicator.hide();
            var toast = Ti.UI.createNotification({
                duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                message: L('message_deleted')
            });
            toast.show();
            self.close();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    replyButton.addEventListener('click', function (e) {
        var ComposeMessageWindow = require('ui/common/ComposeMessageWindow'),
            composeWindow = new ComposeMessageWindow({controller: controller, defaultSender: data.sender.username});
        composeWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);

        // var data = {
        //     sender: 'Vinh Bachsy',
        //     receivers: ['vinhbachsy, ducvinh'],
        //     sent_date: '2012-02-12',
        //     subject: 'Sample message subject',
        //     content: 'Hello everybody!'
        // };
        activityIndicator.show();
        messageService.get(data.id).done(function (result) {
            data = result;
            setData();
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            replyButton.enabled = false;
            deleteButton.enabled = false;
            alert(e.error);
        });
    });

    function setData () {
        fromValueLabel.text = data.sender.full_name;
        toValueLabel.text = data.receivers.join(', ');
        dateValueLabel.text = moment(data.sent_date, "YYYY-MM-DD").format("MM/DD/YY");
        subjectValueLabel.text = data.title;
        contentWebView.html = '<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />' + data.content;
    }

    return self;
}

module.exports = MessageDetailWindow;