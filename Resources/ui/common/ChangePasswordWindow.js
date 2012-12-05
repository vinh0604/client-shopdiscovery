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
    errorLabelProperties = {
        left: 10,
        right: 10,
        color: 'red',
        font: {fontSize: 24}
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
    oldPasswordErrorLabel = Ti.UI.createLabel(_.extend({top: 180}, errorLabelProperties)),
    newPasswordField = Ti.UI.createTextField(_.extend({
        hintText: L('new_password'),
        top: 210
    }, fieldProperties)),
    passwordErrorLabel = Ti.UI.createLabel(_.extend({top: 290}, errorLabelProperties)),
    confirmPasswordField = Ti.UI.createTextField(_.extend({
        hintText: L('confirm_new_password'),
        top: 320
    }, fieldProperties)),
    confirmPasswordErrorLabel = Ti.UI.createLabel(_.extend({top: 400}, errorLabelProperties)),
    buttonBar = new CustomButtonBar({
        top: 430,
        buttons: ['Cancel','Done'],
        handler: function (e) {
            if (e.index) {
                e.data = {
                    current_password: oldPasswordField.value,
                    password: newPasswordField.value,
                    password_confirmation: confirmPasswordField.value
                };
                opts.handler(e);
            } else {
                self.close();
            }
        }
    });

    buttonBar.enableButton(1, false);

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(oldPasswordField);
    view.add(newPasswordField);
    view.add(confirmPasswordField);
    view.add(buttonBar);

    view.add(oldPasswordErrorLabel);
    view.add(passwordErrorLabel);
    view.add(confirmPasswordErrorLabel);

    self.add(view);

    oldPasswordField.addEventListener('change', enableDisableDoneButton);
    newPasswordField.addEventListener('change', enableDisableDoneButton);
    confirmPasswordField.addEventListener('change', enableDisableDoneButton);

    function enableDisableDoneButton (e) {
        if (oldPasswordField.value && newPasswordField.value && confirmPasswordField.value) {
            buttonBar.enableButton(1, true);
        } else {
            buttonBar.enableButton(1, false);
        }
    }

    self.setErrors = function (errors) {
        oldPasswordErrorLabel.text = errors.current_password;
        passwordErrorLabel.text = errors.password;
        confirmPasswordErrorLabel.text = errors.password_confirmation;
    };

    return self;
}

module.exports = ChangePasswordWindow;