var _ = require('lib/underscore'),
    theme = require('helpers/theme');
function CategoryListView (_args) {
    var defaults = {
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff'
        },
        self = Ti.UI.createView(_.extend(defaults, _args.config));

    var breadcrumbView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 45,
        backgroundColor: '#BABABA'
    }),
    breadcrumbLabel = Ti.UI.createLabel({
        left: 10,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000',
        text: L('select_category')
    }),
    searchBar = Ti.UI.createSearchBar({
        height: 90,
        left: 0,
        right: 0,
        hintText: L('search'),
        visible: false,
        showCancel: true
    }),
    categoryTableView = Ti.UI.createTableView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        search: searchBar,
        headerView: breadcrumbView
    });
    breadcrumbView.add(breadcrumbLabel);

    self.add(categoryTableView);

    categoryTableView.addEventListener('click', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.blur();
            searchBar.hide();
            searchBar.show();
        }
        if (e.rowData) {
            self.fireEvent('row:clicked', e);
        }
    });

    searchBar.addEventListener('cancel', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.value = "";
        }
    });

    self.setTableData = function (data) {
        var table_data = _.map(data, function (d) {
            var row_data = {
                _id: d.id,
                title: d.name,
                rightImage: d['has_children?'] ? '/images/arrow_right.png' : '', 
                hasChild: d['has_children?'],
                height: 90, 
                color: '#000'
            };

            return row_data;
        });

        categoryTableView.setData(table_data);
    };

    self.setBreadcrumb = function (value) {
        if (!_.isEmpty(value)) {
            breadcrumbLabel.text = value.join(' > ');
        }
    };

    self.defocusSearchBar = function () {
        setTimeout(function(e){
            searchBar.show();
        },200);
    };

    return self;
}

module.exports = CategoryListView;