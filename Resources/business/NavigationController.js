function NavigationController () {
    this.windowStack = [];

    return this;
}

NavigationController.prototype.register = function (win) {
    var self = this;

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