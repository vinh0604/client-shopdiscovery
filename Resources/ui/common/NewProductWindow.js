function NewProductWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        titaniumBarcode = require('com.mwaysolutions.barcode'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        NewProductStep2Window = require('ui/common/modal/NewProductStep2Window'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('new_product')},theme.styles.header.label)),
    containerView = Ti.UI.createView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90
    }),
    nameField = Ti.UI.createTextField({
        left: 10,
        right: 10,
        top: 10,
        hintText: L('product_name')
    }),
    scanView = Ti.UI.createView({
        top: 110,
        left: 0,
        right: 0,
        height: Ti.UI.SIZE
    }),
    scanField = Ti.UI.createTextField({
        left: 10,
        right: 110,
        hintText: L('barcode'),
        editable: false,
        focusable: false
    }),
    scanImageView = Ti.UI.createImageView({
        width: 90,
        height: 90,
        right: 10,
        image: '/images/barcode.png'
    }),
    hintView = Ti.UI.createView({
        top: 210,
        left: 0,
        right: 0,
        height: Ti.UI.SIZE
    }),
    hintLabel = Ti.UI.createLabel({
        left: 10,
        right: 10,
        font: {fontSize: 28},
        color: '#000',
        text: L('hint_for_new_product')
    }),
    bottomBar = new CustomButtonBar({
        buttons: [L('cancel'),L('continue_text')],
        handler: cancelContinueHandler
    }),
    autoCompleteView = Ti.UI.createView({
        zIndex: 1,
        top: 190,
        left: 10,
        right: 10,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#fff',
        visible: false,
        bottom: 90
    }),
    autoCompleteTableView = Ti.UI.createTableView({
        top: 60,
        left: 0,
        right: 0,
        height: Ti.UI.SIZE
    }),
    suggestionLabel = Ti.UI.createLabel({
        top: 10,
        text: L('suggestion_product'),
        height: 60,
        left: 5,
        right: 0,
        font: {fontSize: 28, fontWeight: 'bold'},
        color: '#000'
    });

    headerView.add(headerLabel);

    scanView.add(scanField);
    scanView.add(scanImageView);
    hintView.add(hintLabel);
    containerView.add(nameField);
    containerView.add(scanView);
    containerView.add(hintView);

    autoCompleteView.add(suggestionLabel);
    autoCompleteView.add(autoCompleteTableView);

    self.add(headerView);
    self.add(containerView);
    self.add(bottomBar);
    self.add(autoCompleteView);

    scanImageView.addEventListener('click', function (e) {
        titaniumBarcode.scan({
            success: function (data) {
                if (data && data.barcode) {
                    scanField.value = data.barcode;
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    });

    var last_search = '',
        autocomplete_timer;
    nameField.addEventListener('change', function (e) {
        var currentValue = e.source.value.trim();

        if (!currentValue || currentValue.length <= 2) {
            autoCompleteView.hide();
        } else if (currentValue !=  last_search) {
            if (autocomplete_timer) {
                clearTimeout(autocomplete_timer);
            }
            
            autocomplete_timer = setTimeout(function()
            {
                last_search = currentValue;
                autoCompleteTableView.setData([]);
                autoComplete(currentValue);
                autoCompleteView.show();
            }, 300);
        }
        return false;
    });

    nameField.addEventListener('return', function (e) {
        autoCompleteView.hide();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    function cancelContinueHandler (e) {
        if (e.index) {
            var newProductStep2Window = new NewProductStep2Window({
                data: {
                    name: 'Sample product with some details',
                    code: '123115545',
                    category: {id: 1, name: 'Smartphone'},
                    specific: {
                        "Manufacturer" : "Samsung",
                        "Display" : "1024x768",
                        "DPI": "280"
                    }
                }
            });

            newProductStep2Window.open({modal: true});
        } else {
            self.close();
        }
    }

    function autoComplete (keyword) {
        var sample_data = [
            {id: 1, name: 'Sample Product with some details'},
            {id: 1, name: 'Sample Product with some details'},
            {id: 1, name: 'Sample Product with some details'}
        ];

        for (var i = 0, l=sample_data.length; i < l; i++) {
            var row = Ti.UI.createTableViewRow({
                height: 90,
                title: sample_data[i].name,
                color: '#000'
            });
            row.addEventListener('click', suggestionClickHandler);
            autoCompleteTableView.appendRow(row);
        }
    }

    function suggestionClickHandler (e) {
        
    }

    return self;
}

module.exports = NewProductWindow;