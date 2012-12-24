function FilterWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        ReviewWindow = require('ui/common/filter/ReviewWindow'),
        PriceWindow = require('ui/common/filter/PriceWindow'),
        CategoryWindow = require('ui/common/filter/CategoryWindow'),
        ConditionWindow = require('ui/common/filter/ConditionWindow'),
        DistanceWindow = require('ui/common/filter/DistanceWindow'),
        params = _args.params,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'}, theme.styles.Window));
        
    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('refine')},theme.styles.header.label)),
    filterTableView = Ti.UI.createTableView({
        top: 90,
        bottom: 90,
        left: 0,
        right: 0
    }),
    buttonBar = new CustomButtonBar({
        buttons: [L('clear'),L('done')],
        handler: function (e) {
            if (e.index === 0) {
                params.category = null;
                params.min_price = null;
                params.max_price = null;
                params.distance = null;
                params.condition = null;
                params.min_score = null;
            }
            self.fireEvent('filter:select');
            self.close();
        }
    });

    var rowProperties = {
        color: '#000',
        font: {fontSize: 32},
        rightImage: '/images/arrow_right.png',
        height: 90
    };

    var distanceRow = Ti.UI.createTableViewRow(_.extend({title: L('distance_text')},rowProperties)),
    categoryRow = Ti.UI.createTableViewRow(_.extend({title: L('category_text')},rowProperties)),
    priceRangeRow = Ti.UI.createTableViewRow(_.extend({title: L('price')},rowProperties)),
    conditionRow = Ti.UI.createTableViewRow(_.extend({title: L('condition')},rowProperties)),
    reviewRow = Ti.UI.createTableViewRow(_.extend({title: L('review_sort')},rowProperties));

    filterTableView.setData([distanceRow,categoryRow,priceRangeRow,conditionRow,reviewRow]);

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(filterTableView);
    self.add(buttonBar);

    reviewRow.addEventListener('click', function (e) {
        var reviewWindow = new ReviewWindow({params: params});
        reviewWindow.open({modal: true});
    });

    priceRangeRow.addEventListener('click', function (e) {
        var priceWindow = new PriceWindow({params: params});
        priceWindow.open({modal: true});
    });

    categoryRow.addEventListener('click', function (e) {
        var categoryWindow = new CategoryWindow({params: params});
        categoryWindow.open({modal: true});
    });

    conditionRow.addEventListener('click', function (e) {
        var conditionWindow = new ConditionWindow({params: params});
        conditionWindow.open({modal: true});
    });

    distanceRow.addEventListener('click', function (e) {
        var distanceWindow = new DistanceWindow({params: params});
        distanceWindow.open({modal: true});
    });

    return self;
}

module.exports = FilterWindow;