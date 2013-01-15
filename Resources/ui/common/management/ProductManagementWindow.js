function ProductManagementWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CategoryService = require('business/services/CategoryService'),
        CategoryListView = require('ui/common/CategoryListView'),
        ShopProductService = require('business/services/ShopProductService'),
        ProductManagementRow = require('ui/components/tablerow/ProductManagementRow'),
        APP_CONST = require('business/constants'),
        controller = _args.controller,
        item = _args.data,
        categoryViewStack = [],
        sequences = [],
        zIndex = 1,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var searchBar = Ti.UI.createSearchBar({
        height: 90,
        left: 0,
        right: 0,
        hintText: L('search'),
        visible: false,
        showCancel: true
    }),
    tableHeaderView = Ti.UI.createView({
        left: 0,
        right: 0,
        layout: 'vertical'
    }),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 90,
        headerView: tableHeaderView,
        searchBar: searchBar
    }),
    addButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        bottom: 0,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        title: L('new_product'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    }),
    categoryListView = new CategoryListView({config: {bottom: 90, zIndex: zIndex}}),
    categoryService = new CategoryService(),
    service = new ShopProductService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    self.add(tableView);
    self.add(addButton);
    self.add(categoryListView);
    categoryViewStack.push(categoryListView);

    searchBar.addEventListener('cancel', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.value = "";
        }
    });

    categoryListView.addEventListener('row:clicked', categoryRowClickHandler);

    addButton.addEventListener('click', function (e) {
        var NewProductWindow = require('ui/common/management/NewProductWindow'),
            newProductWindow = new NewProductWindow({
                controller: controller
            });
        newProductWindow.open();
    });
    
    self.addEventListener('open', function (e) {
        controller.register(self);
        loadCategory(categoryListView, {shop_id: item.id});

        categoryListView.defocusSearchBar();
    });

    function categoryRowClickHandler (e) {
        if (e.rowData.hasChild) {
            ++ zIndex;
            sequences.push(e.rowData.title);
            var subCategoryListView = new CategoryListView({
                config: {bottom: 90, zIndex: zIndex}
            });
            self.add(subCategoryListView);
            categoryViewStack.push(subCategoryListView);
            subCategoryListView.defocusSearchBar();
            subCategoryListView.addEventListener('row:clicked', categoryRowClickHandler);
            loadCategory(subCategoryListView, {shop_id: item.id, parent_id: e.rowData._id});
        } else {
            for(var i = 0, l = categoryViewStack.length; i<l; ++i) {
                self.remove(categoryViewStack[i]);
            }
            categoryViewStack = [];
            sequences = [];
            zIndex = 0;
            loadProduct(e.rowData._id);
        }
    }

    function loadProduct (category_id) {
        tableView.setData([]);
        searchBar.value = "";
        activityIndicator.show();
        service.all({shop_id: item.id, category_id: category_id}).done(function (result) {
            var rows = [];
            for (var i = 0, l = result.length; i<l; ++i) {
                var row = new ProductManagementRow({
                    data: result[i],
                    deleteHandler: deleteHandler
                });
                rows.push(row);
            }
            tableView.setData(rows);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    function loadCategory (listView, params) {
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

    function deleteHandler (e) {
        
    }
    
    return self;
}

module.exports = ProductManagementWindow;