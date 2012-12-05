function CustomButtonBar (_args) {
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
            backgroundSelectedColor: '#FFA600'
        },
        seperatorOptions = {
            width: 1,
            backgroundColor: '#fff',
            height: 60
        },
        isReady = false;

    self.buttonTitles = _args.buttons;
    self.handler = _args.handler;
    self.buttons = [];

    for (var i = 0, l = self.buttonTitles.length, w = (99/l) + '%'; i < l; ++i) {
        var button = Ti.UI.createButton(_.extend({width: w ,title: self.buttonTitles[i]},buttonOptions));

        button.addEventListener('click', clickHandler);
        self.add(button);
        self.buttons.push(button);
        if (i < l - 1) {
            var seperator = Ti.UI.createView(seperatorOptions);
            self.add(seperator);
        }
    }

    function clickHandler (e) {
        if (_.isFunction(self.handler) && isReady) {
            e.index = _.indexOf(self.buttons, e.source);
            self.handler(e);
        }
    }

    self.addEventListener('postlayout', function (e) {
        isReady = true;
    });

    self.enableButton = function (index, enabled) {
        self.buttons[index].enabled = !!enabled;
        self.buttons[index].color = enabled ? '#fff' : 'gray';
    };

    return self;
}

module.exports = CustomButtonBar;