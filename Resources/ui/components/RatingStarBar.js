function RatingStarBar (_args) {
    var _ = require('lib/underscore'),
        size = _args.size || 20,
        defaults = {
            height:size,
            layout: 'horizontal',
            touchEnabled: false
        },
        opts = _.extend(defaults, _args.config),
        self = Ti.UI.createView(opts),
        starImageViews = [];

    var max = _args.max;

    for (var i = 0; i < max; ++i) {
        var starImageView = Ti.UI.createImageView({
            height: size,
            width: size,
            image: '/images/star_off.png'
        });
        self.add(starImageView);
        starImageViews.push(starImageView);
    }

    var countLabel = Ti.UI.createLabel({
        left: 5,
        height: size,
        font: {fontSize: size - 5},
        color: '#000',
        text: ''
    });
    self.add(countLabel);
    
    self.setRating = function (data) {
        if (data.rating === undefined) {
            return;
        }
        
        for (var i = 0, l = starImageViews.length; i < l; ++i) {
            if (i >= data.rating) {
                starImageViews[i].image = '/images/star_off.png';
            } else if (data.rating >= i+1) {
                starImageViews[i].image = '/images/star.png';
            } else {
                starImageViews[i].image = '/images/star_half.png';
            }
        }

        if (data.count) {
            countLabel.text = '(' + data.count + ')';
        }
    };

    self.setRating(_args);

    return self;
}

module.exports = RatingStarBar;