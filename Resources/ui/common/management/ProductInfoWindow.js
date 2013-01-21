function ProductInfoWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        accounting = require('lib/accounting'),
        ShopProductManagementService = require('business/services/ShopProductManagementService'),
        APP_CONST = require('business/constants'),
        controller = _args.controller,
        item = _args.data,
        separatorProperties = {
            backgroundColor: '#000',
            height: 1
        },
        buttonProperties = {
            borderRadius: 15,
            height: 70,
            left: 80,
            right: 80,
            backgroundColor: '#4086FF',
            backgroundFocusedColor: '#87B3FF',
            backgroundSelectedColor: '#87B3FF',
            color: '#fff',
            font: {fontSize: 35, fontWeight: 'bold'},
            top: 10,
            bottom: 10
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var scrollView = Ti.UI.createScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        layout: 'vertical',
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    photoView = Ti.UI.createView({
        top: 10,
        left: 0,
        right: 0,
        height: 250
    }),
    photoScrollView = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: 250,
        contentWidth: 'auto',
        scrollType: 'horizontal'
    }),
    nameView = Ti.UI.createView({
        top: 10,
        left: 0,
        right: 0,
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    nameLabel = Ti.UI.createLabel({
        left: 5,
        right: 5,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    eanLabel = Ti.UI.createLabel({
        left: 5,
        right: 5,
        top: 5,
        font: {fontSize: 30},
        color: '#000'
    }),
    viewSpecificsView = Ti.UI.createView({
        backgroundFocusedColor: '#FFA600',
        backgroundSelectedColor: '#FFA600',
        height: 90
    }),
    viewSpecificsLabel = Ti.UI.createLabel({
        text: L('specific'),
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000',
        left: 5,
        touchEnabled: false
    }),
    sellingDetailView = Ti.UI.createView({
        top: 10,
        left: 0,
        right: 0,
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    sellingDetailLabel = Ti.UI.createLabel({
        left: 5,
        text: L('selling_detail'),
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    priceView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 5,
        height: Ti.UI.SIZE
    }),
    priceLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('price') + ':'
    }),
    priceValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 28},
        color: 'red'
    }),
    conditionView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 5,
        height: Ti.UI.SIZE
    }),
    conditionLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('condition') + ':'
    }),
    conditionValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 28},
        color: '#000'
    }),
    warrantyView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 5,
        height: Ti.UI.SIZE
    }),
    warrantyLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('warranty') + ':'
    }),
    warrantyValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 28},
        color: '#000'
    }),
    originView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 5,
        height: Ti.UI.SIZE
    }),
    originLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('origin') + ':'
    }),
    originValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 28},
        color: '#000'
    }),
    updateSellingDetailButton = Ti.UI.createButton(
        _({title: L('update_selling_details')}).defaults(buttonProperties)
    ),
    promotionView = Ti.UI.createView({
        top: 10,
        left: 0,
        right: 0,
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    promotionLabel = Ti.UI.createLabel({
        left: 5,
        text: L('promotion'),
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    promotionDetailView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 10,
        height: 0,
        bottom: 5
    }),
    promotionStatusLabel = Ti.UI.createLabel({
        text: L('status'),
        font: {fontSize: 28},
        top: 5,
        left: 0
    }),
    promotionStatusValueLabel = Ti.UI.createLabel({
        left: 200,
        font: {fontSize: 28},
        top: 5
    }),
    promotionPriceLabel = Ti.UI.createLabel({
        text: L('deal_price_text'),
        font: {fontSize: 28},
        top: 45,
        left: 0
    }),
    promotionPriceValueLabel = Ti.UI.createLabel({
        left: 200,
        font: {fontSize: 28},
        color: 'red',
        top: 45
    }),
    promotionAmountLabel = Ti.UI.createLabel({
        text: L('amount'),
        font: {fontSize: 28},
        top: 85,
        left: 0
    }),
    promotionAmountValueLabel = Ti.UI.createLabel({
        left: 200,
        font: {fontSize: 28},
        color: '#000',
        top: 85
    }),
    promotionExpireLabel = Ti.UI.createLabel({
        text: L('expired_date'),
        font: {fontSize: 28},
        top: 125,
        left: 0
    }),
    promotionExpireValueLabel = Ti.UI.createLabel({
        left: 200,
        font: {fontSize: 28},
        color: '#000',
        top: 125
    }),
    updatePromotionButton = Ti.UI.createButton(
        _({title: L('update_promotion')}).defaults(buttonProperties)
    ),
    checkOfferView = Ti.UI.createView({
        left: 0,
        right: 0,
        backgroundFocusedColor: '#FFA600',
        backgroundSelectedColor: '#FFA600',
        height: 90
    }),
    checkOfferLabel = Ti.UI.createLabel({
        left: 5,
        text: L('check_offer'),
        font: {fontSize: 30},
        touchEnabled: false,
        color: '#000'
    }),
    service = new ShopProductManagementService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    conditionView.add(conditionLabel);
    conditionView.add(conditionValueLabel);
    priceView.add(priceLabel);
    priceView.add(priceValueLabel);
    warrantyView.add(warrantyLabel);
    warrantyView.add(warrantyValueLabel);
    originView.add(originLabel);
    originView.add(originValueLabel);
    promotionDetailView.add(promotionStatusLabel);
    promotionDetailView.add(promotionStatusValueLabel);
    promotionDetailView.add(promotionPriceLabel);
    promotionDetailView.add(promotionPriceValueLabel);
    promotionDetailView.add(promotionAmountLabel);
    promotionDetailView.add(promotionAmountValueLabel);
    promotionDetailView.add(promotionExpireLabel);
    promotionDetailView.add(promotionExpireValueLabel);

    photoView.add(photoScrollView);
    nameView.add(nameLabel);
    nameView.add(eanLabel);
    sellingDetailView.add(sellingDetailLabel);
    sellingDetailView.add(conditionView);
    sellingDetailView.add(priceView);
    sellingDetailView.add(warrantyView);
    sellingDetailView.add(originView);
    sellingDetailView.add(updateSellingDetailButton);
    promotionView.add(promotionLabel);
    promotionView.add(promotionDetailView);
    promotionView.add(updatePromotionButton);
    checkOfferView.add(checkOfferLabel);

    scrollView.add(photoView);
    scrollView.add(nameView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(sellingDetailView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(promotionView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(checkOfferView);
    scrollView.add(Ti.UI.createView(separatorProperties));

    self.add(scrollView);

    updateSellingDetailButton.addEventListener('click', function (e) {
        var ProductEditWindow = require('ui/common/management/ProductEditWindow'),
            productEditWindow = new ProductEditWindow({
                controller: controller,
                data: _(item).pick('id', 'name', 'price', 'origin', 'warranty', 'status', 'photos'),
                handler: function (result) {
                    reloadData();
                }
            });
        productEditWindow.open();
    });

    updatePromotionButton.addEventListener('click', function (e) {
        var PromotionFormWindow = require('ui/common/modal/PromotionFormWindow'),
            promotionFormWindow = new PromotionFormWindow({
                data: item.promotion,
                shop_product_id: item.id,
                handler: reloadData
            });

        promotionFormWindow.open({modal: true});
    });

    checkOfferView.addEventListener('click', function (e) {
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
        reloadData();
    });

    self.addEventListener('close', function (e) {
        Ti.App.fireEvent('product_management:reload',e);
    });

    function setPhotos (photos) {
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
    }

    function setData () {
        nameLabel.text = item.name;
        eanLabel.text = 'EAN: ' + (item.barcode ? item.barcode : L('NA'));
        priceValueLabel.text = item.price ? accounting.formatMoney(item.price, {symbol: item.price_unit}) : L('NA');
        warrantyValueLabel.text = item.warranty ? (item.warranty + ' ' + L('month')) : L('NA');
        var condition = _(APP_CONST.DATA.CONDITION_ARRAY).find( function(c) {
            return c.code == item.status;
        });
        conditionValueLabel.text = condition ? condition.value : '';

        var origin = _(APP_CONST.DATA.ORIGIN_ARRAY).find( function(c) {
            return c.code == item.origin;
        });
        originValueLabel.text = origin ? origin.value : '';

        setPhotos(item.photos);

        if (item.promotion) {
            var promotion = item.promotion;
            promotionDetailView.height = 170;
            if (promotion.active) {
                promotionStatusValueLabel.color = 'green';
                promotionStatusValueLabel.text = L('active');
            } else {
                promotionStatusValueLabel.color = 'red';
                promotionStatusValueLabel.text = L('inactive');
            }
            promotionPriceValueLabel.text = promotion.price ? accounting.formatMoney(promotion.price, {symbol: item.price_unit}) : L('NA');
            promotionAmountValueLabel.text = promotion.amount ? promotion.amount : L('NA');
            promotionExpireValueLabel.text = moment(promotion.expires).format('MM-DD-YYYY HH:mm');
        } else {
            promotionDetailView.height = 0;
        }
    }

    function imageClickHandler (e) {
        var PhotoWindow = require('ui/common/PhotoWindow'),
            photoWindow = new PhotoWindow({photos: item.photos, index: e.source._index});

        photoWindow.open();
    }

    function reloadData () {
        activityIndicator.show();
        service.one(item.id).done(function (result) {
            item = result;
            setData();
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = ProductInfoWindow;