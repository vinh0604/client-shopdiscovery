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
        config = _.extend(defaults, _args.config);

    var self = Ti.UI.createView(config),
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
        _.defaults({title: L('cancel')},buttonOptions)
    ),
    doneButton = Ti.UI.createButton(
        _.defaults({title: L('done'), color: 'gray', enabled: false},buttonOptions)
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

    if (!_args.disabled) {
        self.enableButton();
    }

    self.add(cancelButton);
    self.add(buttonSeperators);
    self.add(doneButton);

    self.addEventListener('postlayout', function (e) {
        isReady = true;
    });

    self.enableButton = function () {
        doneButton.enabled = true;
        doneButton.color = '#fff';
    };

    return self;
}

module.exports = DoneCancelButtonBar;