function ChangePasswordWindow (_args) {
        var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        opts = _args,
        fieldProperties = {
            passwordMask: true,
            left: 10,
            right: 10
        },
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
    headerLabel = Ti.UI.createLabel(_.extend({text: L('change_password')},theme.styles.popup.header.label)),
    oldPasswordField = Ti.UI.createTextField(_.extend({
        hintText: L('old_password'),
        top: 100
    }, fieldProperties)),
    newPasswordField = Ti.UI.createTextField(_.extend({
        hintText: L('new_password'),
        top: 200
    }, fieldProperties)),
    confirmPasswordField = Ti.UI.createTextField(_.extend({
        hintText: L('confirm_new_password'),
        top: 300
    }, fieldProperties)),
    buttonBar = new CustomButtonBar({
        top: 400,
        buttons: ['Cancel','Done'],
        handler: function (e) {
            if (e.index) {
                e.password = {
                    _old: oldPasswordField.value,
                    _new: newPasswordField.value,
                    _confirm: confirmPasswordField.value
                };
                self.close();
                opts.handler(e);
            } else {
                self.close();
            }
        }
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(oldPasswordField);
    view.add(newPasswordField);
    view.add(confirmPasswordField);
    view.add(buttonBar);

    self.add(view);

    return self;
}

module.exports = ChangePasswordWindow;