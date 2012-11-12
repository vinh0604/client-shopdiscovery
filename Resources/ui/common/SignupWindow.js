function SignupWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('signup')},theme.styles.header.label)),
    usernameField = Ti.UI.createTextField(_.extend({
        top: 100,
        passwordMask: false,
        hintText: L('username')
    },theme.styles.textfield)),
    emailField = Ti.UI.createTextField(_.extend({
        top: 200,
        passwordMask: false,
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        hintText: L('email')
    },theme.styles.textfield)),
    passwordField = Ti.UI.createTextField(_.extend({
        top: 300,
        passwordMask: true,
        hintText: L('password')
    },theme.styles.textfield)),
    confirmPasswordField = Ti.UI.createTextField(_.extend({
        top: 400,
        passwordMask: true,
        hintText: L('confirm_password')
    },theme.styles.textfield)),
    firstNameField = Ti.UI.createTextField(_.extend({
        top: 500,
        passwordMask: false,
        hintText: L('first_name')
    },theme.styles.textfield)),
    lastNameField = Ti.UI.createTextField(_.extend({
        top: 600,
        passwordMask: false,
        hintText: L('last_name')
    },theme.styles.textfield)),
    genderField = Ti.UI.createTextField(_.extend({
        top: 700,
        editable: false,
        hintText: L('gender')
    },theme.styles.textfield)),
    signupButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        top: 800,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        title: L('signup'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    }),
    genderOptionDialog = Ti.UI.createOptionDialog({
        title: L('gender'),
        options: [L('female'),L('male'), L('other')]
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(usernameField);
    self.add(emailField);
    self.add(passwordField);
    self.add(confirmPasswordField);
    self.add(firstNameField);
    self.add(lastNameField);
    self.add(genderField);
    self.add(signupButton);

    genderField.addEventListener('focus', function (e) {
        genderOptionDialog.show();
    });
    genderField.addEventListener('click', function (e) {
        genderOptionDialog.show();
    });

    genderOptionDialog.addEventListener('click', function (e) {
        if (e.index >= 0) {
            genderField.setValue(genderOptionDialog.getOptions()[e.index]);
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = SignupWindow;