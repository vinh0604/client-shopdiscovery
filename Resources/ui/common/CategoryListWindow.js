function CategoryListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        opts = _args,
        SubCategoryListWindow = require('ui/common/CategoryListWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('categories')},theme.styles.header.label)),
    breadcrumbView = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 45,
        backgroundColor: '#BABABA'
    }),
    breadcrumbLabel = Ti.UI.createLabel({
        left: 10,
        font: {fontWeight: 'bold', fontSize: 30},
        color: '#000'
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
        top: 90,
        left: 0,
        right: 0,
        bottom: 0,
        search: searchBar,
        headerView: breadcrumbView
    });

    headerView.add(headerLabel);
    breadcrumbView.add(breadcrumbLabel);

    self.add(headerView);
    self.add(categoryTableView);

    categoryTableView.addEventListener('click', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.blur();
            searchBar.hide();
            searchBar.show();
        }
        if (e.rowData.hasChild) {
            var subCategoryWin = new SubCategoryListWindow({controller: controller});

            subCategoryWin.open({modal: true});
        }
    });

    searchBar.addEventListener('cancel', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.value = "";
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);

        breadcrumbLabel.text = L('select_category');
        categoryTableView.setData([
            {title: 'AAA', height: 90, color: '#000', rightImage: '/images/arrow_right.png', hasChild: true},
            {title: 'BBB', height: 90, color: '#000', rightImage: '/images/arrow_right.png', hasChild: true},
            {title: 'BBB', height: 90, color: '#000', rightImage: '/images/arrow_right.png', hasChild: true},
            {title: 'CCC', height: 90, color: '#000'},
            {title: 'CCC', height: 90, color: '#000'},
            {title: 'CCC', height: 90, color: '#000'}
        ]);

        setTimeout(function(e){
            searchBar.show();
        },200);
    });

    return self;
}

module.exports = CategoryListWindow;