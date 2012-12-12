var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    RatingStarBar = require('ui/components/RatingStarBar'),
    APP_CONST = require('business/constants');

function ShopRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 200,
            className: 'shopDetail'
        });

    var photoView = Ti.UI.createImageView({
        left: 0,
        touchEnabled: false,
        image: item.photo ? item.photo : APP_CONST.DEFAULT.SHOP_PHOTO,
        height: 200,
        width: 200
    }),
    detailView = Ti.UI.createView({
        touchEnabled: false,
        right: 10,
        top: 0,
        left: 210,
        layout: 'vertical'
    }),
    nameLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.name,
        font: {fontWeight: 'bold', fontSize: 20},
        color: '#000'
    }),
    ratingStarBar = new RatingStarBar({max: 5, rating: item.rating, count: item.rating_count}),
    addressLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.address,
        font: {fontSize: 20},
        color: '#000'
    }),
    tagsLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.tags.join(', '),
        font: {fontSize: 20},
        color: '#666'
    });

    detailView.add(nameLabel);
    detailView.add(ratingStarBar);
    detailView.add(addressLabel);
    detailView.add(tagsLabel);

    self.add(photoView);
    self.add(detailView);

    return self;
}

module.exports = ShopRow;