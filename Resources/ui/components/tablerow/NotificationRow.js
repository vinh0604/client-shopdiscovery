var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    APP_CONST = require('business/constants');

function NotificationRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            height: Ti.UI.SIZE,
            className: 'notificationDetail'
        });

    var contentView = Ti.UI.createView({
        touchEnabled: false,
        top: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: 'horizontal'
    }),
    typeLabel = Ti.UI.createLabel({
        touchEnabled: false,
        text: '- ' + APP_CONST.DATA.NOTIFY_TYPE[item.type] + ' - ',
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000'
    }),
    contentLabel = Ti.UI.createLabel({
        touchEnabled: false,
        text: item.content,
        font: {fontSize: 28},
        color: '#000'
    });

    contentView.add(typeLabel);
    contentView.add(contentLabel);

    self.add(contentView);

    return self;
}

module.exports = NotificationRow;