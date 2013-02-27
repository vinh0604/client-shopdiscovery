function ShopInfoWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ShopManagementService = require('business/services/ShopManagementService'),
        APP_CONST = require('business/constants'),
        controller = _args.controller,
        item = _args.data,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView({
        layout: 'vertical',
        height: Ti.UI.SIZE,
        left: 0,
        right: 0
    }),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 90,
        headerView: headerView
    }),
    nameLabel = Ti.UI.createLabel({
        left: 5,
        right: 5,
        top: 5,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
    }),
    photoWrapView = Ti.UI.createView({
        height: 260,
        left: 0,
        right: 0,
        top: 5
    }),
    photoView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }),
    photoScrollView = null,
    addressView = Ti.UI.createView({
        top: 10,
        left: 5,
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
        left: 5,
        right: 10
    }),
    phoneLabel = Ti.UI.createLabel({
        left: 0,
        top: 0,
        width: 200,
        font: {fontSize: 28},
        text: L('phone') + ':'
    }),
    phoneValueView = null,
    websiteView = Ti.UI.createView({
        top: 5,
        left: 5,
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
    managersRow = Ti.UI.createTableViewRow({
        height: 75,
        font: {fontSize: 30},
        color: '#000',
        title: L('managers'),
        rightImage: '/images/arrow_right.png'
    }),
    orderManagementRow = Ti.UI.createTableViewRow({
        height: 75,
        font: {fontSize: 30},
        color: '#000',
        title: L('order_management'),
        rightImage: '/images/arrow_right.png'
    }),
    productManagementRow = Ti.UI.createTableViewRow({
        height: 75,
        font: {fontSize: 30},
        color: '#000',
        title: L('product_management'),
        rightImage: '/images/arrow_right.png'
    }),
    editButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        title: L('edit'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    }),
    service = new ShopManagementService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    photoWrapView.add(photoView);
    headerView.add(photoWrapView);
    headerView.add(nameLabel);
    addressView.add(addressLabel);
    addressView.add(addressValueLabel);
    phoneView.add(phoneLabel);
    websiteView.add(websiteLabel);
    websiteView.add(websiteValueLabel);
    headerView.add(addressView);
    headerView.add(phoneView);
    headerView.add(websiteView);

    tableView.setData([managersRow, orderManagementRow, productManagementRow]);

    self.add(tableView);
    self.add(editButton);

    managersRow.addEventListener('click', function (e) {
        var ManagersWindow = require('ui/common/ManagersWindow'),
            managersWindow = new ManagersWindow({
                controller: controller,
                data: item
            });
        managersWindow.open();
    });

    orderManagementRow.addEventListener('click', function (e) {
        var OrderManagementWindow = require('ui/common/management/OrderManagementWindow'),
            orderMngtWindow = new OrderManagementWindow({
                controller: controller,
                data: item
            });
        orderMngtWindow.open();
    });

    productManagementRow.addEventListener('click', function (e) {
        var ProductManagementWindow = require('ui/common/management/ProductManagementWindow'),
            productMngtWindow = new ProductManagementWindow({
                controller: controller,
                data: {id: item.id}
            });
        productMngtWindow.open();
    });

    editButton.addEventListener('click', function (e) {
        var ShopEditWindow = require('ui/common/management/ShopEditWindow'),
            shopEditWindow = new ShopEditWindow({
                controller: controller,
                data: item,
                handler: reloadData
            });
        shopEditWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        reloadData();
    });

    function setPhotos (photos) {
        if (photoScrollView) {
            photoView.remove(photoScrollView);
        }
        photoScrollView = Ti.UI.createScrollView({
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
        if (phoneValueView) {
            phoneView.remove(phoneValueView);
        }
        phoneValueView = Ti.UI.createView({
            left: 200,
            right: 0,
            layout: 'vertical'
        });
        for (var i = 0, l = phones.length; i < l ; ++i) {
            var label = Ti.UI.createLabel({
                left: 0,
                font: {fontSize: 28},
                autoLink: Ti.UI.Android.LINKIFY_PHONE_NUMBERS,
                text: phones[i]
            });
            phoneValueView.add(label);
        }
        phoneView.add(phoneValueView);
    }

    function setData () {
        nameLabel.text = item.name;
        addressValueLabel.text = item.address;
        addPhoneLabels(item.phones);
        websiteValueLabel.text = item.website;
        setPhotos(item.photos);
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

module.exports = ShopInfoWindow;