function ShopListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ShopRow = require('ui/components/ShopRow'),
        controller = _args.controller,
        opts = _args,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('shops')},theme.styles.header.label)),
    shopTableView = Ti.UI.createTableView({
        top: 180,
        left: 0,
        right: 0,
        bottom: 0
    }),
    searchBar = Ti.UI.createSearchBar({
        top: 90,
        left: 0,
        right: 0,
        hintText: L('search'),
        visible: false,
        showCancel: true,
        height: 90
    });

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(searchBar);
    self.add(shopTableView);

    shopTableView.addEventListener('click', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.blur();
            searchBar.hide();
            searchBar.show();
        }
    });

    searchBar.addEventListener('cancel', function (e) {
        if (Ti.Platform.name === 'android') {
            searchBar.value = "";
        }
    });
    searchBar.addEventListener('return', searchHandler);

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
            var row = new ShopRow({data: data[i]});
            shopTableView.appendRow(row);
        }

        setTimeout(function(e){
            searchBar.show();
        },200);
    });

    function searchHandler (e) {
        
    }

    return self;
}

module.exports = ShopListWindow;