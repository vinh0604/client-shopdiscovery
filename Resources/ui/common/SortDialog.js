function SortDialog (_args) {
    var _ = require('lib/underscore'),
        APP_CONST = require('business/constants'),
        params = _args.params,
        opts = {
            title: L('sort'),
            options: [L('relevance'),L('price_low_sort'),L('price_high_sort'),L('distance_sort'),L('review_sort')]
        };

    if (params.sort) {
        var sort_type = _(APP_CONST.DATA.SORT_TYPE_ARRAY).find( function(st) {
          return st.code == params.sort;
        });
        if (sort_type) {
            opts.selectedIndex = opts.options.indexOf(sort_type.value);
        }
    }

    var self = Ti.UI.createOptionDialog(opts);

    self.addEventListener('click', function (e) {
        if (e.index >= 0) {
            params.sort = _(APP_CONST.DATA.SORT_TYPE_ARRAY).find( function(st) {
              return st.value == self.options[e.index];
            }).code;
            self.fireEvent('sort:select');
        }
    });

    return self;
}

module.exports = SortDialog;