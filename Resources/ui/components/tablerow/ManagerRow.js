var _ = require('lib/underscore');

function ManagerRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 80,
            className: 'managerInfo'
        });

    var imageView = Ti.UI.createImageView({
        left: 0,
        height: 80,
        touchEnabled: false,
        image: item.photo,
        width: 80
    }),
    nameLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        left: 90,
        right: 90,
        font: {fontWeight: 'bold', fontSize: 28},
        text: item.full_name
    }),
    deleteView = Ti.UI.createView({
        right: 10,
        width: 80,
        height: 80,
        backgroundImage: '/images/trash_blue.png',
        backgroundFocusedImage: '/images/trash_red.png',
        backgroundSelectedImage: '/images/trash_red.png'
    });

    self.add(imageView);
    self.add(nameLabel);
    self.add(deleteView);

    deleteView.addEventListener('click', function (e) {
        e.item_id = item.id;
        deleteHandler(e);
    });

    return self;
}

module.exports = ManagerRow;