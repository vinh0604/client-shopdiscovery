function MainWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SearchBar = require('ui/components/SearchBar'),
        SearchWindow = require('ui/common/SearchWindow'),
        controller = _args.controller,
        indicatorProperties = {
            right: 10,
            color: '#fff',
            font: {fontWeight: 'bold', fontSize: 30},
            backgroundColor: '#4D8EFF',
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            height: 45,
            width: 75,
            borderRadius: 15,
            touchEnabled: false
        },
        labelProperties = {
            color: '#666',
            left: 5
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));
    
    var headerView = Ti.UI.createView(theme.styles.header.view),
    searchBar = new SearchBar({readOnly: true, top: 90}),
    featureTableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 180,
        bottom: 0
    }),
    notificationRow = Ti.UI.createTableViewRow({
        height: 125,
        leftImage: '/images/notification.png'
    }),
    notificationIndicatorLabel = Ti.UI.createLabel(indicatorProperties),
    notificationLabel = Ti.UI.createLabel(_.extend({text: L('notification')},labelProperties)),
    messageRow = Ti.UI.createTableViewRow({
        height: 125,
        leftImage: '/images/mail.png'
    }),
    messageIndicatorLabel = Ti.UI.createLabel(indicatorProperties),
    messageLabel = Ti.UI.createLabel(_.extend({text: L('message')},labelProperties)),
    browseCategoryRow = Ti.UI.createTableViewRow({
        height: 125,
        title: L('browse_category'),
        color: '#666',
        leftImage: '/images/list.png'
    }),
    browseShopRow = Ti.UI.createTableViewRow({
        height: 125,
        title: L('browse_shop'),
        color: '#666',
        leftImage: '/images/shop.png'
    }),
    favoriteShopRow = Ti.UI.createTableViewRow({
        height: 125,
        title: L('favorite_shop'),
        color: '#666',
        leftImage: '/images/favorites.png'
    }),
    wishListRow = Ti.UI.createTableViewRow({
        height: 125,
        title: L('wish_list'),
        color: '#666',
        leftImage: '/images/heart.png'
    }),
    dealRow = Ti.UI.createTableViewRow({
        height: 125,
        title: L('deal'),
        color: '#666',
        leftImage: '/images/sale.png'
    });

    notificationRow.add(notificationLabel);
    messageRow.add(messageLabel);
    featureTableView.setData([notificationRow,messageRow,browseCategoryRow,browseShopRow,favoriteShopRow,wishListRow,dealRow]);

    self.add(headerView);
    self.add(searchBar);
    self.add(featureTableView);

    // mock indicator
    notificationIndicatorLabel.text = '0';
    messageIndicatorLabel.text = '0';
    notificationRow.add(notificationIndicatorLabel);
    messageRow.add(messageIndicatorLabel);
    // end mock

    searchBar.addEventListener('click', function (e) {
        var params = {page:1, per_page:30, keyword:''};
        if (Ti.Geolocation.locationServicesEnabled) {
            Ti.Geolocation.purpose = 'Get Current Location';
            Ti.Geolocation.getCurrentPosition(function(e) {
                if (!e.error) {
                    params.location = 'POINT('+e.coords.longitude+' '+e.coords.latitude+')';
                }
                searchWin = new SearchWindow({
                    controller: controller,
                    params: params
                });
                searchWin.open();
            });
        }
    });
    browseShopRow.addEventListener('click', function (e) {
        var ShopListWindow = require('ui/common/ShopListWindow'),
            shopListWindow = new ShopListWindow({controller: controller});
        shopListWindow.open();
    });
    browseCategoryRow.addEventListener('click', function (e) {
        CategoryListWindow = require('ui/common/CategoryListWindow'),
            categoryListWindow = new CategoryListWindow({controller: controller});
        categoryListWindow.open();
    });
    favoriteShopRow.addEventListener('click', function (e) {
        FavoriteShopsWindow = require('ui/common/FavoriteShopsWindow'),
            favoriteShopsWindow = new FavoriteShopsWindow({controller: controller});
        favoriteShopsWindow.open();
    });
    wishListRow.addEventListener('click', function (e) {
        WishListWindow = require('ui/common/WishListWindow'),
            wishListWindow = new WishListWindow({controller: controller});
        wishListWindow.open();
    });
    notificationRow.addEventListener('click', function (e) {
        NotificationWindow = require('ui/common/NotificationWindow'),
            notificationWindow = new NotificationWindow({controller: controller});
        notificationWindow.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        checkMessageNotification(e);
    });

    function checkMessageNotification (e) {
        var NotificationService = require('business/services/NotificationService'),
            notificationService = new NotificationService();

        notificationService.check().done(function (result) {
            notificationIndicatorLabel.text = result.count;
        });
    }

    return self;
}

module.exports = MainWindow;