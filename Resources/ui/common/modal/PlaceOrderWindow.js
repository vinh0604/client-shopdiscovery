function PlaceOrderWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        APP_CONST = require('business/constants'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        item = _args.data,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('product_ordering')},theme.styles.header.label)),
    scrollView = Ti.UI.createScrollView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90,
        layout: 'vertical',
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    containerView = Ti.UI.createView({
        layout: 'horizontal',
        left: 0,
        right: 0,
        top: 0,
        height: 100
    }),
    amountLabel = Ti.UI.createLabel({
        color: '#000',
        font: {fontSize: 30, fontWeight: 'bold'},
        top: 25,
        left: 10,
        text: L('enter_order_amount')
    }),
    amountField = Ti.UI.createTextField({
        top: 10,
        left: 10,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        width: 150,
        value: '1'
    }),
    shipmentTitleLabel = Ti.UI.createLabel({
        color: '#000',
        font: {fontSize: 30, fontWeight: 'bold'},
        top: 10,
        left: 10,
        text: L('shipment_contact')
    }),
    firstNameField = Ti.UI.createTextField({
        left: 10, top: 10, right: 10,
        hintText: L('first_name')
    }),
    lastNameField = Ti.UI.createTextField({
        left: 10, top: 10, right: 10,
        hintText: L('last_name')
    }),
    genderField = Ti.UI.createTextField({
        left: 10, top: 10, right: 10,
        hintText: L('gender'),
        editable: false
    }),
    identityField = Ti.UI.createTextField({
        left: 10, top: 10, right: 10,
        hintText: L('identity'),
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    }),
    phoneField = Ti.UI.createTextField({
        left: 10, top: 10, right: 10,
        hintText: L('phone'),
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    }),
    addressField = Ti.UI.createTextArea({
        left: 10, top: 10, right: 10,
        hintText: L('address'),
        height: 200
    }),
    bottomBar = new DoneCancelButtonBar({
        parentWin: self,
        handler: function (e) {
            var OrderService = require('business/services/OrderService'),
                service = new OrderService(),
                indicator = Ti.UI.createActivityIndicator({message: L('processing')});
            indicator.show();
            var contact = {
                first_name:firstNameField.value,
                last_name: lastNameField.value,
                gender: genderField.value ? _.find(APP_CONST.DATA.GENDER_ARRAY,function (obj) {
                            return obj.value == genderField.value;
                        }).code : APP_CONST.DATA.GENDER_ARRAY[2].code,
                phone: phoneField.value,
                identity: identityField.value,
                address: addressField.value
            };
            service.create(item.id, amountField.value,contact).done(function (evt) {
                self.close();
                alert(L('order_success'));
            }).fail(function (evt) {
                indicator.hide();
                var toast = Ti.UI.createNotification({
                    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                    message: L('order_fail')
                });
                toast.show();
            });
        }
    }),
    genderOptionDialog = Ti.UI.createOptionDialog({
        title: L('gender'),
        options: [L('female'),L('male'), L('other')]
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    });

    headerView.add(headerLabel);
    containerView.add(amountLabel);
    containerView.add(amountField);
    scrollView.add(containerView);
    scrollView.add(firstNameField);
    scrollView.add(lastNameField);
    scrollView.add(genderField);
    scrollView.add(phoneField);
    scrollView.add(identityField);
    scrollView.add(addressField);
    self.add(headerView);
    self.add(scrollView);
    self.add(bottomBar);

    amountField.addEventListener('change', enableDisableDoneButton);

    genderField.addEventListener('focus', function (e) {
        genderOptionDialog.show();
    });
    genderField.addEventListener('click', function (e) {
        genderOptionDialog.show();
    });

    genderOptionDialog.addEventListener('click', function (e) {
        if (e.index >= 0) {
            genderField.setValue(genderOptionDialog.getOptions()[e.index]);
            phoneField.focus();
        }
    });

    self.addEventListener('open', function (e) {
        var ProfileService = require('business/services/ProfileService'),
            service = new ProfileService();
        activityIndicator.show();
        service.load().done(function (result) {
            firstNameField.value = result.first_name;
            lastNameField.value = result.last_name;
            if (result.gender !== undefined) {
                genderField.value = _.find(APP_CONST.DATA.GENDER_ARRAY,function (obj) {
                    return obj.code == result.gender;
                }).value;
            } else {
                genderField.value = "";
            }
            phoneField.value = result.phone;
            identityField.value = result.identity;
            addressField.value = result.address;
            activityIndicator.hide();
        }).fail(function (e) {
            activityIndicator.hide();
        });
    });

    function enableDisableDoneButton (e) {
        var amount = parseInt(e.value,10);
        if (amount > 0) {
            bottomBar.enableButton();
        } else {
            bottomBar.disableButton();
        }
    }

    return self;
}

module.exports = PlaceOrderWindow;