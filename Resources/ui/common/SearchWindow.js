//SearchView Component Constructor
function SearchWindow(_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SearchView = require('ui/common/SearchView'),
        defaults = {backgroundColor:'#ffffff'},
        opts = _args,
        config = _.extend(defaults, _args.config),
        controller = _args.controller,
        searchView = new SearchView({params: opts.params, controller: controller}),
        self = Ti.UI.createWindow(_.extend(config,theme.styles.Window));

    self.add(searchView);

    self.addEventListener('open', function (e) {
        searchView.setFocus();
        controller.register(self);
    });

    return self;
}

module.exports = SearchWindow;
