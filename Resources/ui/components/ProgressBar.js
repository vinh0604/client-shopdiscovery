var _ = require('lib/underscore'),
    theme = require('helpers/theme');

function ProgressBar (_args) {
    var defaultConfig = {
        touchEnabled: false,
        borderWidth: 1,
        borderColor: '#BABABA',
        width: '50%'
    },
    defaults = {
        backgroundColor: '#75C6FF',
        current: 0, 
        total: 0,
        text: L('claimed')
    },
    config = _.extend(defaultConfig, _args.config),
    opts = _.extend(defaults, _args),
    self = Ti.UI.createView(config),
    percent = (opts.current ? (opts.current * 100 / opts.total) : 0);
    progressView = Ti.UI.createView({
        touchEnabled: false,
        left: 0,
        backgroundColor: opts.backgroundColor,
        height: Ti.UI.FILL,
        width: percent + '%'
    }),
    label = Ti.UI.createLabel({
        touchEnabled: false,
        zIndex: 1,
        font: {fontSize: 20},
        color: '#000',
        text: opts.current + ' / ' + opts.total + ' ' + opts.text
    });

    self.add(progressView);
    self.add(label);

    return self;
}

module.exports = ProgressBar;