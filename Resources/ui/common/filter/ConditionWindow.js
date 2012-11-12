function ConditionWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        opts = _args,
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
        top: 90,
        data: [
            {title: L('all'), height: 90, color: '#000'},
            {title: L('new_label'), height: 90, color: '#000'},
            {title: L('used'), height: 90, color: '#000'},
            {title: L('not_specified'), height: 90, color: '#000'}
        ]
    });

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(conditionTableView);
    self.add(view);

    return self;
}

module.exports = ConditionWindow;