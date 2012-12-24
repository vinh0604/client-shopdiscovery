function CategoryWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        CategoryService = require('business/services/CategoryService'),
        opts = _args,
        params = _args.params,
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
    service = new CategoryService();

    if (!params.category){
        allRow.backgroundFocusedColor = '#fff';
        allRow.backgroundSelectedColor = '#fff';
        allRow.rightImage = '/images/check.png';
        allRow.setTouchEnabled(false);
        allLabel.setColor('#C6C6C6');
    }

    allRow.add(allLabel);
    categoryTableView.appendRow(allRow);
    headerView.add(headerLabel);
    view.add(headerView);
    view.add(categoryTableView);
    self.add(view);

    self.addEventListener('click', function (e) {
        if (e.source == self) {
            self.close();
        }
    });

    self.addEventListener('open', function (e) {
        service.list(params).done(function (result) {
            setCategoryData(result);
            categoryTableView.addEventListener('click', function (e) {
                if (e.rowData) {
                    params.category = e.rowData._id;
                    self.close();
                }
            });
        }).fail(function (e) {
            alert(e.error);
        });
    });

    function setCategoryData (data) {
        var currentIndent = 10,
            label = null;
        if (data.parent) {
            var parentRow = Ti.UI.createTableViewRow({
                _id: data.parent.id,
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
        if (data.category) {
            var currentRow = Ti.UI.createTableViewRow({
                _id: data.category.id,
                height: 90,
                rightImage: '/images/check.png',
                backgroundFocusedColor: '#fff',
                backgroundSelectedColor: '#fff',
                touchEnabled: false
            });
            label = Ti.UI.createLabel({
                left: currentIndent,
                text: data.category.name,
                color: '#C6C6C6',
                touchEnabled: false
            });
            currentRow.add(label);
            categoryTableView.appendRow(currentRow);
            currentIndent += 40;
        }
        if (data.children) {
            var children = data.children;
            for (var i = 0, l = children.length; i < l; ++i) {
                var row = Ti.UI.createTableViewRow({
                    _id: children[i].id,
                    height: 90,
                    className: 'categoryRow'
                });
                label = Ti.UI.createLabel({
                    left: currentIndent,
                    text: children[i].name,
                    color: '#000',
                    touchEnabled: false
                });
                row.add(label);
                categoryTableView.appendRow(row);
            }
        }
    }

    return self;
}

module.exports = CategoryWindow;