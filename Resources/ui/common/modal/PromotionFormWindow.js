function PromotionFormWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        DoneCancelButtonBar = require('ui/components/DoneCancelButtonBar'),
        DatePickerDialog = require('ui/components/DatePickerDialog'),
        TimePickerDialog = require('ui/components/TimePickerDialog'),
        opts = _args,
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
    formView = Ti.UI.createView({
        top: 90,
        bottom: 90,
        left: 0,
        right: 0
    }),
    priceLabel = Ti.UI.createLabel(_.extend({
        top: 35,
        text: L('deal_price_text')
    }, fieldLabelProperties)),
    priceField = Ti.UI.createTextField({
        top: 10,
        hintText: L('price'),
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        left: 260,
        right: 100
    }),
    priceUnitLabel = Ti.UI.createLabel({
        right: 10,
        top: 35,
        width: 80,
        color: '#000',
        font: {fontSize: 30},
        text: 'VND'
    }),
    amountLabel = Ti.UI.createLabel(_.extend({
        top: 135,
        text: L('amount')
    }, fieldLabelProperties)),
    amountField = Ti.UI.createTextField({
        top: 110,
        hintText: L('amount'),
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
        left: 260,
        right: 10
    }),
    endDateLabel = Ti.UI.createLabel(_.extend({
        top: 235,
        text: L('expires')
    }, fieldLabelProperties)),
    endDateField = Ti.UI.createTextField({
        top: 210,
        hintText: L('date'),
        editable: false,
        focusable: false,
        left: 260,
        right: 10
    }),
    endTimeField = Ti.UI.createTextField({
        top: 310,
        hintText: L('time'),
        editable: false,
        focusable: false,
        left: 260,
        right: 10
    }),
    bottomBar = new DoneCancelButtonBar({parentWin: self});

    headerView.add(headerLabel);

    formView.add(priceLabel);
    formView.add(priceField);
    formView.add(priceUnitLabel);
    formView.add(amountLabel);
    formView.add(amountField);
    formView.add(endDateLabel);
    formView.add(endDateField);
    formView.add(endTimeField);

    view.add(headerView);
    view.add(formView);
    view.add(bottomBar);
    self.add(view);

    endDateField.addEventListener('click', datePickerHandler);

    endTimeField.addEventListener('click', timePickerHandler);

    function datePickerHandler (e) {
        var dialog = new DatePickerDialog({
            config: {
                minDate: new Date(),
                maxDate: moment().add('years',4)._d,
                value: new Date()
            },
            handler: function (e) {
                alert(e.result);
            }
        });

        dialog.show();
    }

    function timePickerHandler (e) {
        var dialog = new TimePickerDialog({
            config: {
                value: new Date()
            },
            handler: function (e) {
                alert(e.result);
            }
        });

        dialog.show();
    }

    return self;
}

module.exports = PromotionFormWindow;