var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    APP_CONST = require('business/constants');

function ShopRow (_args) {
    var item = _args.data,
        deleteHandler = _args.deleteHandler,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 200,
            className: 'shopDetail'
        });

    var photoView = Ti.UI.createImageView({
        left: 0,
        touchEnabled: false,
        image: item.photo ? item.photo : APP_CONST.DEFAULT.SHOP_PHOTO,
        height: 200,
        width: 200
    }),
    detailView = Ti.UI.createView({
        touchEnabled: false,
        right: 90,
        top: 0,
        left: 210,
        layout: 'vertical'
    }),
    deleteView = Ti.UI.createView({
        right: 10,
        width: 80,
        height: 80,
        backgroundImage: item.is_owner ? '/images/trash_blue.png' : '/images/trash_gray.png',
        backgroundFocusedImage: item.is_owner ? '/images/trash_red.png' : '/images/trash_gray.png',
        backgroundSelectedImage: item.is_owner ? '/images/trash_red.png' : '/images/trash_gray.png'
    }),
    nameLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.name,
        font: {fontWeight: 'bold', fontSize: 20},
        color: '#000'
    }),
    addressLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.address,
        font: {fontSize: 20},
        color: '#000'
    }),
    tagsLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.tags.join(', '),
        font: {fontSize: 20},
        color: '#666'
    });

    detailView.add(nameLabel);
    detailView.add(addressLabel);
    detailView.add(tagsLabel);

    self.add(photoView);
    self.add(detailView);
    self.add(deleteView);

    deleteView.addEventListener('click', function (e) {
        if (item.is_owner) {
            e.item_id = item.id;
            deleteHandler(e);
        }
    });

    return self;
}

module.exports = ShopRow;