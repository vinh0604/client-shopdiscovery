function ShopEditWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        ShopManagementService = require('business/services/ShopManagementService'),
        controller = _args.controller,
        handler = _args.handler,
        item = _({
            name: '',
            street_address: '',
            district: '',
            city: '',
            website: '',
            description: ''
        }).extend(_args.data),
        new_data = {
            location: item.location,
            description: item.description,
            added_photo: [],
            deleted_photo: []
        },
        currentPhotos = [],
        separatorProperties = {
            backgroundColor: '#000',
            height: 1
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: item.id ? L('edit_shop') : L('new_shop')},theme.styles.header.label)),
    scrollView = Ti.UI.createScrollView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 90,
        layout: 'vertical',
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    nameField = Ti.UI.createTextField({
        top: 10,
        left: 10,
        right: 10,
        hintText: L('shop_name')
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
    basicInfoView = Ti.UI.createView({
        layout: 'vertical',
        height: Ti.UI.SIZE
    }),
    basicInfoTitleLabel = Ti.UI.createLabel({
        left: 5,
        top: 5,
        text: L('basic_info'),
        font: {fontSize: 30, fontWeight: 'bold'},
        color: '#000'
    }),
    streetAddressField = Ti.UI.createTextArea({
        left: 10,
        right: 10,
        top: 10,
        height: 150,
        hintText: L('street_address')
    }),
    districtField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        hintText: L('district')
    }),
    cityField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        hintText: L('city')
    }),
    websiteField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        keyboardType: Ti.UI.KEYBOARD_URL,
        hintText: L('website')
    }),
    phoneField = Ti.UI.createTextArea({
        left: 10,
        right: 10,
        top: 10,
        height: 150,
        bottom: 5,
        hintText: L('phone')
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
    editLocationView = Ti.UI.createView({
        backgroundFocusedColor: '#FFA600',
        backgroundSelectedColor: '#FFA600',
        height: 90
    }),
    editLocationLabel = Ti.UI.createLabel({
        text: L('edit_location'),
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
                var params = {
                    name: nameField.value,
                    street_address: streetAddressField.value,
                    district: districtField.value,
                    city: cityField.value,
                    website: websiteField.value,
                    phones: JSON.stringify(phoneField.value.split('\n')),
                    description: new_data.description,
                    location: new_data.location,
                    added_photos: JSON.stringify(new_data.added_photo),
                    deleted_photos: JSON.stringify(new_data.deleted_photo)
                };
                var deferred;
                if (item.id) {
                    deferred = service.update(item.id, params);
                } else {
                    deferred = service.create(params);
                }
                deferred.done(function (e) {
                    activityIndicator.hide();
                    self.close();
                    if (_(handler).isFunction()) {
                        handler();
                    }
                }).fail(function (e) {
                    alert(e.error);
                    activityIndicator.hide();
                });
            } else {
                reset();
            }
        }
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('processing')
    }),
    service = new ShopManagementService({});

    headerView.add(headerLabel);
    photoView.add(photoScrollView);
    photoWrapView.add(photoTitleLabel);
    photoWrapView.add(photoView);
    photoWrapView.add(addPhotoButton);
    basicInfoView.add(basicInfoTitleLabel);
    basicInfoView.add(streetAddressField);
    basicInfoView.add(districtField);
    basicInfoView.add(cityField);
    basicInfoView.add(websiteField);
    basicInfoView.add(phoneField);
    viewEditDescriptionView.add(viewEditDescriptionLabel);
    editLocationView.add(editLocationLabel);

    scrollView.add(nameField);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(photoWrapView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(basicInfoView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(viewEditDescriptionView);
    scrollView.add(Ti.UI.createView(separatorProperties));
    scrollView.add(editLocationView);
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

    editLocationView.addEventListener('click', function (e) {
        var EditLocationWindow = require('ui/common/modal/EditLocationWindow'),
            locationWindow = new EditLocationWindow({
                data: {location: new_data.location, address: getFullAddress()},
                handler: function (result) {
                    new_data.location = result.location;
                }
            });
        locationWindow.open({modal: true});
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        reset();
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
        nameField.value = item.name;
        streetAddressField.value = item.street_address;
        districtField.value = item.district;
        cityField.value = item.city;
        phoneField.value = _(item.phones).isArray() ? item.phones.join('\n') : '';
        websiteField.value = item.website;
        setPhotos(item.photos);
        new_data = {
            location: item.location,
            description: item.description,
            added_photo: [],
            deleted_photo: []
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
                new_data.deleted_photo.push(photo_id);
                if (new_data.added_photo.indexOf(photo_id) >= 0) {
                    new_data.added_photo.splice(new_data.added_photo.indexOf(photo_id),1);
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
                    new_data.added_photo.push(result.id);
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
        new_data.added_photo.push(data.id);
    }

    function getFullAddress () {
        var arr = [streetAddressField.value,
                   districtField.value,
                   cityField.value];
        return _(arr).compact().join(', ');
    }

    return self;
}

module.exports = ShopEditWindow;