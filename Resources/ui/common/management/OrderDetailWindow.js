function OrderDetailWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        accounting = require('lib/accounting'),
        moment = require('lib/moment'),
        APP_CONST = require('business/constants'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        DatePickerDialog = require('ui/components/DatePickerDialog'),
        ContactView = require('ui/components/ContactView'),
        OrderService = require('business/services/OrderService'),
        controller = _args.controller,
        closeHandler = _args.closeHandler,
        item = _args.data,
        data = {shipDate: new Date()},
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('order_detail')},theme.styles.header.label)),
    containerView = Ti.UI.createScrollView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90,
        layout: 'vertical',
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    productNameLabel = Ti.UI.createLabel({
        top: 5, left: 10,
        color: '#000',
        font: {fontSize: 28, fontWeight: 'bold'}
    }),
    priceView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    priceLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('price') + ': '
    }),
    priceValueLabel = Ti.UI.createLabel({
        right: 10, color: '#EB0C17', font: {fontSize: 28, fontWeight: 'bold'}
    }),
    amountView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    amountLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('amount') + ': '
    }),
    amountValueLabel = Ti.UI.createLabel({
        right: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'}
    }),
    totalView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    totalLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('total') + ': '
    }),
    totalValueLabel = Ti.UI.createLabel({
        right: 10, color: '#EB0C17', font: {fontSize: 28, fontWeight: 'bold'}
    }),
    shipmentInfoLabel = Ti.UI.createLabel({
        top: 5, left: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'},
        text: L('shipment_info')
    }),
    shipFeeField = Ti.UI.createTextField({
        left: 10, right: 10, keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        hintText: L('ship_fee') + ' (VND)'
    }),
    shipTypeField = Ti.UI.createTextField({
        left: 10, right: 10, hintText: L('deliver_type'), editable: false
    }),
    shipDateField = Ti.UI.createTextField({
        left: 10, right: 10, hintText: L('ship_date'), editable: false
    }),
    shipmentContactLabel = Ti.UI.createLabel({
        top: 5, left: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'},
        text: L('shipment_contact')
    }),
    contactView = new ContactView({config: {}}),
    buttonBar = new CustomButtonBar({
        buttons: [L('cancel'),L('proceed')],
        handler: function (e) {
            if (e.index) {
                proceedOrder();
            } else {
                cancelOrder();
            }
        }
    }),
    shipTypeOptionDialog = Ti.UI.createOptionDialog({
        title: L('deliver_type'),
        options: [L('deliver_shop'),L('deliver_home')]
    }),
    service = new OrderService(),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    priceView.add(priceLabel);
    priceView.add(priceValueLabel);
    amountView.add(amountLabel);
    amountView.add(amountValueLabel);
    totalView.add(totalLabel);
    totalView.add(totalValueLabel);
    headerView.add(headerLabel);
    containerView.add(productNameLabel);
    containerView.add(priceView);
    containerView.add(amountView);
    containerView.add(totalView);
    containerView.add(shipmentInfoLabel);
    containerView.add(shipFeeField);
    containerView.add(shipTypeField);
    containerView.add(shipDateField);
    containerView.add(shipmentContactLabel);
    containerView.add(contactView);
    self.add(headerView);
    self.add(containerView);
    self.add(buttonBar);

    buttonBar.enableButton(1, false);

    shipTypeField.addEventListener('focus', function (e) {
        shipTypeOptionDialog.show();
    });
    shipTypeField.addEventListener('click', function (e) {
        shipTypeOptionDialog.show();
    });

    shipDateField.addEventListener('click', datePickerHandler);
    shipDateField.addEventListener('focus', datePickerHandler);

    shipTypeOptionDialog.addEventListener('click', function (e) {
        if (e.index >= 0) {
            shipTypeField.setValue(shipTypeOptionDialog.getOptions()[e.index]);
            shipTypeField.blur();
        }
    });

    shipFeeField.addEventListener('change',enableDisableButton);
    shipDateField.addEventListener('change',enableDisableButton);
    shipTypeField.addEventListener('change',enableDisableButton);

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        service.get_order(item.id).done(function (result) {
            productNameLabel.text = result.shop_product.name;
            priceValueLabel.text = accounting.formatMoney(result.price, {symbol: 'VND', format:"%v %s"});
            amountValueLabel.text = result.amount;
            totalValueLabel.text = accounting.formatMoney(result.price * result.amount, {symbol: 'VND', format:"%v %s"});
            contactView.setContactData(result.shipment.contact);
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    function datePickerHandler (e) {
        var dialog = new DatePickerDialog({
            config: {
                minDate: new Date(),
                maxDate: moment().add('years',4)._d,
                value: data.shipDate
            },
            handler: function (e) {
                data.shipDate = e.result;
                shipDateField.value = moment(e.result).format('MM-DD-YYYY');
            }
        });

        dialog.show();
    }

    function cancelOrder () {
        var confirmDialog = Ti.UI.createAlertDialog({
            buttonNames: [L('cancel'), L('ok')],
            title: L('order_cancellation'),
            message: L('confirm_cancel_order')
        });
        confirmDialog.addEventListener('click', function (evt) {
            if (evt.index === 1) {
                activityIndicator.show();
                service.cancel_order(item.id).done(function (e) {
                    activityIndicator.hide();
                    self.close();
                    if (_(closeHandler).isFunction()) {
                        closeHandler();
                    }
                }).fail(function (e) {
                    activityIndicator.hide();
                    alert(e.error);
                });
            }
        });
        confirmDialog.show();
    }

    function proceedOrder () {
        var confirmDialog = Ti.UI.createAlertDialog({
            buttonNames: [L('cancel'), L('ok')],
            title: L('order_processing'),
            message: L('confirm_proceed_order')
        });
        confirmDialog.addEventListener('click', function (evt) {
            if (evt.index === 1) {
                activityIndicator.show();
                var params = {
                    order_shipment: {
                        fee: shipFeeField.value,
                        ship_type: _(APP_CONST.DATA.DELIVERY_ARRAY).find( function(d) {
                            return d.value == shipTypeField.value;
                        }).code,
                        ship_date: moment(shipDateField.value, 'MM-DD-YYYY')._d
                    }
                };
                service.confirm_order(item.id, params).done(function (e) {
                    activityIndicator.hide();
                    self.close();
                    if (_(closeHandler).isFunction()) {
                        closeHandler();
                    }
                }).fail(function (e) {
                    activityIndicator.hide();
                    alert(e.error);
                });
            }
        });
        confirmDialog.show();
    }

    function enableDisableButton (e) {
        var fee = parseFloat(shipFeeField.value,10);
        if (fee >= 0 && shipDateField.value && shipTypeField.value) {
            buttonBar.enableButton(1, true);
        } else {
            buttonBar.enableButton(1, false);
        }
    }

    return self;
}

module.exports = OrderDetailWindow;