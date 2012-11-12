function FilterWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        ReviewWindow = require('ui/common/filter/ReviewWindow'),
        PriceWindow = require('ui/common/filter/PriceWindow'),
        CategoryWindow = require('ui/common/filter/CategoryWindow'),
        ConditionWindow = require('ui/common/filter/ConditionWindow'),
        DistanceWindow = require('ui/common/filter/DistanceWindow'),
        controller = _args.controller,
        self = this,
        win = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'}, theme.styles.Window));

    _.extend(self, _args);
    self.win = win;
        
    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('refine')},theme.styles.header.label)),
    filterTableView = Ti.UI.createTableView({
        top: 90,
        bottom: 90,
        left: 0,
        right: 0
    }),
    doneCancelButtonBar = new DoneCancelButtonBar({parentWin: win});

    var rowLabelProperties = {
        color: '#000',
        font: {fontSize: 32},
        left: 10
    },
    rowValueProperties = {
        color: '#0af',
        font: {fontSize: 32}
    };

    var distanceRow = Ti.UI.createTableViewRow(theme.styles.hasChildrenRow),
    distanceLabel = Ti.UI.createLabel(
        _.extend({text: L('distance_text')},rowLabelProperties)
    ),
    distanceValueLabel = Ti.UI.createLabel(rowValueProperties),
    categoryRow = Ti.UI.createTableViewRow(theme.styles.hasChildrenRow),
    categoryLabel = Ti.UI.createLabel(
        _.extend({text: L('category_text')},rowLabelProperties)
    ),
    categoryValueLabel = Ti.UI.createLabel(rowValueProperties),
    priceRangeRow = Ti.UI.createTableViewRow(theme.styles.hasChildrenRow),
    priceRangeLabel = Ti.UI.createLabel(
        _.extend({text: L('price')},rowLabelProperties)
    ),
    priceRangeValueLabel = Ti.UI.createLabel(rowValueProperties),
    conditionRow = Ti.UI.createTableViewRow(theme.styles.hasChildrenRow),
    conditionLabel = Ti.UI.createLabel(
        _.extend({text: L('condition')},rowLabelProperties)
    ),
    conditionValueLabel = Ti.UI.createLabel(rowValueProperties),
    reviewRow = Ti.UI.createTableViewRow(theme.styles.hasChildrenRow),
    reviewLabel = Ti.UI.createLabel(
        _.extend({text: L('review_sort')},rowLabelProperties)
    ),
    reviewValueLabel = Ti.UI.createLabel(rowValueProperties);

    distanceRow.add(distanceLabel);
    distanceRow.add(distanceValueLabel);
    categoryRow.add(categoryLabel);
    categoryRow.add(categoryValueLabel);
    priceRangeRow.add(priceRangeLabel);
    priceRangeRow.add(priceRangeValueLabel);
    conditionRow.add(conditionLabel);
    conditionRow.add(conditionValueLabel);
    reviewRow.add(reviewLabel);
    reviewRow.add(reviewValueLabel);

    filterTableView.setData([distanceRow,categoryRow,priceRangeRow,conditionRow,reviewRow]);

    headerView.add(headerLabel);

    win.add(headerView);
    win.add(filterTableView);
    win.add(doneCancelButtonBar);

    reviewRow.addEventListener('click', function (e) {
        var reviewWindow = new ReviewWindow({});
        reviewWindow.open({modal: true});
    });

    priceRangeRow.addEventListener('click', function (e) {
        var priceWindow = new PriceWindow({
            handler: function (e) {
                
            }
        });
        priceWindow.open({modal: true});
    });

    categoryRow.addEventListener('click', function (e) {
        var categoryWindow = new CategoryWindow({
            data: {
                parent: {name: 'Hàng điện tử'},
                current: {name: 'Điện thoại'},
                children: [
                    {name: 'Điện thoại thường'},
                    {name: 'Điện thoại thông minh'}
                ]
            },
            handler: function (e) {
                
            }
        });
        categoryWindow.open({modal: true});
    });

    conditionRow.addEventListener('click', function (e) {
        var conditionWindow = new ConditionWindow({
            handler: function (e) {
                
            }
        });
        conditionWindow.open({modal: true});
    });

    distanceRow.addEventListener('click', function (e) {
        var distanceWindow = new DistanceWindow({
            handler: function (e) {
                
            }
        });
        distanceWindow.open({modal: true});
    });

    win.addEventListener('open', function (e) {
        controller.register(win);
    });

    return self;
}

FilterWindow.prototype.open = function () {
    this.win.open();
};

module.exports = FilterWindow;