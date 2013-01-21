function PromotionFormWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        PromotionService = require('business/services/PromotionService'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        DatePickerDialog = require('ui/components/DatePickerDialog'),
        TimePickerDialog = require('ui/components/TimePickerDialog'),
        opts = _args,
        item = _({expires: new Date(), active: true}).extend(_args.data),
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var fieldLabelProperties = {
            color: '#000',
            font: {fontSize: 30, fontWeight: 'bold'},
            left: 10
        };

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        left : 50,
        right: 50,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('promotion')},theme.styles.popup.header.label)),
    formScrollView = Ti.UI.createScrollView({
        top: 90,
        bottom: 90,
        left: 0,
        right: 0
    }),
    activeLabel = Ti.UI.createLabel(_.extend({
        top: 35,
        text: L('active')
    }, fieldLabelProperties)),
    activeSwitch = Ti.UI.createSwitch({
        value: !!item.active,
        style: Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
        left: 210,
        top: 10,
        height: 80,
        right: 10
    }),
    priceLabel = Ti.UI.createLabel(_.extend({
        top: 135,
        text: L('deal_price_text')
    }, fieldLabelProperties)),
    priceField = Ti.UI.createTextField({
        top: 110,
        hintText: L('price') + ' (VND)',
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        left: 210,
        right: 10,
        value: item.price ? item.price : ''
    }),
    amountLabel = Ti.UI.createLabel(_.extend({
        top: 235,
        text: L('amount')
    }, fieldLabelProperties)),
    amountField = Ti.UI.createTextField({
        top: 210,
        hintText: L('amount'),
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        left: 210,
        right: 10,
        value: item.amount ? item.amount : ''
    }),
    endDateLabel = Ti.UI.createLabel(_.extend({
        top: 335,
        text: L('expires')
    }, fieldLabelProperties)),
    endDateField = Ti.UI.createTextField({
        top: 310,
        hintText: L('date'),
        editable: false,
        left: 210,
        right: 10,
        value: moment(item.expires).format("MM-DD-YYYY")
    }),
    endTimeField = Ti.UI.createTextField({
        top: 410,
        hintText: L('time'),
        editable: false,
        left: 210,
        right: 10,
        value: moment(item.expires).format("HH:mm")
    }),
    bottomBar = new DoneCancelButtonBar({
        parentWin: self,
        handler: function (e) {
            var params = {
                price: priceField.value,
                active: activeSwitch.getValue(),
                expires: moment(endDateField.value + endTimeField.value, 'MM-DD-YYYYHH:mm')._d
            }, deferred;
            if (amountField.value) {
                params.amount = amountField.value;
            }
            if (item.id) {
                deferred = service.update(item.id, params);
            } else {
                params.shop_product_id = opts.shop_product_id;
                deferred = service.create(params);
            }
            deferred.done(function (e) {
                self.close();
                if (_(opts.handler).isFunction()) {
                    opts.handler();
                }
            }).fail(function (e) {
                alert(e.error);
            });
        }
    }),
    service = new PromotionService();

    headerView.add(headerLabel);

    formScrollView.add(activeLabel);
    formScrollView.add(activeSwitch);
    formScrollView.add(priceLabel);
    formScrollView.add(priceField);
    formScrollView.add(amountLabel);
    formScrollView.add(amountField);
    formScrollView.add(endDateLabel);
    formScrollView.add(endDateField);
    formScrollView.add(endTimeField);

    view.add(headerView);
    view.add(formScrollView);
    view.add(bottomBar);
    self.add(view);

    endDateField.addEventListener('click', datePickerHandler);
    endDateField.addEventListener('focus', datePickerHandler);

    endTimeField.addEventListener('click', timePickerHandler);
    endTimeField.addEventListener('focus', timePickerHandler);

    function datePickerHandler (e) {
        var dialog = new DatePickerDialog({
            config: {
                minDate: new Date(),
                maxDate: moment().add('years',4)._d,
                value: item.expires
            },
            handler: function (e) {
                endDateField.value = moment(e.result).format('MM-DD-YYYY');
            }
        });

        dialog.show();
    }

    function timePickerHandler (e) {
        var dialog = new TimePickerDialog({
            config: {
                value: item.expires
            },
            handler: function (e) {
                endTimeField.value = moment(e.result).format('HH:mm');
            }
        });

        dialog.show();
    }

    return self;
}

module.exports = PromotionFormWindow;