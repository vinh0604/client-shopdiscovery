function BackgroundWindow (_args) {
    var _ = require('lib/underscore'),
        LoginService = require('business/services/LoginService'),
        LoginWindow = require('ui/common/LoginWindow'),
        MainWindow = require('ui/common/MainWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow({
            navBarHidden:true,
            exitOnClose: true,
            backgroundColor: '#fff'
        }),
        activityIndicator = Ti.UI.createActivityIndicator({
            message: L('logging_in')
        }),
        service = new LoginService({});

    self.addEventListener('open', function (e) {
        var currentUser = service.getCurrentUser();
        if (currentUser) {
            activityIndicator.show();
            service.process({login: currentUser.username, password: currentUser.password}).
                done(openMainWindow).
                fail(openLoginWindow);
        } else {
            openLoginWindow();
        }
    });

    self.addEventListener('close', function (e) {
        var currentUser = service.getCurrentUser();
        if (currentUser) {
            var LogoutService = require('business/services/LogoutService'),
                logoutService = new LogoutService({});
            logoutService.process(true);
        }
    });

    function openMainWindow () {
        activityIndicator.hide();
        var mainWindow = new MainWindow({controller:controller});
        mainWindow.open();
    }

    function openLoginWindow () {
        activityIndicator.hide();
        var loginWindow = new LoginWindow({controller:controller});
        loginWindow.open();
    }

    return self;
}

module.exports = BackgroundWindow;