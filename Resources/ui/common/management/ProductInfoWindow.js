function ProductInfoWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
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
            top: 10
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
        right: 5
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
        color: '#000'
    }),
    conditionView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 5
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
        right: 5
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
        right: 5
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
        left: 0,
        right: 0,
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    updatePromotionButton = Ti.UI.createButton(
        _({title: L('update_promotion')}).defaults(buttonProperties)
    ),
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

    scrollView.add(photoView);
    scrollView.add(nameView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(sellingDetailView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(promotionView);
    scrollView.add(Ti.UI.createView(separatorProperties));

    self.add(scrollView);

    updateSellingDetailButton.addEventListener('click', function (e) {
        
    });

    updatePromotionButton.addEventListener('click', function (e) {
        
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        reloadData();
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