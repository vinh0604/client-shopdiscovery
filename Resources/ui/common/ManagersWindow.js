function ManagersWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        ManagerService = require('business/services/ManagerService'),
        ManagerRow = require('ui/components/tablerow/ManagerRow'),
        item = _args.data,
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('login')},theme.styles.header.label)),
    tableView = Ti.UI.createTableView({
        left: 0,
        right: 0,
        top: 90,
        bottom: 90
    }),
    bottomView = Ti.UI.createView({
        bottom: 0,
        left: 0,
        right: 0,
        height: 90
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    service = new LoginService({});

    self.addEventListener('open', function (e) {
        controller.register(self);
        activityIndicator.show();
        service.shop(item.id).done(function (result) {
            activityIndicator.hide();
        }).fail(function (e) {
            alert(e.error);
            activityIndicator.hide();
        });
    });

    return self;
}

module.exports = ManagersWindow;