function DirectionListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        steps = _args.steps,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('direction_list')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 0
    });

    for (var i = 0, l = steps.length; i < l; ++i) {
        var row = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE
        }),
        label = Ti.UI.createLabel({
            html: steps[i].html_instructions,
            color: '#000',
            left: 10,
            top: 5,
            bottom: 5
        });

        row.add(label);
        tableView.appendRow(row);
    }

    headerView.add(headerLabel);
    self.add(headerView);
    self.add(tableView);

    return self;
}

module.exports = DirectionListWindow;