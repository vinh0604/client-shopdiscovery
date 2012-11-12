function ReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        opts = _args,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        width : theme.platformWidth - 100,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('review_sort')},theme.styles.popup.header.label)),
    reviewTableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90
    });

    for (var i = 4; i > 0; --i) {
        var row = Ti.UI.createTableViewRow({
            height: 90,
            className: 'starRow'
        }),
        ratingStarBar = new RatingStarBar({max: 5, rating: i, size: 30, config: {left: 10}}),
        label = Ti.UI.createLabel({
            text: L('up'),
            font: {fontSize: 25},
            color: '#000',
            left: 165,
            touchEnabled: false
        });

        row.add(ratingStarBar);
        row.add(label);

        reviewTableView.appendRow(row);
    }

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(reviewTableView);
    self.add(view);

    return self;
}

module.exports = ReviewWindow;