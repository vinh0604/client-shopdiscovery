function RatingStarBar (_args) {
    var _ = require('lib/underscore'),
        size = _args.size || 20,
        defaults = {
            height:size,
            touchEnabled: false
        },
        opts = _.extend(defaults, _args.config),
        self = Ti.UI.createView(opts),
        starImageViews = [];

    var max = _args.max;

    for (var i = 0; i < max; ++i) {
        var starImageView = {};
        starImageView.off = Ti.UI.createImageView({
            left: i * size,
            height: size,
            width: size,
            image: '/images/star_off.png',
            visible: true
        });
        starImageView.full = Ti.UI.createImageView({
            left: i * size,
            height: size,
            width: size,
            image: '/images/star.png',
            visible: false
        });
        starImageView.half = Ti.UI.createImageView({
            left: i * size,
            height: size,
            width: size,
            image: '/images/star_half.png',
            visible: false
        });
        self.add(starImageView.off);
        self.add(starImageView.full);
        self.add(starImageView.half);
        starImageViews.push(starImageView);
    }

    var countLabel = Ti.UI.createLabel({
        left: size * 5 + 5,
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
            starImageViews[i].off.visible = false;
            starImageViews[i].full.visible = false;
            starImageViews[i].half.visible = false;
            if (i >= data.rating) {
                starImageViews[i].off.visible = true;
            } else if (data.rating >= i+1) {
                starImageViews[i].full.visible = true;
            } else {
                starImageViews[i].half.visible = true;
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