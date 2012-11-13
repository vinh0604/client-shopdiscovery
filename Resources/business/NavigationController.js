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

module.exports = NavigationController;