function ProductManagementWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CategoryService = require('business/services/CategoryService'),
        CategoryListView = require('ui/common/CategoryListView'),
        ShopProductService = require('business/services/ShopProductService'),
        ShopProductManagementService = require('business/services/ShopProductManagementService'),
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
        backgroundColor: '#BABABA',
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    }),
    categoryLabel = Ti.UI.createLabel({
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 5,
        right: 310
    }),
    categorySelectButton = Ti.UI.createButton({
        title: L('select_category_hint'),
        borderRadius: 10,
        height: 60,
        width: 300,
        right: 5,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        font: {fontSize: 30, fontWeight: 'bold'},
        top: 10,
        bottom: 10
    }),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 90,
        headerView: tableHeaderView,
        search: searchBar
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
    managementService = new ShopProductManagementService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    tableHeaderView.add(categoryLabel);
    tableHeaderView.add(categorySelectButton);
    self.add(tableView);
    self.add(addButton);

    searchBar.addEventListener('cancel', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.value = "";
        }
    });

    categorySelectButton.addEventListener('click', initializeCategoryView);

    addButton.addEventListener('click', function (e) {
        var NewProductWindow = require('ui/common/management/NewProductWindow'),
            newProductWindow = new NewProductWindow({
                controller: controller,
                shop_id: item.id
            });
        newProductWindow.open();
    });

    tableView.addEventListener('click', function (e) {
        if (e.source.backgroundImage == '/images/trash_blue.png') {
            return;
        }
        if (e.rowData) {
            var ProductInfoWindow = require('ui/common/management/ProductInfoWindow'),
                productInfoWindow = new ProductInfoWindow({
                    controller: controller,
                    data: {id: e.rowData._id}
                });
            productInfoWindow.open();
        }
    });
    
    self.addEventListener('open', function (e) {
        controller.register(self);
        initializeCategoryView(e);
        Ti.App.addEventListener('product_management:reload', initializeCategoryView);
    });

    self.addEventListener('close', function (e) {
        Ti.App.removeEventListener('product_management:reload', initializeCategoryView);
    });

    function initializeCategoryView (e) {
        var categoryListView = new CategoryListView({config: {bottom: 90, zIndex: zIndex}});
        categoryListView.addEventListener('row:clicked', categoryRowClickHandler);
        self.add(categoryListView);
        categoryViewStack.push(categoryListView);
        loadCategory(categoryListView, {shop_id: item.id});
        categoryListView.defocusSearchBar();
    }

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
            zIndex = 1;
            loadProduct(e.rowData._id, e.rowData.title);
        }
    }

    function loadProduct (category_id, category_name) {
        tableView.setData([]);
        categoryLabel.text = String.format(L('category'), category_name);
        searchBar.visible = true;
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
        var confirmDialog = Ti.UI.createAlertDialog({
            buttonNames: [L('cancel'), L('ok')],
            title: L('delete_confirmation'),
            message: L('confirm_delete_product')
        });
        confirmDialog.addEventListener('click', function (evt) {
            if (evt.index === 1) {
                managementService.remove(e.item_id).done(initializeCategoryView).fail(function (evt) {
                    alert(evt.error);
                });
            }
        });
        confirmDialog.show();
    }
    
    return self;
}

module.exports = ProductManagementWindow;