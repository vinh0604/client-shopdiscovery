function SortDialog (_args) {
    var $$ = require('helpers/utility'),
        self = this;

    self.handler = _args.handler;
    self.params = _args.params;

    self.optionDialog = Ti.UI.createOptionDialog({
        title: L('sort'),
        options: [L('relevance'),L('popular'),L('price_low_sort'),L('price_high_sort'),L('distance_sort'),L('review_sort')]
    });

    self.optionDialog.addEventListener('click', function (e) {
        if (self.handler && e.index != self.optionDialog.selectedIndex) {
            handler($$.combine(self.params, {sort: e.index}));
        }
    });
}
SortDialog.prototype.open = function () {
    this.optionDialog.show();
};

module.exports = SortDialog;