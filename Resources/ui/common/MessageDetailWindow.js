function MessageDetailWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff', layout: 'vertical'},theme.styles.Window));

    var topTableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        height: Ti.UI.SIZE
    }),
    infoRow = Ti.UI.createTableViewRow({
        touchEnabled: false,
        layout: 'vertical'
    }),
    fromView = Ti.UI.createView({
        left: 10,
        layout: 'horizontal'
    }),
    fromLabel = Ti.UI.createLabel({
        text: L('from') + ': '
    }),
    fromValueLabel = Ti.UI.createLabel({
        color: '#000'
    }),
    toView = Ti.UI.createView({
        left: 10,
        layout: 'horizontal'
    }),
    toLabel = Ti.UI.createLabel({
        text: L('to') + ': '
    }),
    toValueLabel = Ti.UI.createLabel({
        color: '#000'
    }),
    dateView = Ti.UI.createView({
        left: 10,
        layout: 'horizontal'
    }),
    dateLabel = Ti.UI.createLabel({
        text: L('date') + ': '
    }),
    dateValueLabel = Ti.UI.createLabel({
        color: '#000'
    }),
    subjectRow = Ti.UI.createTableViewRow({
        touchEnabled: false,
        layout: 'horizontal',
        height: 60
    }),
    subjectLabel = Ti.UI.createLabel({
        top: 10,
        left: 10,
        text: L('subject') + ': '
    }),
    subjectValueLabel = Ti.UI.createLabel({
        top: 10,
        color: '#000'
    }),
    contentView = Ti.UI.createView({
        left: 0,
        right: 0,
        bottom: 0
    }),
    contentWebView = Ti.UI.createWebView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 90
    }),
    bottomView = Ti.UI.createView({
        height: 90,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#BABABA'
    }),
    deleteButton = Ti.UI.createButton({
        left: 30,
        width: 80,
        height: 80,
        backgroundImage: '/images/trash_blue.png',
        backgroundFocusedImage: '/images/trash_red.png',
        backgroundSelectedImage: '/images/trash_red.png'
    }),
    replyButton = Ti.UI.createButton({
        left: 150,
        width: 80,
        height: 80,
        backgroundImage: '/images/undo_blue.png',
        backgroundFocusedImage: '/images/undo_red.png',
        backgroundSelectedImage: '/images/undo_red.png'
    }),
    nextButton = Ti.UI.createButton({
        right: 150,
        width: 80,
        height: 80,
        backgroundImage: '/images/arrow_up_blue.png',
        backgroundFocusedImage: '/images/arrow_up_red.png',
        backgroundSelectedImage: '/images/arrow_up_red.png'
    }),
    previousButton = Ti.UI.createButton({
        right: 30,
        width: 80,
        height: 80,
        backgroundImage: '/images/arrow_down_blue.png',
        backgroundFocusedImage: '/images/arrow_down_red.png',
        backgroundSelectedImage: '/images/arrow_down_red.png'
    });

    fromView.add(fromLabel);
    fromView.add(fromValueLabel);
    toView.add(toLabel);
    toView.add(toValueLabel);
    dateView.add(dateLabel);
    dateView.add(dateValueLabel);
    infoRow.add(fromView);
    infoRow.add(toView);
    infoRow.add(dateView);
    subjectRow.add(subjectLabel);
    subjectRow.add(subjectValueLabel);

    bottomView.add(deleteButton);
    bottomView.add(replyButton);
    bottomView.add(nextButton);
    bottomView.add(previousButton);

    topTableView.setData([infoRow,subjectRow]);
    contentView.add(contentWebView);
    contentView.add(bottomView);

    self.add(topTableView);
    self.add(contentView);

    self.addEventListener('open', function (e) {
        controller.register(self);

        var data = {
            sender: 'Vinh Bachsy',
            receivers: ['vinhbachsy, ducvinh'],
            sent_date: '2012-02-12',
            subject: 'Sample message subject',
            content: 'Hello everybody!'
        };

        setData(data);

        enableNextButton(false);
    });

    function enableNextButton (flag) {
        nextButton.enabled = !!flag;
        if (flag) {
            nextButton.backgroundImage = '/images/arrow_up_blue.png';
            nextButton.backgroundFocusedImage = '/images/arrow_up_red.png';
            nextButton.backgroundSelectedImage = '/images/arrow_up_red.png';
        } else {
            nextButton.backgroundImage = '/images/arrow_up_gray.png';
        }
    }

    function enablePreviousButton (flag) {
        previousButton.enabled = !!flag;
        if (flag) {
            previousButton.backgroundImage = '/images/arrow_down_blue.png';
            previousButton.backgroundFocusedImage = '/images/arrow_down_red.png';
            previousButton.backgroundSelectedImage = '/images/arrow_down_red.png';
        } else {
            previousButton.backgroundImage = '/images/arrow_down_gray.png';
        }
    }

    function setData (data) {
        fromValueLabel.text = data.sender;
        toValueLabel.text = data.receivers.join(', ');
        dateValueLabel.text = moment(data.sent_date, "YYYY-MM-DD").format("MM/DD/YY");
        subjectValueLabel.text = data.subject;
        contentWebView.html = '<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />' + data.content;
    }

    return self;
}

module.exports = MessageDetailWindow;