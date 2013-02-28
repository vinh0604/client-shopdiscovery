var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    accounting = require('lib/accounting'),
    APP_CONST = require('business/constants');

function NotificationRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            _source_type: item.source_type,
            _source_id: item.source_id,
            height: Ti.UI.SIZE,
            className: 'notificationDetail',
            backgroundColor: item.unread ? '#504086FF' : '#fff'
        });

    var content = '',
        type = null;
    (function () {
        type = _(APP_CONST.DATA.NOTIFICATION_ARRAY).find(function (n) {
            return n.code == item.type;
        });
        var contents = [];
        switch (item.type) {
            case APP_CONST.DATA.NOTIFICATION_TYPE.PROMOTION:
                contents.push(L('promotion_notification'));
                break;
            case APP_CONST.DATA.NOTIFICATION_TYPE.NEW_PRODUCT:
                contents.push(L('new_product_notification'));
                break;
            case APP_CONST.DATA.NOTIFICATION_TYPE.PRICE_CHANGE:
                contents.push(L('price_change_notification'));
                break;
            case APP_CONST.DATA.NOTIFICATION_TYPE.ORDER_CANCEL:
                contents.push(L('order_cancel_notification'));
                break;
            case APP_CONST.DATA.NOTIFICATION_TYPE.ORDER_CONFIRM:
                contents.push(L('order_confirm_notification'));
                break;
        }
        item.full_content.forEach(function (c) {
            if (c.type == 'Money') {
                contents.push('<b>' + accounting.formatMoney(c.value, {symbol: 'VND', format:"%v %s"}) + '</b>');
            } else {
                contents.push('<b>' + c.value + '</b>');
            }
        });
        content = String.format.apply(String, contents);
    })();

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
        text: (type && type.value) ? ('- ' + type.value + ' - ') : '',
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000'
    }),
    contentLabel = Ti.UI.createLabel({
        touchEnabled: false,
        html: content,
        font: {fontSize: 28},
        color: '#000'
    });

    contentView.add(typeLabel);
    contentView.add(contentLabel);

    self.add(contentView);

    return self;
}

module.exports = NotificationRow;