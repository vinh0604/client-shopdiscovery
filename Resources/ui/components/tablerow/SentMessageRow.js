var _ = require('lib/underscore'),
    theme = require('helpers/theme'),
    moment = require('lib/moment');

function SentMessageRow (_args) {
    var item = _args.data,
        self = Ti.UI.createTableViewRow({
            _id: item.id,
            height: 120,
            className: 'messageDetail'
        });

    var imageView = Ti.UI.createImageView({
        left: 0,
        height: 120,
        touchEnabled: false,
        image: item.photo,
        width: 120
    }),
    subjectLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 10,
        color: '#000',
        left: 130,
        font: {fontSize: 24},
        text: item.subject
    }),
    toLabel = Ti.UI.createLabel({
        touchEnabled: false,
        bottom: 10,
        color: '#000',
        left: 130,
        font: {fontSize: 24, fontWeight: 'bold'},
        text: L('to') + ': '
    }),
    receiverLabel = Ti.UI.createLabel({
        touchEnabled: false,
        bottom: 10,
        right: 10,
        color: '#000',
        left: 170,
        ellipsize: true,
        font: {fontSize: 24},
        text: item.receivers.join(', ')
    }),
    dateLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 10,
        right: 10,
        text: moment(item.sent_date, "YYYY-MM-DD").format("MM/DD/YY")
    });

    self.add(imageView);
    self.add(subjectLabel);
    self.add(toLabel);
    self.add(receiverLabel);
    self.add(dateLabel);

    return self;
}

module.exports = SentMessageRow;