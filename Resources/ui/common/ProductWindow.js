function ProductWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        accounting = require('lib/accounting'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        APP_CONST = require('business/constants'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    item = {
        id: 1,
        photos: [
            {thumb: '/images/Phone.png', url: '/images/Phone.png'},
            {thumb: '/images/Phone.png', url: '/images/Phone.png'}],
        name: 'Sample Product Name with some details',
        price: 2000000,
        price_unit: 'VND',
        condition: 1,
        warranty: 12,
        origin: 1,
        shop: {id: 1, name: 'Sample Shop Name with some details'},
        rating: 4.2,
        rating_count: 200
    };

    var tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderColor: 'gray',
        borderWidth: 1
    }),
    photoRow = Ti.UI.createTableViewRow({
        height: 250
    }),
    photoView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }),
    photoScrollView = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: 'auto',
        scrollType: 'horizontal'
    }),
    nameRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    nameView = Ti.UI.createView({
        left: 10,
        top: 10,
        right: 161
    }),
    nameLabel = Ti.UI.createLabel({
        left: 0,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        text: item.name
    }),
    seperatorView = Ti.UI.createView({
        width: 1,
        right: 161,
        top: 0,
        bottom: 0,
        backgroundColor: 'gray'
    }),
    wishListView = Ti.UI.createView({
        right: 0,
        width: 160,
        height: 160
    }),
    wishListButton = Ti.UI.createButton({
        height: 128,
        width: 128,
        backgroundImage: '/images/heart_gray.png'
    }),
    infoRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        layout: 'vertical'
    }),
    priceView = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10
    }),
    priceLabel = Ti.UI.createLabel({
        left: 0,
        width: 200,
        font: {fontSize: 24},
        text: L('price') + ':'
    }),
    priceValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        text: accounting.formatMoney(item.price, {symbol: item.price_unit}),
        font: {fontWeight: 'bold', fontSize: 24},
        color: '#000'
    }),
    conditionView = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10
    }),
    conditionLabel = Ti.UI.createLabel({
        left: 0,
        width: 200,
        font: {fontSize: 24},
        text: L('condition') + ':'
    }),
    conditionValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 24},
        color: '#000',
        text: APP_CONST.DATA.CONDITION[item.condition]
    }),
    warrantyView = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10
    }),
    warrantyLabel = Ti.UI.createLabel({
        left: 0,
        width: 200,
        font: {fontSize: 24},
        text: L('warranty') + ':'
    }),
    warrantyValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 24},
        color: '#000',
        text: item.warranty + ' ' + L('month')
    }),
    originView = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10
    }),
    originLabel = Ti.UI.createLabel({
        left: 0,
        width: 200,
        font: {fontSize: 24},
        text: L('origin') + ':'
    }),
    originValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 24},
        color: '#000',
        text: APP_CONST.DATA.ORIGIN[item.origin]
    }),
    reviewRow = Ti.UI.createTableViewRow({
        height: 75,
        rightImage: '/images/arrow_right.png'
    }),
    reviewLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        left: 10,
        width: 200,
        font: {fontSize: 30, fontWeight: 'bold'},
        text: L('review')
    }),
    ratingStarBar = new RatingStarBar({
        config: {left: 210},
        size: 35,
        max: 5,
        rating: item.rating,
        count: item.rating_count
    }),
    descriptionRow = Ti.UI.createTableViewRow({
        height: 75,
        rightImage: '/images/arrow_right.png'
    }),
    descriptionLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 10,
        color: '#000',
        font: {fontSize: 30, fontWeight: 'bold'},
        text: L('description')
    }),
    specificRow = Ti.UI.createTableViewRow({
        height: 75,
        rightImage: '/images/arrow_right.png'
    }),
    specificLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 10,
        color: '#000',
        font: {fontSize: 30, fontWeight: 'bold'},
        text: L('specific')
    }),
    shopRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        rightImage: '/images/arrow_right.png'
    }),
    shopLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 10,
        color: '#000',
        width: 200,
        top: 10,
        font: {fontSize: 30, fontWeight: 'bold'},
        text: L('shop')
    }),
    shopValueLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 10,
        color: '#000',
        left: 210,
        right: 10,
        bottom: 10,
        font: {fontSize: 30},
        text: item.shop.name
    }),
    buyRow = Ti.UI.createTableViewRow({
        height: 110
    }),
    buyButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        title: L('buy'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    });

    setPhotos(item.photos);

    photoView.add(photoScrollView);
    photoRow.add(photoView);

    nameView.add(nameLabel);
    wishListView.add(wishListButton);
    nameRow.add(nameView);
    nameRow.add(seperatorView);
    nameRow.add(wishListView);

    priceView.add(priceLabel);
    priceView.add(priceValueLabel);
    conditionView.add(conditionLabel);
    conditionView.add(conditionValueLabel);
    warrantyView.add(warrantyLabel);
    warrantyView.add(warrantyValueLabel);
    originView.add(originLabel);
    originView.add(originValueLabel);
    infoRow.add(priceView);
    infoRow.add(conditionView);
    infoRow.add(warrantyView);
    infoRow.add(originView);

    reviewRow.add(reviewLabel);
    reviewRow.add(ratingStarBar);
    descriptionRow.add(descriptionLabel);
    specificRow.add(specificLabel);
    shopRow.add(shopLabel);
    shopRow.add(shopValueLabel);
    buyRow.add(buyButton);

    tableView.setData([photoRow, nameRow, infoRow, reviewRow, descriptionRow, specificRow, shopRow, buyRow]);

    self.add(tableView);

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    function setPhotos (photos) {
        for (var i = 0, l = photos.length; i < l; ++i) {
            var imageView = Ti.UI.createImageView({
                _index: i,
                left: 250 * i + 10,
                image: photos[i].thumb,
                height: 250,
                width: 250
            });
            imageView.addEventListener('click', imageClickHandler);
            photoScrollView.add(imageView);
        }
    }

    function imageClickHandler (e) {
        var PhotoWindow = require('ui/common/PhotoWindow'),
            photoWindow = new PhotoWindow({photos: item.photos, index: e.source._index, controller: controller});

        photoWindow.open();
    }

    return self;
}

module.exports = ProductWindow;