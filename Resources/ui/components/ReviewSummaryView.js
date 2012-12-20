function ReviewSummaryView (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        ProgressBar = require('ui/components/ProgressBar'),
        countLabels = {},
        progressBars = {},
        defaults = {
            top: 10,
            left: 10,
            right: 0,
            layout: 'vertical'
        },
        config = _.extend(defaults, _args.config),
        self = Ti.UI.createView(config);

    var ratingStarBar = new RatingStarBar({
        config: {left: 0, bottom: 20},
        size: 35,
        max: 5
    });

    self.add(ratingStarBar);

    for (var i = 5; i > 0; --i) {
        var starView = Ti.UI.createView({
            left: 0,
            bottom: 2,
            height: Ti.UI.SIZE,
            layout: 'horizontal'
        }),
        starLabel = Ti.UI.createLabel({
            text: i + ' ' + L('star'),
            color: '#000',
            font: {fontSize: 28}
        }),
        progressBar = new ProgressBar({
            config: {left: 10, width: 250, backgroundColor: '#FFF3D1', borderWidth: 0, height: 40},
            color: '#FFC31F',
            showText: false
        }),
        starCountLabel = Ti.UI.createLabel({
            left: 10,
            color: '#000',
            font: {fontSize: 28}
        });

        if (i == 1) {
            starView.bottom = 10;
        }

        starView.add(starLabel);
        starView.add(progressBar);
        starView.add(starCountLabel);

        countLabels[i] = starCountLabel;
        progressBars[i] = progressBar;

        self.add(starView);
    }

    self.setSummaryData = function (data) {
        ratingStarBar.setRating({
            rating: data.rating,
            count: data.rating_count
        });
        for (var i = 1; i <= 5; ++i) {
            countLabels[i].text = '(' + data.star_count[i] + ')';
            progressBars[i].setProgress({
                current: data.star_count[i],
                total: data.rating_count
            });
        }
    };

    return self;
}

module.exports = ReviewSummaryView;