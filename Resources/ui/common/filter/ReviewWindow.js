function ReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        RatingStarBar = require('ui/components/StaticRatingStarBar'),
        opts = _args,
        rows = [],
        params = opts.params,
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

    for (var i = 4; i >= 0; --i) {
        var row = Ti.UI.createTableViewRow({
            height: 90,
            className: 'starRow',
            _index: i ? i : null
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

        rows.push(row);
    }

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(reviewTableView);
    self.add(view);

    reviewTableView.addEventListener('click', function (e) {
        if (e.rowData) {
            params.min_score = e.rowData._index;
            self.close();
        }
    });

    self.addEventListener('click', function (e) {
        if (e.source == self) {
            self.close();
        }
    });

    self.addEventListener('open', function (e) {
        if (params.min_score && (params.min_score < 5)) {
            rows[4 - params.min_score].rightImage = '/images/check.png';
        } else {
            rows[4].rightImage = '/images/check.png';
        }
        reviewTableView.setData(rows);
    });

    return self;
}

module.exports = ReviewWindow;