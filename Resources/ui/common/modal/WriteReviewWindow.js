function WriteReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ReviewService = require('business/services/ReviewService'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        RatingBar = require('ui/components/RatingBar'),
        opts = _args,
        data = _.extend({},_args.data),
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
    bottomBar = new DoneCancelButtonBar({
        parentWin: self,
        disabled: true,
        handler: doneClickHandler
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(ratingBar);
    view.add(titleField);
    view.add(contentField);
    view.add(bottomBar);
    self.add(view);

    ratingBar.addEventListener('star:click', function (e) {
        bottomBar.enableButton();
    });

    function doneClickHandler (e) {
        data.title = titleField.value;
        data.content = contentField.value;
        data.rating = ratingBar.getCurrentStar();
        var service = new ReviewService();
        activityIndicator.show();
        service.postReview(data).done(function (result) {
            activityIndicator.hide();
            self.close();
            opts.handler({success: true});
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = WriteReviewWindow;