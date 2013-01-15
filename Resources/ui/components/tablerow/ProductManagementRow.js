var _ = require('lib/underscore'),
    theme = require('helpers/theme');

function ProductManagementRow(_args) {
    var item = _args.data,
        deleteHandler = _args.deleteHandler,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            title: item.name,
            height: 200,
            className: 'productMngtDetail'
        });

    var photoView = Ti.UI.createImageView({
        left: 0,
        touchEnabled: false,
        image: item.photo,
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
    nameLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: item.name,
        font: {fontWeight: 'bold', fontSize: 20},
        color: '#000'
    }),
    categoryLabel = Ti.UI.createLabel({
        touchEnabled: false,
        left: 0,
        text: String.format(L('category'),item.category ? item.category : ''),
        font: {fontSize: 20},
        color: '#000'
    }),
    deleteView = Ti.UI.createView({
        right: 10,
        width: 80,
        height: 80,
        backgroundImage: '/images/trash_blue.png',
        backgroundFocusedImage: '/images/trash_red.png',
        backgroundSelectedImage: '/images/trash_red.png'
    });

    detailView.add(nameLabel);
    detailView.add(categoryLabel);

    self.add(photoView);
    self.add(detailView);
    self.add(deleteView);

    deleteView.addEventListener('click', function (e) {
        e.item_id = item.id;
        deleteHandler(e);
    });

    return self;
}

module.exports = ProductManagementRow;