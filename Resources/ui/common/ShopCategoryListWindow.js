function ShopCategoryListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        opts = _args,
        item = _args.data,
        CategoryService = require('business/services/CategoryService'),
        CategoryListView = require('ui/common/CategoryListView'),
        controller = _args.controller,
        viewStack = [],
        sequences = [],
        zIndex = 0,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('categories')},theme.styles.header.label)),
    categoryListView = new CategoryListView({config: {top: 90, zIndex: zIndex}}),
    categoryService = new CategoryService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(categoryListView);
    viewStack.push(categoryListView);

    categoryListView.addEventListener('row:clicked', categoryRowClickHandler);

    self.addEventListener('open', function (e) {
        controller.register(self);
        loadData(categoryListView, {shop_id: item.id});

        categoryListView.defocusSearchBar();
    });

    self.addEventListener('android:back', function (e) {
        if (viewStack.length > 1) {
            self.remove(viewStack.pop());
            sequences.pop();
            --zIndex;
        } else {
            self.close();
        }
    });

    function categoryRowClickHandler (e) {
        if (e.rowData.hasChild) {
            ++ zIndex;
            sequences.push(e.rowData.title);
            var subCategoryListView = new CategoryListView({
                config: {top: 90, zIndex: zIndex}
            });
            self.add(subCategoryListView);
            viewStack.push(subCategoryListView);
            subCategoryListView.defocusSearchBar();
            subCategoryListView.addEventListener('row:clicked', categoryRowClickHandler);
            loadData(subCategoryListView, {shop_id: item.id, parent_id: e.rowData._id});
        } else {
            var ShopProductListWindow = require('ui/common/ShopProductListWindow'),
                spListWindow = new ShopProductListWindow({
                    controller: controller,
                    data: {
                        shop_id: item.id,
                        category_id: e.rowData._id,
                        category: e.rowData.title
                    }
                });
            spListWindow.open();
        }
    }

    function loadData (listView, params) {
        activityIndicator.show();
        categoryService.shop(params).done(function (result) {
            listView.setTableData(result);
            listView.setBreadcrumb(sequences);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = ShopCategoryListWindow;