var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    accounting = require('lib/accounting');

function ProductGroupRow(_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            _name: item.name,
            height: 200,
            className: 'productGroupDetail'
        });

    var photoView = Ti.UI.createImageView({
        left: 0,
        touchEnabled: false,
        image: item.photo,
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
    soldShopsLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: String.format(L('sold_shop'),item.shop_count),
        font: {fontSize: 20},
        color: '#000'
    }),
    priceView = Ti.UI.createView({
        touchEnabled: false,
        left: 0,
        layout: 'horizontal'
    }),
    priceFromLabel = Ti.UI.createLabel({
        touchEnabled: false,
        text: L('price_from') + ' ',
        font: {fontSize: 20},
        color: '#000'
    }),
    priceLabel = Ti.UI.createLabel({
        touchEnabled: false,
        text: accounting.formatMoney(item.min_price, {symbol: item.price_unit}),
        font: {fontSize: 20},
        color: '#EB0C17'
    });

    priceView.add(priceFromLabel);
    priceView.add(priceLabel);

    detailView.add(nameLabel);
    detailView.add(soldShopsLabel);
    detailView.add(priceView);

    self.add(photoView);
    self.add(detailView);

    return self;
}

module.exports = ProductGroupRow;