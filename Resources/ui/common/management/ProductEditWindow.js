function ProductEditWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        ShopProductManagementService = require('business/services/ShopProductManagementService'),
        APP_CONST = require('business/constants'),
        controller = _args.controller,
        handler = _args.handler,
        item = _({
            description: ''
        }).extend(_args.data),
        new_data = {
            status: item.status,
            origin: item.origin,
            description: item.description,
            added_photos: [],
            deleted_photos: []
        },
        currentPhotos = [],
        separatorProperties = {
            backgroundColor: '#000',
            height: 1
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('selling_detail')},theme.styles.header.label)),
    scrollView = Ti.UI.createScrollView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 90,
        layout: 'vertical',
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    nameLabel = Ti.UI.createLabel({
        top: 10,
        left: 5,
        right: 5,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    photoWrapView = Ti.UI.createView({
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    photoTitleLabel = Ti.UI.createLabel({
        left: 5,
        top: 5,
        text: L('photo'),
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000'
    }),
    photoView = Ti.UI.createView({
        top: 10,
        left: 5,
        right: 10,
        height: 250
    }),
    photoScrollView = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: 250,
        contentWidth: 'auto',
        scrollType: 'horizontal'
    }),
    addPhotoButton = Ti.UI.createButton({
        borderRadius: 15,
        height: 70,
        width: 300,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        font: {fontSize: 35, fontWeight: 'bold'},
        top: 10,
        bottom: 10,
        title: L('add_photo')
    }),
    sellingDetailView = Ti.UI.createView({
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    conditionField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        editable: false,
        hintText: L('condition')
    }),
    priceField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        hintText: L('price') + ' (VND)'
    }),
    warrantyField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        hintText: L('warranty') + ' (' + L('month') + ')'
    }),
    originField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        editable: false,
        hintText: L('origin')
    }),
    viewEditDescriptionView = Ti.UI.createView({
        backgroundFocusedColor: '#FFA600',
        backgroundSelectedColor: '#FFA600',
        height: 90
    }),
    viewEditDescriptionLabel = Ti.UI.createLabel({
        text: L('view_edit_description'),
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000',
        left: 5,
        touchEnabled: false
    }),
    buttonBar = new CustomButtonBar({
        buttons: [L('reset'),L('done')],
        handler: function (e) {
            if (e.index) {
                activityIndicator.show();
                if (item.id) {
                    service.update(item.id,_({
                        price: priceField.value,
                        warranty: warrantyField.value
                    }).extend(new_data)).done(function (result) {
                        activityIndicator.hide();
                        self.close();
                        if (_(handler).isFunction()) {
                            handler(result);
                        }
                    }).fail(function (e) {
                        alert(e.error);
                        activityIndicator.hide();
                    });
                } else {
                    service.create(_({
                        price: priceField.value,
                        warranty: warrantyField.value,
                        shop_id: item.shop_id,
                        product_id: item.product_id
                    }).extend(new_data)).done(function (result) {
                        activityIndicator.hide();
                        self.close();
                        if (_(handler).isFunction()) {
                            handler(result);
                        }
                    }).fail(function (e) {
                        alert(e.error);
                        activityIndicator.hide();
                    });
                }
            } else {
                reset();
            }
        }
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('processing')
    }),
    service = new ShopProductManagementService({});

    headerView.add(headerLabel);
    photoView.add(photoScrollView);
    photoWrapView.add(photoTitleLabel);
    photoWrapView.add(photoView);
    photoWrapView.add(addPhotoButton);
    sellingDetailView.add(priceField);
    sellingDetailView.add(conditionField);
    sellingDetailView.add(warrantyField);
    sellingDetailView.add(originField);
    viewEditDescriptionView.add(viewEditDescriptionLabel);

    scrollView.add(nameLabel);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(photoWrapView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(sellingDetailView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(viewEditDescriptionView);
    self.add(headerView);
    self.add(scrollView);
    self.add(buttonBar);

    addPhotoButton.addEventListener('click', function (e) {
        var SelectPhotoDialog = require('ui/components/SelectPhotoDialog'),
            dialog = new SelectPhotoDialog({
                handler: uploadPhotoHandler
            });
        dialog.show();
    });

    viewEditDescriptionView.addEventListener('click', function (e) {
        var EditDescriptionWindow = require('ui/common/modal/EditDescriptionWindow'),
            descWin = new EditDescriptionWindow({
                data: new_data,
                handler: function (result) {
                    new_data.description = result.description;
                }
            });
        descWin.open({modal: true});
    });

    conditionField.addEventListener('click', conditionSelectHandler);
    conditionField.addEventListener('focus', conditionSelectHandler);
    originField.addEventListener('click', originSelectHandler);
    originField.addEventListener('focus', originSelectHandler);

    self.addEventListener('open', function (e) {
        controller.register(self);
        reset();
        if (!item.id) {
            // check if product existed in shop
            activityIndicator.show();
            service.checkShopProduct(_(item).pick('shop_id', 'product_id')).done(function (result) {
                if (result.id) {
                    _(item).extend(result);
                    reset();
                }
                activityIndicator.hide();
            }).fail(function (e) {
                alert(e.error);
                activityIndicator.hide();
            });
        }
    });

    function setPhotos (photos) {
        for (var _i = 0, _l = currentPhotos.length; _i < _l; ++_i) {
            photoScrollView.remove(currentPhotos[_i]);
            currentPhotos[_i] = null;
        }
        currentPhotos = [];
        if (photos && photos.length) {
            for (var i = 0, l = photos.length; i < l; ++i) {
                addPhoto({id: photos[i].id, image: photos[i].url});
            }
        }
    }

    function reset () {
        var condition = _(APP_CONST.DATA.CONDITION_ARRAY).find( function(c) {
            return c.code == item.status;
        }), origin = _(APP_CONST.DATA.ORIGIN_ARRAY).find( function(c) {
            return c.code == item.origin;
        });
        nameLabel.text = item.name;
        priceField.value = item.price ? item.price.toString() : '';
        warrantyField.value = item.warranty ? item.warranty.toString() : '';
        conditionField.value = condition ? condition.value : '';
        originField.value = origin ? origin.value : '';
        setPhotos(item.photos);
        new_data = {
            status: item.status,
            origin: item.origin,
            description: item.description,
            added_photos: [],
            deleted_photos: []
        };
    }

    function imageLongPressHandler (e) {
        var confirmDialog = Ti.UI.createAlertDialog({
            buttonNames: [L('cancel'), L('ok')],
            title: L('delete_confirmation'),
            message: L('confirm_delete_photo')
        });
        confirmDialog.addEventListener('click', function (evt) {
            var photo_id = e.source._id;
            if (evt.index === 1 && photo_id) {
                photoScrollView.remove(e.source);
                new_data.deleted_photos.push(photo_id);
                if (new_data.added_photos.indexOf(photo_id) >= 0) {
                    new_data.added_photos.splice(new_data.added_photos.indexOf(photo_id),1);
                }
            }
        });
        confirmDialog.show();
    }

    function uploadPhotoHandler (e) {
        var UploadPhotoWindow = require('ui/common/modal/UploadPhotoWindow'),
            uploadPhotoWindow = new UploadPhotoWindow({
                media: e.media,
                handler: function (result) {
                    addPhoto({id: result.id, image: e.media});
                    new_data.added_photos.push(result.id);
                }
            });

        uploadPhotoWindow.open({modal: true});
    }

    function addPhoto (data) {
        var imageView = Ti.UI.createImageView({
            _id: data.id,
            left: currentPhotos.length * 250 + 10,
            image: data.image,
            height: 250,
            width: 250
        });
        imageView.addEventListener('longpress', imageLongPressHandler);
        photoScrollView.add(imageView);
        currentPhotos.push(imageView);
        new_data.added_photos.push(data.id);
    }

    function conditionSelectHandler (e) {
        var conditionDialog = Ti.UI.createOptionDialog({
            title: L('condition'),
            options: _(APP_CONST.DATA.CONDITION_ARRAY).pluck('value')
        });
        conditionDialog.addEventListener('click', function (e) {
            if (e.index >= 0) {
                var selectedValue = conditionDialog.options[e.index],
                    condition = _(APP_CONST.DATA.CONDITION_ARRAY).find( function(c) {
                        return c.value == selectedValue;
                    });
                conditionField.value = condition.value;
                new_data.status = condition.code;
            }
        });
        conditionDialog.show();
    }

    function originSelectHandler (e) {
        var originDialog = Ti.UI.createOptionDialog({
            title: L('origin'),
            options: _(APP_CONST.DATA.ORIGIN_ARRAY).pluck('value')
        });
        originDialog.addEventListener('click', function (e) {
            if (e.index >= 0) {
                var selectedValue = originDialog.options[e.index],
                    origin = _(APP_CONST.DATA.ORIGIN_ARRAY).find( function(c) {
                        return c.value == selectedValue;
                    });
                originField.value = origin.value;
                new_data.origin = origin.code;
            }
        });
        originDialog.show();
    }

    return self;
}

module.exports = ProductEditWindow;