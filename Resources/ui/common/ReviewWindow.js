function ReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('reviews')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90
    }),
    productNameRow = Ti.UI.createTableViewRow({

    }),
    reviewSummaryRow = Ti.UI.createTableViewRow({

    }),
    newReviewButton = Ti.UI.createButton({
        bottom: 0,
        height: 90,
        left: 0,
        right: 0,
        title: L('new_review')
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = ReviewWindow;