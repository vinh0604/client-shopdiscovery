var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    accounting = require('lib/accounting'),
    RatingStarBar = require('ui/components/RatingStarBar');

function ProductRow(_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 200,
            className: 'productDetail'
        });

    var photoView = Ti.UI.createImageView({
        left: 0,
        touchEnabled: false,
        image: item.photo,
        height: 200,
        width: 200
    }),
    leftView = Ti.UI.createView({
        touchEnabled: false,
        right: 200,
        top: 0,
        left: 210,
        layout: 'vertical'
    }),
    rightView = Ti.UI.createView({
        touchEnabled: false,
        top: 0,
        width: 180,
        right: 10,
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
    shopLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.shop,
        font: {fontSize: 20},
        color: '#000'
    }),
    categoryLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: String.format(L('category'),item.category),
        font: {fontSize: 20},
        color: '#000'
    }),
    priceLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.price ? accounting.formatMoney(item.price, {symbol: item.price_unit}) : L('NA'),
        font: {fontWeight: 'bold', fontSize: 20},
        color: '#EB0C17'
    }),
    statusLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.status,
        font: {fontWeight: 'bold', fontSize: 20},
        color: '#666'
    }),
    distanceLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.distance ? String.format(L('distance'), item.distance) : '',
        font: {fontSize: 20},
        color: '#000'
    });

    leftView.add(nameLabel);
    leftView.add(ratingStarBar);
    leftView.add(shopLabel);
    leftView.add(categoryLabel);
    rightView.add(priceLabel);
    rightView.add(statusLabel);
    rightView.add(distanceLabel);

    self.add(photoView);
    self.add(leftView);
    self.add(rightView);

    return self;
}

module.exports = ProductRow;