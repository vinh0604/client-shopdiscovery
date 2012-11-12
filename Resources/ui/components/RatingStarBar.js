function RatingStarBar (_args) {
    var _ = require('lib/underscore'),
        size = _args.size || 20,
        defaults = {
            height:size,
            layout: 'horizontal',
            touchEnabled: false
        },
        opts = _.extend(defaults, _args.config),
        self = Ti.UI.createView(opts);

    var max = _args.max,
        count = _args.count;
        rating = _args.rating;

    for (var i = 0; i < max; ++i) {
        var starImageView = Ti.UI.createImageView({
            height: size,
            width: size
        });

        if (i >= rating) {
            starImageView.image = '/images/star_off.png';
        } else if (rating >= i+1) {
            starImageView.image = '/images/star.png';
        } else {
            starImageView.image = '/images/star_half.png';
        }

        self.add(starImageView);
    }
    if (count !== undefined) {
        var countLabel = Ti.UI.createLabel({
            left: 5,
            height: size,
            font: {fontSize: size - 5},
            color: '#000',
            text: count ? '(' + count + ')' : ''
        });
        self.add(countLabel);
    }
    

    return self;
}

module.exports = RatingStarBar;