var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    RatingStarBar = require('ui/components/RatingStarBar'),
    moment = require('lib/moment');

function ReviewRow (_args) {
    var item = _args.data,
    self = Ti.UI.createTableViewRow({
        _id: item.id,
        height: Ti.UI.SIZE,
        className: 'reviewDetail',
        layout: 'vertical'
    });

    var titleLabel = Ti.UI.createLabel({
        top: 10,
        left: 10,
        text: item.title,
        color: '#000',
        font: {fontSize: 28, fontWeight: 'bold'}
    }),
    ratingView = Ti.UI.createView({
        layout: 'horizontal',
        left: 10,
        top: 5
    }),
    ratingStarBar = new RatingStarBar({
        config: {left: 0, width: Ti.UI.SIZE},
        size: 33,
        max: 5,
        rating: item.rating
    }),
    nameLabel = Ti.UI.createLabel({
        left: 10,
        text: item.reviewer.name,
        color: '#000',
        font: {fontSize: 28, fontWeight: 'bold'}
    }),
    dateLabel = Ti.UI.createLabel({
        left: 10,
        text: moment(item.updated_date, "YYYY-MM-DD").format("MM/DD/YY"),
        font: {fontSize: 28}
    }),
    contentLabel = Ti.UI.createLabel({
        top: 5,
        left: 10,
        bottom: 10,
        text: item.content,
        color: '#000',
        font: {fontSize: 28}
    });

    ratingView.add(ratingStarBar);
    ratingView.add(nameLabel);
    ratingView.add(dateLabel);

    self.add(titleLabel);
    self.add(ratingView);
    self.add(contentLabel);

    return self;
}

module.exports = ReviewRow;