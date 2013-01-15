function PriceWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        opts = _args,
        params = _args.params,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        width : theme.platformWidth - 100,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('price')},theme.styles.popup.header.label)),
    fromPriceLabel = Ti.UI.createLabel({
        text: L('min_price'),
        left: 10,
        top: 125,
        font: {fontSize: 30},
        color: '#000'
    }),
    fromUnitLabel = Ti.UI.createLabel({
        text: L('vnd'),
        right: 230,
        top: 125,
        font: {fontSize: 30},
        color: '#000'
    }),
    fromPriceField = Ti.UI.createTextField({
        width: 200,
        right: 10,
        top: 100,
        value: params.min_price ? params.min_price : '',
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION
    }),
    toPriceLabel = Ti.UI.createLabel({
        text: L('max_price'),
        left: 10,
        top: 225,
        font: {fontSize: 30},
        color: '#000'
    }),
    toUnitLabel = Ti.UI.createLabel({
        text: L('vnd'),
        right: 230,
        top: 225,
        font: {fontSize: 30},
        color: '#000'
    }),
    toPriceField = Ti.UI.createTextField({
        width: 200,
        right: 10,
        top: 200,
        value: params.max_price ? params.max_price : '',
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION
    }),
    buttonBar = new CustomButtonBar({
        top: 300,
        buttons: ['Clear','Done'],
        handler: function (e) {
            if (e.index) {
                params.min_price = fromPriceField.value;
                params.max_price = toPriceField.value;
                self.close();
            } else {
                fromPriceField.value = '';
                toPriceField.value = '';
            }
        }
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(fromPriceLabel);
    view.add(fromUnitLabel);
    view.add(fromPriceField);
    view.add(toPriceLabel);
    view.add(toUnitLabel);
    view.add(toPriceField);
    view.add(buttonBar);

    self.add(view);

    self.addEventListener('click', function (e) {
        if (e.source == self) {
            self.close();
        }
    });

    return self;
}

module.exports = PriceWindow;