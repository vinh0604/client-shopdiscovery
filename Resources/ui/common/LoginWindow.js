function LoginWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SignupWindow = require('ui/common/SignupWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('login')},theme.styles.header.label)),
    usernameField = Ti.UI.createTextField(_.extend({
        top: 200,
        hintText: L('username_or_email')
    },theme.styles.textfield)),
    passwordField = Ti.UI.createTextField(_.extend({
        top: 300,
        passwordMask: true,
        hintText: L('password')
    },theme.styles.textfield)),
    loginButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        top: 400,
        title: L('login'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    }),
    signupButton = Ti.UI.createButton({
        height: 90,
        left: 10,
        right: 10,
        bottom: 10,
        title: L('signup'),
        font: {fontSize: '15dp', fontWeight: 'bold'}
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(usernameField);
    self.add(passwordField);
    self.add(loginButton);
    self.add(signupButton);

    signupButton.addEventListener('click', function (e) {
        var signupWindow = new SignupWindow({controller: controller});
        signupWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = LoginWindow;