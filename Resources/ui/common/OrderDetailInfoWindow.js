function OrderDetailInfoWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        accounting = require('lib/accounting'),
        moment = require('lib/moment'),
        APP_CONST = require('business/constants'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        ContactView = require('ui/components/ContactView'),
        OrderService = require('business/services/OrderService'),
        controller = _args.controller,
        item = _args.data,
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
    statusView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    statusLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('status') + ': '
    }),
    statusValueLabel = Ti.UI.createLabel({
        right: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'}
    }),
    shipmentInfoLabel = Ti.UI.createLabel({
        top: 5, left: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'},
        text: L('shipment_info')
    }),
    shipFeeView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    shipFeeLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('ship_fee') + ': '
    }),
    shipFeeValueLabel = Ti.UI.createLabel({
        right: 10, color: '#EB0C17', font: {fontSize: 28, fontWeight: 'bold'}
    }),
    deliveryView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    deliveryLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('delivery') + ': '
    }),
    deliveryValueLabel = Ti.UI.createLabel({
        right: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'}
    }),
    shipDateView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    shipDateLabel = Ti.UI.createLabel({
        left: 10, color: '#000', width: 200, text: L('ship_date') + ': '
    }),
    shipDateValueLabel = Ti.UI.createLabel({
        right: 10, color: '#000', font: {fontSize: 28, fontWeight: 'bold'}
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
    statusView.add(statusLabel);
    statusView.add(statusValueLabel);
    shipFeeView.add(shipFeeLabel);
    shipFeeView.add(shipFeeValueLabel);
    deliveryView.add(deliveryLabel);
    deliveryView.add(deliveryValueLabel);
    shipDateView.add(shipDateLabel);
    shipDateView.add(shipDateValueLabel);
    headerView.add(headerLabel);
    containerView.add(productNameLabel);
    containerView.add(priceView);
    containerView.add(amountView);
    containerView.add(totalView);
    containerView.add(statusView);
    containerView.add(shipmentInfoLabel);
    containerView.add(shipFeeView);
    containerView.add(deliveryView);
    containerView.add(shipDateView);
    containerView.add(shipmentContactLabel);
    containerView.add(contactView);
    self.add(headerView);
    self.add(containerView);
    self.add(buttonBar);

    buttonBar.enableButton(0, false);
    buttonBar.enableButton(1, false);

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        service.get_order(item.id).done(function (result) {
            productNameLabel.text = result.shop_product.name;
            priceValueLabel.text = accounting.formatMoney(result.price, {symbol: 'VND', format:"%v %s"});
            amountValueLabel.text = result.amount;
            totalValueLabel.text = accounting.formatMoney(result.price * result.amount, {symbol: 'VND', format:"%v %s"});
            shipFeeValueLabel.text = _(result.shipment.fee).isNull() ? L('NA') : accounting.formatMoney(result.shipment.fee, {symbol: 'VND', format:"%v %s"});
            shipDateValueLabel.text = result.shipment.ship_date ? moment(result.shipment.ship_date).format('MM-DD-YYYY') : L('NA');
            deliveryValueLabel.text = result.shipment.ship_type ? _(APP_CONST.DATA.DELIVERY_ARRAY).find( function(de) {
                return de.code == result.shipment.ship_type;
            }).value : L('NA');
            statusValueLabel.text = _(APP_CONST.DATA.ORDER_STATUS_ARRAY).find( function(os) {
                return os.code == result.status;
            }).value;
            contactView.setContactData(result.shipment.contact);
            if (result.status == APP_CONST.DATA.ORDER_STATUS.CONFIRMED) {
                buttonBar.enableButton(0, true);
                buttonBar.enableButton(1, true);
            }
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

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
                service.pay_order(item.id).done(function (result) {
                    activityIndicator.hide();
                    self.close();
                }).fail(function (e) {
                    activityIndicator.hide();
                    alert(e.error);
                });
            }
        });
        confirmDialog.show();
    }

    return self;
}

module.exports = OrderDetailInfoWindow;