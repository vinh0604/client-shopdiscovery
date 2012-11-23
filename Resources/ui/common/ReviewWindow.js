function ReviewWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        ReviewRow = require('ui/components/tablerow/ReviewRow'),
        ReviewSummaryView = require('ui/components/ReviewSummaryView'),
        WriteReviewWindow = require('ui/common/modal/WriteReviewWindow'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    // mock data
    item =  {
        id: 1,
        name: 'Sample product name with some details',
        rating: 4.2,
        rating_count: 225,
        star_count: [5,20,30,30,90]
    };

    _.mixin( require('lib/underscore.deferred') );

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('reviews')},theme.styles.header.label)),
    tableView = new InfiniteScrollTableView({
        config: {top: 90,bottom: 90},
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
    reviewSummaryView = new ReviewSummaryView({data: item}),
    newReviewButton = Ti.UI.createButton({
        bottom: 0,
        height: 90,
        left: 0,
        right: 0,
        title: L('new_review')
    });

    headerView.add(headerLabel);

    productNameRow.add(productNameLabel);
    reviewSummaryRow.add(reviewSummaryView);
    tableView.setData([productNameRow, reviewSummaryRow]);

    self.add(headerView);
    self.add(tableView);
    self.add(newReviewButton);

    newReviewButton.addEventListener('click', function (e) {
        writeReviewWindow = new WriteReviewWindow({});
        writeReviewWindow.open({modal: true});
    });

    self.addEventListener('open', function (e) {
        controller.register(self);

        var row_data = [
            {id: 1, title: 'Sample Review Title', reviewer: {name: 'Vinh Bachsy'}, updated_date: '2012-11-17', content: 'This product is very impressive. The quality is good, the price is low, the customer care is very good.', rating: 4},
            {id: 1, title: 'Sample Review Title', reviewer: {name: 'Vinh Bachsy'}, updated_date: '2012-11-17', content: 'This product is very impressive. The quality is good, the price is low, the customer care is very good.', rating: 4},
            {id: 1, title: 'Sample Review Title', reviewer: {name: 'Vinh Bachsy'}, updated_date: '2012-11-17', content: 'This product is very impressive. The quality is good, the price is low, the customer care is very good.', rating: 4},
            {id: 1, title: 'Sample Review Title', reviewer: {name: 'Vinh Bachsy'}, updated_date: '2012-11-17', content: 'This product is very impressive. The quality is good, the price is low, the customer care is very good.', rating: 4}
        ];

        for (var i = 0, l=row_data.length; i < l; ++i) {
            var row = new ReviewRow({data: row_data[i]});
            tableView.appendRow(row);
        }
    });

    function fetchData () {
        var deferred = new _.Deferred();

        return deferred;
    }

    function appendData (result) {
        
    }

    return self;
}

module.exports = ReviewWindow;