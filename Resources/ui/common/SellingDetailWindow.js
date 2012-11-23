function SellingDetailWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        SelectPhotoDialog = require('ui/components/SelectPhotoDialog'),
        PromotionFormWindow = require('ui/common/modal/PromotionFormWindow'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    item = {
        id: 1,
        name: 'Sample product with some details',
        photos: []
    };

    var titleViewProperties = {
            height: Ti.UI.SIZE,
            backgroundColor: '#BABABA'
        },
        titleLabelProperties = {
            font: {fontWeight: 'bold', fontSize: 28},
            color: '#000',
            left: 10,
            top: 5,
            bottom: 5
        },
        fieldLabelProperties = {
            color: '#000',
            font: {fontSize: 30, fontWeight: 'bold'},
            left: 10
        },
        fieldProperties = {
            left: 260,
            right: 10
        },
        containerViewProperties = {
            height: Ti.UI.SIZE,
            left: 0,
            right: 0
        };

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('selling_detail')},theme.styles.header.label)),
    containerScrollView = Ti.UI.createScrollView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90,
        contentWidth: 'auto',
        contentHeight: 'auto',
        layout: 'vertical',
        scrollType: 'vertical'
    }),
    nameView = Ti.UI.createView(containerViewProperties),
    // workaround to fix auto-focus behavior in Android
    preventFocusField = Ti.UI.createTextField({
        backgroundColor: 'transparent',
        editable: false
    }),
    nameLabel = Ti.UI.createLabel({
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000',
        text: item.name
    }),
    photoTitleView = Ti.UI.createView(titleViewProperties),
    photoTitleLabel = Ti.UI.createLabel(_.extend({text: L('photo')}, titleLabelProperties)),
    photoView = Ti.UI.createView(containerViewProperties),
    photoScrollView = Ti.UI.createScrollView({
        top: 0,
        width: Ti.UI.FILL,
        height: 250,
        contentWidth: 'auto',
        contentHeight: 'auto',
        scrollType: 'horizontal'
    }),
    photoAddButton = Ti.UI.createButton({
        top: 270,
        height: 80,
        bottom: 20,
        width: 450,
        title: L('add_photo')
    }),
    descriptionTitleView = Ti.UI.createView(titleViewProperties),
    descriptionTitleLabel = Ti.UI.createLabel(_.extend({text: L('description')}, titleLabelProperties)),
    descriptionView = Ti.UI.createView(_.extend({backgroundSelectedColor: '#FFA600', backgroundFocusedColor: '#FFA600'}, containerViewProperties)),
    editDescriptionLabel = Ti.UI.createLabel({
        left: 10,
        top: 20,
        bottom: 20,
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000',
        text: L('edit_description')
    }),
    descriptionImageView = Ti.UI.createImageView({
        image: '/images/arrow_right.png',
        height: 36,
        width: 36,
        right: 10
    }),
    sellingTitleView = Ti.UI.createView(titleViewProperties),
    sellingTitleLabel = Ti.UI.createLabel(_.extend({text: L('selling_detail')}, titleLabelProperties)),
    sellingView = Ti.UI.createView(containerViewProperties),
    conditionLabel =  Ti.UI.createLabel(_.extend({text: L('condition'), top: 35}, fieldLabelProperties)),
    conditionField = Ti.UI.createTextField(_.extend({
        top: 10, hintText: L('condition'), editable: false, focusable: false
    }, fieldProperties)),
    priceLabel = Ti.UI.createLabel(_.extend({text: L('price'), top: 135}, fieldLabelProperties)),
    priceField = Ti.UI.createTextField({
        top: 110,
        hintText: L('price'),
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        left: 260,
        right: 150
    }),
    priceUnitLabel = Ti.UI.createLabel({
        right: 10,
        top: 135,
        width: 140,
        color: '#000',
        font: {fontSize: 30},
        text: 'VND'
    }),
    warrantyLabel = Ti.UI.createLabel(_.extend({text: L('warranty'), top: 235}, fieldLabelProperties)),
    warrantyField = Ti.UI.createTextField({
        top: 210,
        hintText: L('warranty'),
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        left: 260,
        right: 150
    }),
    warrantyUnitLabel = Ti.UI.createLabel({
        right: 10,
        top: 235,
        width: 140,
        color: '#000',
        font: {fontSize: 30},
        text: L('month')
    }),
    originLabel = Ti.UI.createLabel(_.extend({text: L('origin'), top: 335}, fieldLabelProperties)),
    originField = Ti.UI.createTextField(_.extend({
        top: 310, hintText: L('origin'), editable: false, focusable: false
    }, fieldProperties)),
    promotionTitleView = Ti.UI.createView(titleViewProperties),
    promotionTitleLabel = Ti.UI.createLabel(_.extend({text: L('promotion')}, titleLabelProperties)),
    promotionView = Ti.UI.createView(containerViewProperties),
    promotionChangeButton = Ti.UI.createButton({
        top: 20,
        height: 80,
        bottom: 20,
        width: 450,
        title: L('new_promotion')
    }),
    bottomBar = new CustomButtonBar({
        buttons: [L('back'),L('done')],
        handler: cancelDoneHandler
    });

    headerView.add(headerLabel);

    nameView.add(preventFocusField);
    nameView.add(nameLabel);
    photoTitleView.add(photoTitleLabel);
    photoView.add(photoScrollView);
    photoView.add(photoAddButton);
    descriptionTitleView.add(descriptionTitleLabel);
    descriptionView.add(editDescriptionLabel);
    descriptionView.add(descriptionImageView);
    sellingTitleView.add(sellingTitleLabel);
    sellingView.add(conditionLabel);
    sellingView.add(conditionField);
    sellingView.add(priceLabel);
    sellingView.add(priceField);
    sellingView.add(priceUnitLabel);
    sellingView.add(warrantyLabel);
    sellingView.add(warrantyField);
    sellingView.add(warrantyUnitLabel);
    sellingView.add(originLabel);
    sellingView.add(originField);
    promotionTitleView.add(promotionTitleLabel);
    promotionView.add(promotionChangeButton);

    containerScrollView.add(nameView);
    containerScrollView.add(photoTitleView);
    containerScrollView.add(photoView);
    containerScrollView.add(descriptionTitleView);
    containerScrollView.add(descriptionView);
    containerScrollView.add(sellingTitleView);
    containerScrollView.add(sellingView);
    containerScrollView.add(promotionTitleView);
    containerScrollView.add(promotionView);

    self.add(headerView);
    self.add(containerScrollView);
    self.add(bottomBar);

    var selectPhotoDialog = new SelectPhotoDialog({
        handler: function (e) {
            var imageView = Ti.UI.createImageView({
                _index: item.photos.length,
                left: 260 * item.photos.length,
                height: 250,
                width: 250,
                image: e.media
            });
            photoScrollView.add(imageView);
            item.photos.push(e.image);
        }
    });

    photoAddButton.addEventListener('click', function (e) {
        selectPhotoDialog.show();
    });

    conditionField.addEventListener('click', function (e) {
        var dialog = Ti.UI.createOptionDialog({
            title: L('condition'),
            options: [L('not_specified'),L('new_label'), L('used')]
        });

        dialog.addEventListener('click', function (e) {
            if (e.index >= 0) {
                conditionField.value = dialog.options[e.index];
                item.condition = e.index;
            }
        });

        dialog.show();
    });

    originField.addEventListener('click', function (e) {
        var dialog = Ti.UI.createOptionDialog({
            title: L('condition'),
            options: [L('not_specified'),L('genuine'), L('imported')]
        });

        dialog.addEventListener('click', function (e) {
            if (e.index >= 0) {
                originField.value = dialog.options[e.index];
                item.origin = e.index;
            }
        });

        dialog.show();
    });

    promotionChangeButton.addEventListener('click', function (e) {
        var promotionFormWindow = new PromotionFormWindow({});

        promotionFormWindow.open({modal: true});
    });

    self.addEventListener('open', function (e) {
        if (controller) {
            controller.register(self);
        }
    });

    function cancelDoneHandler (e) {
        if (e.index) {

        } else {
            self.close();
        }
    }

    return self;
}

module.exports = SellingDetailWindow;