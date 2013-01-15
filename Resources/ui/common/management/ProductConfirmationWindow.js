function ProductConfirmationWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        APP_CONST = require('business/constants'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        SpecificRow = require('ui/components/tablerow/SpecificRow'),
        ProductManagementService = require('business/services/ProductManagementService'),
        opts = _args,
        item = _args.data,
        controller = _args.controller,
        buttonProperties = {
            borderRadius: 15,
            height: 70,
            left: 80,
            right: 80,
            backgroundColor: '#4086FF',
            backgroundFocusedColor: '#87B3FF',
            backgroundSelectedColor: '#87B3FF',
            color: '#fff',
            font: {fontSize: 35, fontWeight: 'bold'},
            top: 10
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView({
        layout: 'vertical',
        height: Ti.UI.SIZE,
        left: 0,
        right: 0
    }),
    footerView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: 0,
        right: 0
    }),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 90,
        headerView: headerView,
        footerView: footerView
    }),
    productNameLabel = Ti.UI.createLabel({
        top: 10,
        left: 5,
        font: {fontSize: 30},
        color: '#000'
    }),
    productCodeLabel = Ti.UI.createLabel({
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 5,
        top: 10
    }),
    categoryTitleView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: 0,
        right: 0,
        backgroundColor: '#BABABA'
    }),
    categoryTitleLabel = Ti.UI.createLabel({
        text: L('category_text'),
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 5,
        top: 5,
        bottom: 5
    }),
    categoryLabel = Ti.UI.createLabel({
        left: 10,
        right: 10,
        color: '#000'
    }),
    cartegoryChangeButton = null,
    specificTitleView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: 0,
        right: 0,
        backgroundColor: '#BABABA'
    }),
    specificTitleLabel = Ti.UI.createLabel({
        text: L('specific'),
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 5,
        top: 5,
        bottom: 5
    }),
    specificAddButton = null,
    reportMistakeButton = null,
    bottomBar = new CustomButtonBar({
        buttons: [L('back'),L('continue_text')],
        handler: cancelContinueHandler
    }),
    service = new ProductManagementService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    categoryTitleView.add(categoryTitleLabel);
    specificTitleView.add(specificTitleLabel);
    headerView.add(productNameLabel);
    headerView.add(productCodeLabel);
    headerView.add(categoryTitleView);
    headerView.add(categoryLabel);
    if (!opts.readOnly) {
        cartegoryChangeButton = Ti.UI.createButton(_({title: L('select_new_category')}).defaults(buttonProperties));
        headerView.add(cartegoryChangeButton);
        cartegoryChangeButton.addEventListener('click', cartegoryChangeButtonClickHandler);
    }
    headerView.add(specificTitleView);
    if (!opts.readOnly) {
        specificAddButton = Ti.UI.createButton(_({title: L('add_new_spec')}).defaults(buttonProperties));
        footerView.add(specificAddButton);
        specificAddButton.addEventListener('click', specificAddButtonClickHandler);
    } else {
        reportMistakeButton = Ti.UI.createButton(_({title: L('report_mistake')}).defaults(buttonProperties));
        footerView.add(reportMistakeButton);
        reportMistakeButton.addEventListener('click', reportMistakeButtonClickHandler);
    }
    
    self.add(tableView);
    self.add(bottomBar);

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        service.one(item.id).done(function (result) {
            item = result;
            setData();
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    function cancelContinueHandler (e) {
        if (e.index) {

        } else {
            self.close();
        }
    }

    function specificRowLongClickHandler (e) {
        var dialog = Ti.UI.createAlertDialog({
            message: L('confirm_specific_deletion'),
            buttonNames: ['Cancel', 'OK'],
            title: L('delete_confirmation'),
            cancel: 0
        });

        dialog.addEventListener('click', function (event) {
            if (event.index == 1) {
                delete item.specific[e.source._key];
                setupSpecificRow();
            }
        });

        dialog.show();
    }

    function specificAddButtonClickHandler (e) {
        var NewSpecificWindow = require('ui/common/modal/NewSpecificWindow'),
            newSpecificWindow = new NewSpecificWindow({
                handler: function (result) {
                    var row = new SpecificRow({
                        data: result
                    });
                    item.specific[result.name] = result.description;
                    row.addEventListener('longclick', specificRowLongClickHandler);
                    tableView.appendRow(row);
                }
            });

        newSpecificWindow.open({modal: true});
    }

    function cartegoryChangeButtonClickHandler (e) {
        
    }

    function reportMistakeButtonClickHandler (e) {
        
    }

    function setData () {
        productNameLabel.text = item.name;
        productCodeLabel.text = 'EAN: ' + item.barcode;
        var categories = [];
        if (item.category) {
            if (_.isArray(item.category.ancestors)) {
                categories = item.category.ancestors.slice(0);
            }
            categories.push(item.category.name);
        }
        categoryLabel.text = categories.join(' > ');
        setupSpecificRow();
    }

    function setupSpecificRow () {
        if (item.specific) {
            tableRows = [];
            for(var key in item.specific) {
                var row = new SpecificRow({
                    data: {name: key, description: item.specific[key]}
                });
                tableRows.push(row);
                if (!opts.readOnly) {
                    row.addEventListener('longclick', specificRowLongClickHandler);
                }
            }
            tableView.setData(tableRows);
        } else {
            item.specific = {};
        }
    }

    return self;
}

module.exports = ProductConfirmationWindow;