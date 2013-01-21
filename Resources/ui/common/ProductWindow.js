function ProductWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        accounting = require('lib/accounting'),
        ShopProductService = require('business/services/ShopProductService'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        APP_CONST = require('business/constants'),
        item = {id: _args.data.id},
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    // item = {
    //     id: 1,
    //     product_id: 1,
    //     photos: [
    //         {url: '/images/Phone.png'},
    //         {url: '/images/Phone.png'}],
    //     name: 'Sample Product Name with some details',
    //     price: 2000000,
    //     price_unit: 'VND',
    //     status: 'New',
    //     warranty: 12,
    //     origin: 'Hand luggage',
    //     category: {id: 1, name: 'Category', ancestors: ['Parent']},
    //     shop: {id: 1, name: 'Sample Shop Name with some details'},
    //     promotion: {id: 1, price: 1500000, active: true, },
    //     specifics: {},
    //     rating: 4.2,
    //     rating_count: 200
    // };

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
        color: '#000'
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
        backgroundImage: '/images/heart_gray.png',
        _isCheck: false
    }),
    promotionRow = null,
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
        color: '#000'
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
        color: '#000'
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
        color: '#000'
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
        max: 5
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
        font: {fontSize: 30}
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
    }),
    allOfferRow =  Ti.UI.createTableViewRow({
        height: 75
    }),
    allOfferLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        text: L('view_all_offer'),
        font: {fontSize: 30, fontWeight: 'bold'}
    }),
    shopProductService = new ShopProductService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

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
    allOfferRow.add(allOfferLabel);

    reviewRow.add(reviewLabel);
    reviewRow.add(ratingStarBar);
    descriptionRow.add(descriptionLabel);
    specificRow.add(specificLabel);
    shopRow.add(shopLabel);
    shopRow.add(shopValueLabel);
    buyRow.add(buyButton);

    tableView.setData([photoRow, nameRow, infoRow, reviewRow, descriptionRow, specificRow, shopRow, buyRow, allOfferRow]);

    self.add(tableView);

    reviewRow.addEventListener('click', function (e) {
        var ReviewWindow = require('ui/common/ReviewWindow'),
            reviewWindow = new ReviewWindow({
                controller: controller,
                data: item,
                type: APP_CONST.TYPE.SHOP_PRODUCT
            });
        reviewWindow.open();
    });

    descriptionRow.addEventListener('click', function (e) {
        var DescriptionWindow = require('ui/common/DescriptionWindow'),
            descriptionWindow = new DescriptionWindow({
                controller: controller,
                data: item
            });
        descriptionWindow.open();
    });

    specificRow.addEventListener('click', function (e) {
        var data = _.pick(item,'id','name','barcode','specifics');
        if (_.isArray(item.category.ancestors)) {
            data.category = item.category.ancestors.slice(0);
            data.category.push(item.category.name);
        } else {
            data.category = [item.category.name];
        }
        
        var SpecificationWindow = require('ui/common/SpecificationWindow'),
            specificationWindow = new SpecificationWindow({
                controller: controller,
                data: data
            });
        specificationWindow.open();
    });

    shopRow.addEventListener('click', function (e) {
        var ShopWindow = require('ui/common/ShopWindow'),
            shopWindow = new ShopWindow({
                controller: controller,
                data: {id: item.shop.id}
            });
        shopWindow.open();
    });

    allOfferRow.addEventListener('click', function (e) {
        var SecondProductListWindow = require('ui/common/SecondProductListWindow'),
            spListWindow = new SecondProductListWindow({
                controller: controller,
                data: {
                    product_id: item.product_id,
                    product: item.name
                }
            });
        spListWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        shopProductService.one(item.id).done(function (result) {
            item = result;
            setData();
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
        shopProductService.checkWishlist(item.id).done(function (result) {
            if (result) {
                wishListButton._isCheck = true;
                wishListButton.backgroundImage = '/images/heart_yellow.png';
            }
            wishListButton.addEventListener('click', wishListClickHandler);
        }).fail(function (e) {
            var toast = Ti.UI.createNotification({
                duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                message: e.error.toString()
            });
            toast.show();
            wishListButton.addEventListener('click', wishListClickHandler);
        });
    });

    function setPhotos (photos) {
        var photoScrollView = Ti.UI.createScrollView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            contentWidth: 'auto',
            scrollType: 'horizontal'
        });
        if (photos && photos.length) {
            for (var i = 0, l = photos.length; i < l; ++i) {
                var imageView = Ti.UI.createImageView({
                    _index: i,
                    left: 250 * i + 10,
                    image: photos[i].url,
                    height: 250,
                    width: 250
                });
                imageView.addEventListener('click', imageClickHandler);
                photoScrollView.add(imageView);
            }
        } else{
            var image = Ti.UI.createImageView({
                left: 10,
                image: APP_CONST.DEFAULT.NO_PHOTO,
                height: 250,
                width: 250
            });
            photoScrollView.add(image);
        }
        photoView.add(photoScrollView);
    }

    function imageClickHandler (e) {
        var PhotoWindow = require('ui/common/PhotoWindow'),
            photoWindow = new PhotoWindow({photos: item.photos, index: e.source._index});

        photoWindow.open();
    }

    function setData () {
        nameLabel.text = item.name;
        priceValueLabel.text = item.price ? accounting.formatMoney(item.price, {symbol: item.price_unit}) : L('NA');
        conditionValueLabel.text = item.status;
        originValueLabel.text = item.origin;
        warrantyValueLabel.text = item.warranty ? (item.warranty + ' ' + L('month')) : L('NA');
        shopValueLabel.text = item.shop.name;
        setPhotos(item.photos);
        ratingStarBar.setRating({count: item.rating_count, rating: item.rating});
        if (item.promotion && item.promotion.active) {
            setPromotion(item.promotion);
            priceValueLabel.color = '#ddd';
        } else if (promotionRow) {
            tableView.deleteRow(2);
            promotionRow = null;
            priceValueLabel.color = '#000';
        }
    }

    function setPromotion (promotion) {
        promotionRow = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE
        }),
        dealPriceLabel = Ti.UI.createLabel({
            top: 10,
            left: 10,
            font: {fontSize: 24},
            text: L('deal_price_text')
        }),
        dealPriceValueLabel = Ti.UI.createLabel({
            top: 10,
            left: 210,
            font: {fontSize: 24, fontWeight: 'bold'},
            color: 'red',
            text: promotion.price ? accounting.formatMoney(promotion.price, {symbol: item.price_unit}) : L('NA')
        }),
        expireLabel = Ti.UI.createLabel({
            top: 45,
            left: 10,
            bottom: 10,
            font: {fontSize: 24},
            text: L('expired_date')
        }),
        expireValueLabel = Ti.UI.createLabel({
            top: 45,
            left: 210,
            font: {fontSize: 24},
            color: '#000',
            text: moment(promotion.expires).format('MM-DD-YYYY HH:mm')
        });
        promotionRow.add(dealPriceLabel);
        promotionRow.add(dealPriceValueLabel);
        promotionRow.add(expireLabel);
        promotionRow.add(expireValueLabel);
        tableView.insertRowAfter(1, promotionRow);
    }

    function wishListClickHandler (e) {
        if (wishListButton._isCheck) {
            shopProductService.removeWishlist(item.id).done(function (result) {
                wishListButton._isCheck = false;
                wishListButton.backgroundImage = '/images/heart_gray.png';
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: L('remove_wishlist_success')
                });
                toast.show();
            }).fail(function (e) {
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: e.error.toString()
                });
                toast.show();
            });
        } else {
            shopProductService.addWishlist(item.id).done(function (result) {
                wishListButton._isCheck = true;
                wishListButton.backgroundImage = '/images/heart_yellow.png';
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: L('add_wishlist_success')
                });
                toast.show();
            }).fail(function (e) {
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: e.error.toString()
                });
                toast.show();
            });
        }
    }

    return self;
}

module.exports = ProductWindow;