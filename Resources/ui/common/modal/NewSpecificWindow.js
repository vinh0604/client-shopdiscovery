function NewSpecificWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        opts = _args,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        width : theme.platformWidth - 100,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('new_specific')},theme.styles.popup.header.label)),
    nameField = Ti.UI.createTextField({
        hintText: L('name'),
        left: 10,
        right: 10,
        top: 110
    }),
    descriptionField = Ti.UI.createTextArea({
        hintText: L('description'),
        left: 10,
        right: 10,
        top: 210,
        bottom: 90,
        height: 200
    }),
    bottomBar = new DoneCancelButtonBar({
        parentWin: self,
        handler: function (e) {
            var result = {
                name: nameField.value,
                description: descriptionField.value
            };
            self.close();

            opts.handler(result);
        }
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(nameField);
    view.add(descriptionField);
    view.add(bottomBar);
    self.add(view);

    return self;
}

module.exports = NewSpecificWindow;