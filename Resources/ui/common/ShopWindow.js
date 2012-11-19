function ShopWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    item = {
        id: 1,
        photos: [
            {thumb: '/images/shop.png', url: '/images/shop.png'},
            {thumb: '/images/shop.png', url: '/images/shop.png'}],
        name: 'Sample Shop Name with some details',
        tags: ['điện thoại', 'máy tính bảng', 'thẻ nhớ', 'phụ kiện'],
        street_address: '12 Nam Kỳ Khởi Nghĩa',
        city: 'Hồ Chí Minh',
        district: 'Quận 3',
        website: 'http://www.example.com',
        phones: ['01689951370', '090909090'],
        location: {latitude: 10, longitude: 108},
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
        right: 161,
        layout: 'vertical'
    }),
    nameLabel = Ti.UI.createLabel({
        left: 0,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        text: item.name
    }),
    tagLabel = Ti.UI.createLabel({
        left: 0,
        font: {fontSize: 28},
        text: item.tags.join(', ')
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
        backgroundImage: '/images/favorite_gray.png'
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
        text: item.street_address + ', ' + item.district + ', ' + item.city,
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
        text: item.website,
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
    });

    setPhotos(item.photos);
    addPhoneLabels(item.phones);

    photoView.add(photoScrollView);
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
            photoWindow = new PhotoWindow({photos: item.photos, index: e.source._index, controller: controller});

        photoWindow.open();
    }

    return self;
}

module.exports = ShopWindow;