//SearchView Component Constructor
function SearchWindow(_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        titaniumBarcode = require('com.mwaysolutions.barcode'),
        SearchBar = require('ui/components/SearchBar'),
        SavedSearchWindow = require('ui/common/SavedSearchWindow'),
        SearchResultWindow = require('ui/common/SearchResultWindow'),
        SearchView = require('ui/common/SearchView'),
        defaults = {backgroundColor:'#ffffff'},
        opts = _args,
        config = _.extend(defaults, _args.config),
        controller = _args.controller,
        searchView = new SearchView({keyword: opts.keyword, controller: controller}),
        self = Ti.UI.createWindow(_.extend(config,theme.styles.Window));

    self.add(searchView);

    self.addEventListener('open', function (e) {
        searchView.setFocus();
        controller.register(self);
    });

    return self;
}

module.exports = SearchWindow;
