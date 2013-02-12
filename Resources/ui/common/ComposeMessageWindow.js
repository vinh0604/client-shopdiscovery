function ComposeMessageWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        MessageService = require('business/services/MessageService'),
        controller = _args.controller,
        defaultSender = _args.defaultSender,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var topTableView = Ti.UI.createTableView({
        top: 0,
        left: 0,
        right: 0,
        height: Ti.UI.SIZE
    }),
    toRow = Ti.UI.createTableViewRow({
        height: 90
    }),
    toLabel = Ti.UI.createLabel({
        text: L('to'),
        top: 15,
        left: 20,
        color: 'gray',
        font: {fontSize: 36}
    }),
    toField = Ti.UI.createTextField({
        left: 70,
        right: 0,
        backgroundColor: 'transparent'
    }),
    subjectRow = Ti.UI.createTableViewRow({
        height: 90
    }),
    subjectField = Ti.UI.createTextField({
        hintText: L('subject'),
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    }),
    contentField = Ti.UI.createTextArea({
        top: 180,
        left: 0,
        right: 0,
        bottom: 90,
        hintText: L('compose_message')
    }),
    buttonBar = new CustomButtonBar({
        buttons: [L('cancel'),L('done')],
        handler: function (e) {
            if (e.index) {
                var params = {
                    title: subjectField.value,
                    content: contentField.value,
                    receivers: toField.value.trim().split(/ *[,;] */g)
                };
                activityIndicator.show();
                service.compose(params).done(function (result) {
                    activityIndicator.hide();
                    var toast = Ti.UI.createNotification({
                        duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                        message: L('message_sent')
                    });
                    toast.show();
                    self.close();
                }).fail(function (e) {
                    activityIndicator.hide();
                    alert(e.error);
                });
            } else {
                self.close();
            }
        }
    }),
    service = new MessageService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('processing')
    });

    toRow.add(toLabel);
    toRow.add(toField);
    subjectRow.add(subjectField);

    topTableView.setData([toRow,subjectRow]);

    self.add(topTableView);
    self.add(contentField);
    self.add(buttonBar);

    toField.addEventListener('change', enableDisableDoneButton);
    subjectField.addEventListener('change', enableDisableDoneButton);

    self.addEventListener('open', function (e) {
        if (defaultSender) {
            toField.enabled = false;
            toField.value = defaultSender.username;
            if (defaultSender.title) {
                subjectField.value = 'RE: ' + defaultSender.title;
            }
        }
        controller.register(self);
    });

    function enableDisableDoneButton (e) {
        var receivers = toField.value.trim().split(/ *[,;] */g);
        if (receivers.length && subjectField.value.trim()) {
            buttonBar.enableButton(1, true);
        } else {
            buttonBar.enableButton(1, false);
        }
    }

    return self;
}

module.exports = ComposeMessageWindow;