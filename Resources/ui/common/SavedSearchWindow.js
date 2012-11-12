function SavedSearchWindow (_args) {
    var $$ = require('helpers/utility'),
        theme = require('helpers/theme'),
        SearchResultWindow = require('ui/common/SearchResultWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow($$.combine({backgroundColor: '#fff'},theme.styles.Window));

    var sample_data = [
            {keyword: 'nexus 7'},
            {keyword: 'galaxy note'},
            {keyword: 'kindle fire'}
        ],
        tableRows = [];

    var keywordTableView = Ti.UI.createTableView({
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

    headerView.add(headerLabel);
    keywordTableView.setHeaderView(headerView);

    for (var i = 0, l = sample_data.length; i < l; ++i) {
        var row = Ti.UI.createTableViewRow({
            height: 90
        }),
        label = Ti.UI.createLabel({
            color: '#000',
            text: sample_data[i].keyword,
            left: 20
        });

        row.add(label);
        row.addEventListener('click', searchHandler);

        tableRows.push(row);
    }
    keywordTableView.setData(tableRows);

    self.add(keywordTableView);
    self.add(clearButton);

    clearButton.addEventListener('click', function (e) {
        keywordTableView.setData([]);
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    function searchHandler(e) {
        var keyword = sample_data[e.index].keyword;
        if (keyword) {
            var searchResultWindow = new SearchResultWindow({keyword: keyword, controller: controller});
            controller.home();
            searchResultWindow.open();
        }
    }

    return self;
}

module.exports = SavedSearchWindow;