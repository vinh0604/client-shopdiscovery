function DatePickerDialog (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        moment = require('lib/moment'),
        defaults = {
            type:Ti.UI.PICKER_TYPE_DATE
        },
        opts = _args,
        config = _.extend(defaults, _args.config);

    var picker =  Ti.UI.createPicker(config);

    var self = Ti.UI.createAlertDialog({
        ok: L('done'),
        androidView: picker,
        title: L('select_date')
    });

    var value = config.value;
    picker.addEventListener('change', function (e) {
        value = e.value;
    });

    self.addEventListener('click', function (e) {
        if (e.index >= 0) {
            var event = {
                result: value
            };

            opts.handler(event);
        }
    });

    return self;
}

module.exports = DatePickerDialog;