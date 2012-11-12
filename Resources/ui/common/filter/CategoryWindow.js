function CategoryWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        opts = _args,
        data = _args.data,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        top: 50,
        bottom: 50,
        width : theme.platformWidth - 100
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('category_text')},theme.styles.popup.header.label)),
    categoryTableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90,
        bottom : 0
    }),
    allRow = Ti.UI.createTableViewRow({
        height: 90
    }),
    allLabel = Ti.UI.createLabel({
        text: L('all'),
        left: 10,
        color: '#000',
        touchEnabled: false
    }),
    currentIndent = 10,
    label = null;

    allRow.add(allLabel);
    categoryTableView.appendRow(allRow);

    if (data.parent) {
        var parentRow = Ti.UI.createTableViewRow({
            height: 90
        });
        label = Ti.UI.createLabel({
            left: currentIndent,
            text: data.parent.name,
            color: '#000',
            touchEnabled: false
        });
        parentRow.add(label);
        categoryTableView.appendRow(parentRow);
        currentIndent += 40;
    }
    if (data.current) {
        var currentRow = Ti.UI.createTableViewRow({
            height: 90,
            rightImage: '/images/check.png',
            backgroundFocusedColor: '#fff',
            backgroundSelectedColor: '#fff',
            touchEnabled: false
        });
        label = Ti.UI.createLabel({
            left: currentIndent,
            text: data.current.name,
            color: '#C6C6C6',
            touchEnabled: false
        });
        currentRow.add(label);
        categoryTableView.appendRow(currentRow);
        currentIndent += 40;
    } else{
        allRow.backgroundFocusedColor = '#fff';
        allRow.backgroundSelectedColor = '#fff';
        allRow.rightImage = '/images/check.png';
        allRow.setTouchEnabled(false);
        allLabel.setColor('#C6C6C6');
    }
    if (data.children && data.children.length) {
        var dataArr = data.children,
            l = dataArr.length;
        for (var i = 0; i < l; ++i) {
            var row = Ti.UI.createTableViewRow({
                height: 90,
                className: 'categoryRow'
            });
            label = Ti.UI.createLabel({
                left: currentIndent,
                text: dataArr[i].name,
                color: '#000',
                touchEnabled: false
            });
            row.add(label);
            categoryTableView.appendRow(row);
        }
    }

    headerView.add(headerLabel);

    view.add(headerView);
    view.add(categoryTableView);
    self.add(view);

    categoryTableView.addEventListener('click', function (e) {
        
    });

    return self;
}

module.exports = CategoryWindow;