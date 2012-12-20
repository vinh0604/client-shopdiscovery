function ReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        APP_CONST = require('business/constants'),
        ReviewService = require('business/services/ReviewService'),
        RatingStarBar = require('ui/components/RatingStarBar'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        ReviewRow = require('ui/components/tablerow/ReviewRow'),
        ReviewSummaryView = require('ui/components/ReviewSummaryView'),
        WriteReviewWindow = require('ui/common/modal/WriteReviewWindow'),
        item = _args.data,
        params = {
            id: item.id,
            reviewable_type: _args.type,
            page: 1,
            per_page: 30
        },
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('reviews')},theme.styles.header.label)),
    tableView = new InfiniteScrollTableView({
        config: {top: 90,bottom: 0},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    productNameRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    productNameLabel = Ti.UI.createLabel({
        top: 10,
        bottom: 10,
        left: 10,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        text: item.name
    }),
    reviewSummaryRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    reviewSummaryView = new ReviewSummaryView({}),
    yourReviewRow = Ti.UI.createTableViewRow({
        height: 80
    }),
    yourReviewView = Ti.UI.createView({
        height: '100%',
        width: '100%'
    }),
    yourReviewLabel = Ti.UI.createLabel({
        text: L('your_review'),
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        left: 10
    }),
    yourReviewStarBar = new RatingStarBar({
        config: {right: 10, width: 250},
        size: 45,
        max: 5
    }),
    reviewService = new ReviewService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);

    productNameRow.add(productNameLabel);
    reviewSummaryRow.add(reviewSummaryView);
    yourReviewView.add(yourReviewLabel);
    yourReviewView.add(yourReviewStarBar);
    yourReviewRow.add(yourReviewView);

    self.add(headerView);
    self.add(tableView);

    yourReviewStarBar.addEventListener('click', function (e) {
        writeReviewWindow = new WriteReviewWindow({
            data: {
                reviewable_id: params.id,
                reviewable_type: params.reviewable_type
            },
            handler: function (e) {
                if (e.success) {
                    params.page = 1;
                    tableView.stopUpdate = false;
                    loadData();
                }
            }
        });
        writeReviewWindow.open({modal: true});
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        loadData();
    });

    function fetchData () {
        var deferred = reviewService.all(params);
        return deferred;
    }

    function appendData (result) {
        ++params.page;
        for (var i = 0, l = result.rows.length; i < l; ++i) {
            var row = new ReviewRow({ data: result.rows[i] });
            tableView.appendRow(row);
        }
        if ((tableView.data[0].rowCount + 3) >= result.total) {
            tableView.stopUpdate = true;
        }
    }

    function loadData () {
        tableView.setData([productNameRow, reviewSummaryRow, yourReviewRow]);
        activityIndicator.show();
        reviewService.summary(params).done(function (result) {
            activityIndicator.hide();
            reviewSummaryView.setSummaryData(result);
            yourReviewStarBar.setRating({rating: result.user_rating});
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
        fetchData().done(appendData).fail(function (e) {
            alert(e.error);
        });
    }

    return self;
}

module.exports = ReviewWindow;