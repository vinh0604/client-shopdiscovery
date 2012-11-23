function DoneCancelButtonBar (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        defaults = {
            backgroundColor: '#666',
            layout: 'horizontal',
            height: 90,
            bottom: 0,
            left: 0,
            right: 0
        },
        opts = _.extend(defaults, _args);

    var self = Ti.UI.createView(opts),
        buttonOptions = {
            color: '#fff',
            backgroundColor: 'transparent',
            height: 90,
            backgroundFocusedColor: '#FFA600',
            backgroundSelectedColor: '#FFA600',
            width: '49.5%'
        },
        seperatorOptions = {
            width: 1,
            backgroundColor: '#fff',
            height: 60,
            backgroundFocusedColor: '#FFA600',
            backgroundSelectedColor: '#FFA600'
        },
        // flag to fix bug container window being closed when click on cancel button location before displaying
        isReady = false;

    self.handler = _args.handler;
    self.parentWin = _args.parentWin;

    var cancelButton = Ti.UI.createButton(
        _.extend({title: L('cancel')},buttonOptions)
    ),
    doneButton = Ti.UI.createButton(
        _.extend({title: L('done')},buttonOptions)
    ),
    buttonSeperators = Ti.UI.createView(seperatorOptions);

    cancelButton.addEventListener('click', function (e) {
        if (self.parentWin && isReady) {
            self.parentWin.close();
        }
    });

    doneButton.addEventListener('click', function (e) {
        if (_.isFunction(self.handler) && isReady) {
            self.handler(e);
        }
    });

    self.add(cancelButton);
    self.add(buttonSeperators);
    self.add(doneButton);

    self.addEventListener('postlayout', function (e) {
        isReady = true;
    });

    return self;
}

module.exports = DoneCancelButtonBar;