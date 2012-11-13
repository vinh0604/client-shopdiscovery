function MyShopWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        MyShopRow = require('ui/components/tablerow/MyShopRow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('my_shops')},theme.styles.header.label)),
    myShopTableView = Ti.UI.createTableView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90
    }),
    newShopButton = Ti.UI.createButton({
        bottom: 0,
        height: 90,
        left: 0,
        right: 0,
        title: L('new_shop')
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(myShopTableView);
    self.add(newShopButton);

    self.addEventListener('open', function (e) {
        controller.register(self);

        var data = [
            {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']},
            {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']},
            {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']},
            {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']},
            {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']},
            {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']}
        ];

        for (var i = 0, l = data.length; i < l; ++i) {
            var row = new MyShopRow({data: data[i], deleteHandler: deleteHandler});
            myShopTableView.appendRow(row);
        }
    });

    function deleteHandler (e) {
        
    }

    return self;
}

module.exports = MyShopWindow;