function NewProductStep2Window (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        APP_CONST = require('business/constants'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        opts = _args,
        item = _args.data,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#fff'
        });

    var containerView = Ti.UI.createView({
        top: 0,
        bottom: 90,
        left: 0,
        right: 0
    }),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 0,
        height: Ti.UI.SIZE
    }),
    productCodeRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: '#BABABA'
    }),
    productCodeLabel = Ti.UI.createLabel({
        text: L('item_number') + ': ' + item.code,
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 10,
        top: 5,
        bottom: 5
    }),
    productNameRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    productNameLabel = Ti.UI.createLabel({
        top: 10,
        bottom: 10,
        left: 10,
        font: {fontSize: 30},
        color: '#000',
        text: item.name
    }),
    categoryTitleRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: '#BABABA'
    }),
    categoryTitleLabel = Ti.UI.createLabel({
        text: L('category_text'),
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 10,
        top: 5,
        bottom: 5
    }),
    categoryRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        layout: 'vertical'
    }),
    categoryLabel = Ti.UI.createLabel({
        left: 10,
        right: 10,
        color: '#000',
        text: item.category ? item.category.name : ''
    }),
    cartegoryChangeButton = Ti.UI.createButton({
        title: L('select_new_category'),
        height: 80,
        top: 10,
        bottom: 10,
        width: 450
    }),
    specificTitleRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE,
        backgroundColor: '#BABABA'
    }),
    specificTitleLabel = Ti.UI.createLabel({
        text: L('specific'),
        font: {fontWeight: 'bold', fontSize: 28},
        color: '#000',
        left: 10,
        top: 5,
        bottom: 5
    }),
    specificRow = Ti.UI.createTableViewRow({
        height: Ti.UI.SIZE
    }),
    specificAddButton = Ti.UI.createButton({
        title: L('add_new_spec'),
        height: 80,
        top: 30,
        bottom: 30,
        width: 450
    }),
    bottomBar = new CustomButtonBar({
        buttons: [L('back'),L('continue_text')],
        handler: cancelContinueHandler
    });

    productCodeRow.add(productCodeLabel);
    productNameRow.add(productNameLabel);
    categoryTitleRow.add(categoryTitleLabel);
    categoryRow.add(categoryLabel);
    categoryRow.add(cartegoryChangeButton);
    specificTitleRow.add(specificTitleLabel);
    specificRow.add(specificAddButton);

    setupTableView();

    containerView.add(tableView);

    self.add(containerView);
    self.add(bottomBar);

    specificAddButton.addEventListener('click', specificAddButtonClickHandler);

    function cancelContinueHandler (e) {
        if (e.index) {

        } else {
            self.close();
        }
    }

    function addSpecificRow (index, name, description) {
        var row = Ti.UI.createTableViewRow({
                height: Ti.UI.SIZE,
                className: 'featureRow',
                _key: name
            }),
            featureLabel = Ti.UI.createLabel({
                text: name,
                top: 10,
                left: 10,
                width: 250
            }),
            featureValueLabel = Ti.UI.createLabel({
                text: description,
                color: '#000',
                left: 260,
                top: 10,
                right: 10,
                bottom: 10
            });

        row.add(featureLabel);
        row.add(featureValueLabel);

        row.addEventListener('longclick', specificRowLongClickHandler);

        tableView.insertRowBefore(index, row);
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
                setupTableView();
            }
        });

        dialog.show();
    }

    function specificAddButtonClickHandler (e) {
        var NewSpecificWindow = require('ui/common/modal/NewSpecificWindow'),
            newSpecificWindow = new NewSpecificWindow({
                handler: function (result) {
                    var index = tableView.data[0].rows.length - 1;

                    item.specific[result.name] = result.description;
                    addSpecificRow(index, result.name, result.description);
                }
            });

        newSpecificWindow.open({modal: true});
    }

    function setupTableView () {
        tableView.setData([productCodeRow, productNameRow, categoryTitleRow, categoryRow, specificTitleRow, specificRow]);

        if (item.specific) {
            var index = 5;
            for(var key in item.specific) {
                addSpecificRow(index, key, item.specific[key]);
                ++ index;
            }
        } else {
            item.specific = {};
        }
    }

    return self;
}

module.exports = NewProductStep2Window;