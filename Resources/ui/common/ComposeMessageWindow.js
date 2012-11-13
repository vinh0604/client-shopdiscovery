function ComposeMessageWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        controller = _args.controller,
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
                
            } else {
                self.close();
            }
        }
    });

    toRow.add(toLabel);
    toRow.add(toField);
    subjectRow.add(subjectField);

    topTableView.setData([toRow,subjectRow]);

    self.add(topTableView);
    self.add(contentField);
    self.add(buttonBar);

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = ComposeMessageWindow;