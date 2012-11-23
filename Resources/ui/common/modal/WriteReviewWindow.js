function WriteReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        RatingBar = require('ui/components/RatingBar'),
        opts = _args,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        width : theme.platformWidth - 100,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('new_review')},theme.styles.popup.header.label)),
    ratingBar = new RatingBar({config: {top: 100}}),
    titleField = Ti.UI.createTextField({
        left: 10,
        top: 200,
        hintText: L('title'),
        height: 90,
        right: 10
    }),
    contentField = Ti.UI.createTextArea({
        left: 10,
        top: 300,
        hintText: L('comment'),
        height: 250,
        right: 10,
        bottom: 90
    }),
    bottomBar = new DoneCancelButtonBar({parentWin: self});

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(ratingBar);
    view.add(titleField);
    view.add(contentField);
    view.add(bottomBar);
    self.add(view);

    return self;
}

module.exports = WriteReviewWindow;