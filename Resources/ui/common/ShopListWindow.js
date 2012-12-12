function ShopListWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ShopService = require('business/services/ShopService'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        ShopRow = require('ui/components/tablerow/ShopRow'),
        controller = _args.controller,
        opts = _args,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('shops')},theme.styles.header.label)),
    shopTableView = new InfiniteScrollTableView({
        config: {top: 180, left: 0, right: 0, bottom: 0},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    searchBar = Ti.UI.createSearchBar({
        top: 90,
        left: 0,
        right: 0,
        hintText: L('search'),
        visible: false,
        showCancel: true,
        height: 90
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    shopService = new ShopService(),
    params = {page: 1, per_page: 30};

    headerView.add(headerLabel);

    self.add(headerView);
    self.add(searchBar);
    self.add(shopTableView);

    shopTableView.addEventListener('click', function (e) {
        // if (Ti.Platform.name === 'android') {
        //     searchBar.blur();
        //     searchBar.hide();
        //     searchBar.show();
        // }
        var ShopWindow = require('ui/common/ShopWindow'),
            shopWindow = new ShopWindow({controller: controller, data: {id: e.rowData['_id']}});
        shopWindow.open();
    });

    searchBar.addEventListener('cancel', function (e) {
        if (Ti.Platform.name === 'android') {
            if (searchBar.value) {
                searchBar.value = "";
                searchHandler({value: ""});
            }
        }
    });
    searchBar.addEventListener('return', searchHandler);

    self.addEventListener('open', function (e) {
        controller.register(self);
        setTimeout(function(e){
            searchBar.show();
        },100);
        activityIndicator.show();
        fetchData().then(function (result) {
            activityIndicator.hide();
            return result;
        }).then(appendData);

        // {id: 1, name: 'Sample Shop', photo: '/images/shop.png', address: 'Số 12, Đường Nguyễn Đình Chiểu, Quận 3, Thành phố Hồ Chí Minh', rating: 4, rating_count: 300, tags: ['điện thoại', 'máy tính bảng', 'phụ kiện']}
    });

    function searchHandler (e) {
        params.keyword = e.value.toLowerCase();
        params.page = 1;
        shopTableView.setData([]);
        shopTableView.stopUpdate = false;
        fetchData().then(appendData);
    }

    function fetchData () {
        var deferred = shopService.all(params);
        return deferred;
    }

    function appendData (result) {
        if (result.error) {
            alert(result.error);
        } else {
            ++ params.page;
            for (var i = 0, l = result.rows.length; i < l; ++i) {
                var row = new ShopRow({ data: result.rows[i] });
                shopTableView.appendRow(row);
            }
            if (shopTableView.data[0].rowCount >= result.total) {
                shopTableView.stopUpdate = true;
            }
        }
    }

    return self;
}

module.exports = ShopListWindow;