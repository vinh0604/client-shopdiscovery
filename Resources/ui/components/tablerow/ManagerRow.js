var _ = require('lib/underscore');

function ManagerRow (_args) {
    var item = _args.data,
        deleteHandler = _args.deleteHandler,
        deleteEnabled = (!item.owner && _args.owner),
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 120,
            className: 'managerInfo'
        });

    var imageView = Ti.UI.createImageView({
        left: 0,
        height: 120,
        touchEnabled: false,
        image: item.user.avatar,
        width: 120
    }),
    nameLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        left: 130,
        right: 90,
        font: {fontWeight: 'bold', fontSize: 28},
        text: item.user.full_name
    }),
    deleteView = Ti.UI.createView({
        right: 10,
        width: 80,
        height: 80,
        backgroundImage: deleteEnabled ? '/images/trash_blue.png' : '/images/trash_gray.png',
        backgroundFocusedImage: deleteEnabled ? '/images/trash_red.png' : '/images/trash_gray.png',
        backgroundSelectedImage: deleteEnabled ? '/images/trash_red.png' : '/images/trash_gray.png'
    });

    self.add(imageView);
    self.add(nameLabel);
    self.add(deleteView);

    deleteView.addEventListener('click', function (e) {
        if (deleteEnabled) {
            e.item_id = item.id;
            deleteHandler(e);
        }
    });

    return self;
}

module.exports = ManagerRow;