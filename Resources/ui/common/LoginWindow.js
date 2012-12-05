function LoginWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        LoginService = require('business/services/LoginService'),
        SignupWindow = require('ui/common/SignupWindow'),
        MainWindow = require('ui/common/MainWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('login')},theme.styles.header.label)),
    errorView = Ti.UI.createView({
        top: 100,
        height: 80,
        left: 0,
        right: 0
    }),
    errorLabel = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        color: 'red',
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {fontSize: 24}
    }),
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
        backgroundColor: '#87B3FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        top: 400,
        title: L('login'),
        font: {fontSize: '18dp', fontWeight: 'bold'},
        enabled: false
    }),
    signupButton = Ti.UI.createButton({
        height: 90,
        left: 10,
        right: 10,
        bottom: 10,
        title: L('signup'),
        font: {fontSize: '15dp', fontWeight: 'bold'}
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('logging_in')
    }),
    service = new LoginService({});

    headerView.add(headerLabel);

    errorView.add(errorLabel);

    self.add(headerView);
    self.add(errorView);
    self.add(usernameField);
    self.add(passwordField);
    self.add(loginButton);
    self.add(signupButton);

    loginButton.addEventListener('click', function (e) {
        activityIndicator.show();
        service.process({login: usernameField.value, password: passwordField.value}).
                done(loginSuccessHandler).
                fail(loginFailHandler);
    });

    usernameField.addEventListener('change', enableDisableLoginButton);
    passwordField.addEventListener('change', enableDisableLoginButton);

    signupButton.addEventListener('click', function (e) {
        var signupWindow = new SignupWindow({controller: controller});
        signupWindow.open();
    });

    function enableDisableLoginButton (e) {
        if (usernameField.value.trim() && passwordField.value) {
            loginButton.backgroundColor = '#4086FF';
            loginButton.enabled = true;
        } else {
            loginButton.backgroundColor = '#87B3FF';
            loginButton.enabled = false;
        }
    }

    function loginSuccessHandler (data) {
        activityIndicator.hide();
        mainWindow = new MainWindow({controller: controller});
        mainWindow.open();
        self.close();
    }

    function loginFailHandler (error) {
        activityIndicator.hide();
        errorLabel.text = error.message;
    }

    return self;
}

module.exports = LoginWindow;