function NavigationController () {
    this.windowStack = [];

    return this;
}

NavigationController.prototype.registerMenu = function (win) {
    var self = this,
        activity = win.activity;
    activity.onCreateOptionsMenu = function(e){
        var menu = e.menu;
        var home = menu.add({title: L('home')}),
            my_shop = menu.add({title: L('my_shop')}),
            profile = menu.add({title: L('my_profile')}),
            logout = menu.add({title: L('log_out')});

        home.setIcon('/images/house.png');
        my_shop.setIcon('/images/shop.png');
        profile.setIcon('/images/user.png');
        logout.setIcon('/images/power.png');
        home.addEventListener("click", function (e) {
            self.home();
        });
        logout.addEventListener("click", function (e) {
            self.logout();
        });
        profile.addEventListener("click", function (e) {
            self.openProfile();
        });
        my_shop.addEventListener("click", function (e) {
            self.openMyShop();
        });
    };
};

NavigationController.prototype.register = function (win) {
    var self = this;

    this.registerMenu(win);
    this.windowStack.push(win);

    win.addEventListener('close', function (e) {
        self.windowStack.pop();
    });
};

NavigationController.prototype.home = function () {
    var windows = this.windowStack.concat([]);
    for(var i = 1, l = windows.length; i < l; i++) {
        windows[i].close();
    }
    this.windowStack = [this.windowStack[0]];
};

NavigationController.prototype.logout = function () {
    var LogoutService = require('business/services/LogoutService'),
        self = this,
        activityIndicator = Ti.UI.createActivityIndicator({
            message: L('logging_out')
        }),
        service = new LogoutService({});

    service.process().done(function () {
        var LoginWindow = require('ui/common/LoginWindow'),
            win = new LoginWindow({controller: self}),
            windows = self.windowStack.concat([]);
        win.open();
        for(var i = 0, l = windows.length; i < l; i++) {
            windows[i].close();
        }
    }).fail(function (e) {
        alert(e.error);
    });
};

NavigationController.prototype.openProfile = function () {
    this.home();
    var ProfileWindow = require('ui/common/ProfileWindow'),
        win = new ProfileWindow({controller: this});
    win.open();
};

NavigationController.prototype.openMyShop = function () {
    this.home();
    var ShopManagementWindow = require('ui/common/ShopManagementWindow'),
        win = new ShopManagementWindow({controller: this});
    win.open();
};

module.exports = NavigationController;