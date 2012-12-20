function RatingBar (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        defaults = {
            size: 90,
            amount: 5
        },
        defaultConfig = {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            layout: 'horizontal'
        },
        opts = _.extend(defaults, _args),
        config = _.extend(defaultConfig, _args.config),
        images = [],
        self = Ti.UI.createView(config);

    self._currentStar = 0;

    for (var i = 0; i < opts.amount; ++i) {
        var imageView = Ti.UI.createImageView({
            _index: i + 1,
            image: '/images/star_off.png',
            height: opts.size,
            width: opts.size,
            left: 5,
            right: 5
        });

        imageView.addEventListener('click', starClickHandler);
        self.add(imageView);
        images.push(imageView);
    }

    function starClickHandler (e) {
        var index = e.source._index;
        for (var i = 0; i < index; ++i) {
            selectStar(images[i]);
        }
        for(i = index; i < images.length; ++i) {
            deselectStar(images[i]);
        }
        self._currentStar = index;
        self.fireEvent('star:click',{source: self});
    }

    function selectStar (imageView) {
        imageView.image = '/images/star.png';
    }

    function deselectStar (imageView) {
        imageView.image = '/images/star_off.png';
    }

    self.getCurrentStar = function () {
        return self._currentStar;
    };

    return self;
}

module.exports = RatingBar;