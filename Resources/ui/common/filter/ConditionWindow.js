function ConditionWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        opts = _args,
        params = _args.params,
        conditions = [
            {title: L('all'), height: 90, color: '#000', _condition: null},
            {title: L('new_label'), height: 90, color: '#000', _condition: 1},
            {title: L('used'), height: 90, color: '#000', _condition: 2},
            {title: L('not_specified'), height: 90, color: '#000', _condition: 0}
        ],
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
    headerLabel = Ti.UI.createLabel(_.extend({text: L('condition')},theme.styles.popup.header.label)),
    conditionTableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(conditionTableView);
    self.add(view);

    conditionTableView.addEventListener('click', function (e) {
        if (e.rowData) {
            params.condition = e.rowData._condition;
            self.close();
        }
    });

    self.addEventListener('click', function (e) {
        if (e.source == self) {
            self.close();
        }
    });

    self.addEventListener('open', function (e) {
        if (_(params.condition).isNull() || _(params.condition).isUndefined()) {
            conditions[0].rightImage = '/images/check.png';
        } else {
            _(conditions).find( function(c) {
                return c._condition == params.condition;
            }).rightImage = '/images/check.png';
        }
        conditionTableView.setData(conditions);
    });

    return self;
}

module.exports = ConditionWindow;