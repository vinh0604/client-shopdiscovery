var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    accounting = require('lib/accounting'),
    ProgressBar = require('ui/components/ProgressBar');

function PromotionRow (_args) {
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
    priceLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        font: {fontSize: 20},
        text: L('price')+': '+accounting.formatMoney(item.price, {symbol: item.price_unit}),
        color: '#000'
    }),
    dealPriceLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: String.format(L('deal_price'),accounting.formatMoney(item.deal_price, {symbol: item.price_unit})),
        font: {fontSize: 20},
        color: '#EB0C17'
    });

    detailView.add(nameLabel);
    detailView.add(priceLabel);
    detailView.add(dealPriceLabel);
    if (item.amount > 0) {
        var progessBar = new ProgressBar({config: {top: 5, left: 0, height: 30}, current: item.bid_count, total: item.amount});
        detailView.add(progessBar);
    }

    self.add(photoView);
    self.add(detailView);

    return self;
}

module.exports = PromotionRow;