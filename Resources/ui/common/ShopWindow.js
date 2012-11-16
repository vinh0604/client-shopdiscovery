function ShopWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));
}

module.exports = ShopWindow;