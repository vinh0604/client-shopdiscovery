function StaticRatingStarBar (_args) {
    var _ = require('lib/underscore'),
        size = _args.size || 20,
        defaults = {
            height:size,
            touchEnabled: false
        },
        opts = _.extend(defaults, _args.config),
        self = Ti.UI.createView(opts);

    var max = _args.max;

    for (var i = 0; i < max; ++i) {
        var starImageView = Ti.UI.createImageView({
            left: i * size,
            height: size,
            width: size,
            image: '/images/star_off.png',
            visible: true
        });
        if (i >= _args.rating) {
            starImageView.image = '/images/star_off.png';
        } else if (_args.rating >= i+1) {
            starImageView.image = '/images/star.png';
        } else {
            starImageView.image = '/images/star_half.png';
        }
        self.add(starImageView);
    }

    var countLabel = Ti.UI.createLabel({
        left: size * 5 + 5,
        height: size,
        font: {fontSize: size - 5},
        color: '#000',
        text: _args.count ? '(' + _args.count + ')' : ''
    });
    self.add(countLabel);

    return self;
}

module.exports = StaticRatingStarBar;