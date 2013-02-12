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

    var subjectLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 10,
        color: '#000',
        left: 10,
        font: {fontSize: 24},
        text: item.title
    }),
    toLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 40,
        color: '#000',
        left: 10,
        font: {fontSize: 24, fontWeight: 'bold'},
        text: L('to') + ': '
    }),
    receiverLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 40,
        right: 10,
        color: '#000',
        left: 50,
        ellipsize: true,
        font: {fontSize: 24},
        text: item.receivers.join(', ')
    }),
    headlineLabel = Ti.UI.createLabel({
        touchEnabled: false,
        bottom: 10,
        color: '#c6c6c6',
        left: 10,
        font: {fontSize: 24},
        text: item.headline
    }),
    dateLabel = Ti.UI.createLabel({
        touchEnabled: false,
        top: 10,
        right: 10,
        text: moment(item.sent_date, "YYYY-MM-DD").format("MM/DD/YY")
    });

    self.add(subjectLabel);
    self.add(toLabel);
    self.add(receiverLabel);
    self.add(headlineLabel);
    self.add(dateLabel);

    return self;
}

module.exports = SentMessageRow;