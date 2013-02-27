var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    moment = require('lib/moment');

function OrderRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 180,
            className: 'orderDetail',
            layout: 'vertical'
        });

    var productLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 10,
        color: '#000',
        font: {fontSize: 28, fontWeight: 'bold'},
        left: 10,
        right: 10,
        text: item.shop_product.name
    }),
    amountLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        left: 10,
        right: 10,
        text: L('amount') + ': ' + item.amount
    }),
    userLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        left: 10,
        right: 10,
        text: L('ordered_by') + ': ' + item.user.full_name + ' (' + item.user.username+ ')'
    }),
    dateLabel = Ti.UI.createLabel({
        touchEnabled: false,
        color: '#000',
        left: 10,
        right: 10,
        bottom: 10,
        text: L('ordered_at') + ': ' + moment(item.created_at).format("HH:mm MM/DD/YYYY")
    });

    self.add(productLabel);
    self.add(amountLabel);
    self.add(userLabel);
    self.add(dateLabel);

    return self;
}

module.exports = OrderRow;