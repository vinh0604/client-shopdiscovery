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
        exitFlag = false,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));
    
    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('shop_discovery')},theme.styles.header.label)),
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

    headerView.add(headerLabel);

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
    messageRow.addEventListener('click', function (e) {
        MessageWindow = require('ui/common/MessageWindow'),
            messageWindow = new MessageWindow({controller: controller});
        messageWindow.open();
    });
    dealRow.addEventListener('click', function (e) {
        PromotionWindow = require('ui/common/PromotionWindow'),
            promotionWindow = new PromotionWindow({controller: controller});
        promotionWindow.open();
    });

    self.addEventListener('new:recheck', checkMessageNotification);

    self.addEventListener('android:back', function (e) {
        if (exitFlag) {
            self.close();
            controller.backgroundWindow.close();
        } else {
            var toast = Ti.UI.createNotification({
                duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
                message: L('press_back_exit')
            });
            toast.show();
            exitFlag = true;
            setTimeout(function () {
                exitFlag = false;
            }, 5000);
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        checkMessageNotification(e);
    });

    function checkMessageNotification (e) {
        var NotificationService = require('business/services/NotificationService'),
            notificationService = new NotificationService(),
            MessageService = require('business/services/MessageService'),
            messageService = new MessageService();

        _.when(notificationService.check(), messageService.check()).done(function (notificationResult, messageResult) {
            notificationIndicatorLabel.text = notificationResult.count;
            messageIndicatorLabel.text = messageResult.count;
            featureTableView.setData([notificationRow,messageRow,browseCategoryRow,browseShopRow,favoriteShopRow,wishListRow,dealRow]);
        });
    }

    return self;
}

module.exports = MainWindow;