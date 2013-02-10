function SavedSearchWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DB = require('business/database'),
        SearchResultWindow = require('ui/common/SearchResultWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var data = DB.getSearchHistories(),
        tableRows = [];

    var keywordTableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90
    }),
    headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('search_history')},theme.styles.header.label)),
    clearButton = Ti.UI.createButton({
        height: 90,
        bottom: 0,
        width: theme.platformWidth,
        title: L('clear_history')
    });

    for (var i = 0, l = data.length; i < l; ++i) {
        var row = Ti.UI.createTableViewRow({
            height: 90,
            color: '#000',
            title: data[i]
        });
        row.addEventListener('click', searchHandler);

        tableRows.push(row);
    }

    keywordTableView.setData(tableRows);
    headerView.add(headerLabel);
    self.add(headerView);
    self.add(keywordTableView);
    self.add(clearButton);

    clearButton.addEventListener('click', function (e) {
        DB.removeSearchHistories();
        keywordTableView.setData([]);
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    function searchHandler(e) {
        if (e.rowData) {
            var params = {page: 1, per_page:30, keyword:e.rowData.title},
                searchResultWindow = new SearchResultWindow({params: params, controller: controller});
            controller.home();
            searchResultWindow.open();
        }
        
    }

    return self;
}

module.exports = SavedSearchWindow;