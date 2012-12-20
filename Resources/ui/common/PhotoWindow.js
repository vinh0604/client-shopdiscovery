function PhotoWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        photos = _args.photos || [],
        index = _args.index,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var photosView = Ti.UI.createScrollableView({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        showPagingControl:true
    }),
    imageViewArr = [];

    for (var i = 0, l = photos.length; i < l; ++i) {
        var imageView = Ti.UI.createImageView({
            image: photos[i].url
        });
        imageViewArr.push(imageView);
    }

    photosView.setViews(imageViewArr);
    if (index !== undefined) {
        photosView.setCurrentPage(index);
    }

    self.add(photosView);

    return self;
}

module.exports = PhotoWindow;