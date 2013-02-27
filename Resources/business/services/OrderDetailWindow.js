function OrderDetailWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
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

    }),
    priceView = Ti.UI.createView({

    }),
    priceLabel = Ti.UI.createLabel({

    }),
    priceValueLabel = Ti.UI.createLabel({

    }),
    amountView = Ti.UI.createView({

    }),
    amountLabel = Ti.UI.createLabel({

    }),
    amountValueLabel = Ti.UI.createLabel({

    }),
    totalView = Ti.UI.createView({

    }),
    totalLabel = Ti.UI.createLabel({

    }),
    totalValueLabel = Ti.UI.createLabel({

    }),
    shipmentInfoLabel = Ti.UI.createLabel({

    }),
    shipFeeField = Ti.UI.createTextField({

    }),
    shipTypeField = Ti.UI.createTextField({

    }),
    shipDateField = Ti.UI.createTextField({

    }),
    shipmentContactLabel = Ti.UI.createLabel({

    }),
    contactView = new ContactView(),
    buttonBar = new CustomButtonBar({
        buttons: [L('cancel'),L('proceed')],
        handler: function (e) {
            if (e.index) {
                
            } else {
                // cancel order
                self.close();
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

    headerView.add(headerLabel);
    containerView.add(productNameLabel);
    containerView.add(priceView);
    containerView.add(amountView);
    containerView.add(totalLabel);
    containerView.add(shipmentInfoLabel);
    containerView.add(shipFeeField);
    containerView.add(shipTypeField);
    containerView.add(shipDateField);
    containerView.add(shipmentContactLabel);
    containerView.add(contactView);
    self.add(headerView);
    self.add(containerView);
    self.add(buttonBar);

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    return self;
}

module.exports = OrderDetailWindow;