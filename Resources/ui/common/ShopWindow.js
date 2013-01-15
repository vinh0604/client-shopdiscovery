function ShopWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        APP_CONST = require('business/constants'),
        ShopService = require('business/services/ShopService'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        item = {id: _args.data.id},
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    // item = {
    //     id: 1,
    //     photos: [
    //         {url: '/images/shop.png'},
    //         {url: '/images/shop.png'}],
    //     name: 'Sample Shop Name with some details',
    //     tags: ['điện thoại', 'máy tính bảng', 'thẻ nhớ', 'phụ kiện'],
    //     description: '',
    //     address: '12 Nam Kỳ Khởi Nghĩa, quận 3, Hồ Chí Minh',
    //     website: 'http://www.example.com',
    //     phones: ['01689951370', '090909090'],
    //     location: {latitude: 10, longitude: 108},
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
        right: 161,
        layout: 'vertical'
    }),
    nameLabel = Ti.UI.createLabel({
        left: 0,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    tagLabel = Ti.UI.createLabel({
        left: 0,
        font: {fontSize: 28}
    }),
    seperatorView = Ti.UI.createView({
        width: 1,
        right: 161,
        top: 0,
        bottom: 0,
        backgroundColor: 'gray'
    }),
    favoriteView = Ti.UI.createView({
        right: 0,
        width: 160,
        height: 160
    }),
    favoriteButton = Ti.UI.createButton({
        height: 128,
        width: 128,
        backgroundImage: '/images/favorite_gray.png',
        _isCheck: false
    }),
    infoRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        layout: 'vertical'
    }),
    addressView = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10
    }),
    addressLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('address') + ':'
    }),
    addressValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 28},
        color: '#000'
    }),
    phoneView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 10
    }),
    phoneLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('phone') + ':'
    }),
    phoneValueView = Ti.UI.createView({
        left: 200,
        right: 0,
        layout: 'vertical'
    }),
    websiteView = Ti.UI.createView({
        top: 5,
        left: 10,
        right: 10
    }),
    websiteLabel = Ti.UI.createLabel({
        left: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('website') + ':'
    }),
    websiteValueLabel = Ti.UI.createLabel({
        left: 200,
        right: 0,
        font: {fontSize: 28},
        autoLink: Ti.UI.Android.LINKIFY_WEB_URLS
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
    locationRow = Ti.UI.createTableViewRow({
        height: 75,
        rightImage: '/images/arrow_right.png'
    }),
    locationLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 10,
        color: '#000',
        font: {fontSize: 30, fontWeight: 'bold'},
        text: L('location_map')
    }),
    productListRow = Ti.UI.createTableViewRow({
        height: 75,
        rightImage: '/images/arrow_right.png'
    }),
    productListLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 10,
        color: '#000',
        font: {fontSize: 30, fontWeight: 'bold'},
        text: L('shop_product_list')
    }),
    sendMessageRow = Ti.UI.createTableViewRow({
        height: 110
    }),
    sendMessageButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        title: L('send_message_to_shop'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    }),
    shopService = new ShopService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    photoRow.add(photoView);

    nameView.add(nameLabel);
    nameView.add(tagLabel);
    favoriteView.add(favoriteButton);
    nameRow.add(nameView);
    nameRow.add(seperatorView);
    nameRow.add(favoriteView);

    addressView.add(addressLabel);
    addressView.add(addressValueLabel);
    phoneView.add(phoneLabel);
    phoneView.add(phoneValueView);
    websiteView.add(websiteLabel);
    websiteView.add(websiteValueLabel);
    infoRow.add(addressView);
    infoRow.add(phoneView);
    infoRow.add(websiteView);

    reviewRow.add(reviewLabel);
    reviewRow.add(ratingStarBar);
    descriptionRow.add(descriptionLabel);
    locationRow.add(locationLabel);
    productListRow.add(productListLabel);
    sendMessageRow.add(sendMessageButton);

    tableView.setData([photoRow, nameRow, infoRow, reviewRow, descriptionRow, locationRow, productListRow, sendMessageRow]);

    self.add(tableView);

    reviewRow.addEventListener('click', function (e) {
        var ReviewWindow = require('ui/common/ReviewWindow'),
            reviewWindow = new ReviewWindow({
                controller: controller,
                data: item,
                type: APP_CONST.TYPE.SHOP
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

    locationRow.addEventListener('click', function (e) {
        if (item.location) {
            var LocationWindow = require('ui/common/LocationWindow'),
            locationWindow = new LocationWindow({
                controller: controller,
                data: item
            });
            locationWindow.open();
        } else {
            alert(L('no_location_available'));
        }
    });

    productListRow.addEventListener('click', function (e) {
        var ShopCategoryListWindow = require('ui/common/ShopCategoryListWindow'),
            shopCategoryListWindow = new ShopCategoryListWindow({
                controller: controller,
                data: item
            });
        shopCategoryListWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        shopService.one(item.id).done(function (result) {
            item = result;
            setData();
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
        shopService.checkFavorite(item.id).done(function (result) {
            if (result) {
                favoriteButton._isCheck = true;
                favoriteButton.backgroundImage = '/images/favorite_yellow.png';
            }
            favoriteButton.addEventListener('click', favoriteClickHandler);
        }).fail(function (e) {
            var toast = Ti.UI.createNotification({
                duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                message: e.error.toString()
            });
            toast.show();
            favoriteButton.addEventListener('click', favoriteClickHandler);
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
                image: APP_CONST.DEFAULT.SHOP_PHOTO,
                height: 250,
                width: 250
            });
            photoScrollView.add(image);
        }
        photoView.add(photoScrollView);
    }

    function addPhoneLabels (phones) {
        for (var i = 0, l = phones.length; i < l ; ++i) {
            var label = Ti.UI.createLabel({
                left: 0,
                font: {fontSize: 28},
                autoLink: Ti.UI.Android.LINKIFY_PHONE_NUMBERS,
                text: phones[i]
            });
            phoneValueView.add(label);
        }
    }

    function imageClickHandler (e) {
        var PhotoWindow = require('ui/common/PhotoWindow'),
            photoWindow = new PhotoWindow({photos: item.photos, index: e.source._index});

        photoWindow.open();
    }

    function setData () {
        nameLabel.text = item.name;
        tagLabel.text = item.tags.join(', ');
        addressValueLabel.text = item.address;
        addPhoneLabels(item.phones);
        websiteValueLabel.text = item.website;
        setPhotos(item.photos);
        ratingStarBar.setRating({count: item.rating_count, rating: item.rating});
    }

    function favoriteClickHandler (e) {
        if (favoriteButton._isCheck) {
            shopService.removeFavorite(item.id).done(function (result) {
                favoriteButton._isCheck = false;
                favoriteButton.backgroundImage = '/images/favorite_gray.png';
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: L('remove_favorite_success')
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
            shopService.addFavorite(item.id).done(function (result) {
                favoriteButton._isCheck = true;
                favoriteButton.backgroundImage = '/images/favorite_yellow.png';
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: L('add_favorite_success')
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

module.exports = ShopWindow;