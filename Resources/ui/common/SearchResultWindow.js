function SearchResultWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SearchService = require('business/services/SearchService'),
        SearchBar = require('ui/components/SearchBar'),
        SortDialog = require('ui/common/SortDialog'),
        FilterWindow = require('ui/common/FilterWindow'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        ProductRow = require('ui/components/tablerow/ProductRow'),
        SearchWindow = require('ui/common/SearchWindow'),
        opts = _args,
        controller = _args.controller,
        params = _args.params,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );

    var searchBar = new SearchBar({readOnly: true, keyword: params.keyword}),
    resultTableView = new InfiniteScrollTableView({
        config: {top: 140,bottom: 90},
        fetchDataFunc: fetchData,
        appendDataFunc: appendData
    }),
    resultHeaderView = Ti.UI.createView({
        backgroundColor: '#000',
        height: 50,
        top: 90,
        left: 0,
        width: '100%'
    }),
    totalLabel = Ti.UI.createLabel({
        color: '#fff',
        left: 10,
        text: ''
    }),
    customButtonBar = new CustomButtonBar({
        buttons: [L('sort'),L('refine')],
        handler: sortFilterHandler
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('loading')
    }),
    searchService = new SearchService();

    // {photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '6500000', price_unit: 'VND', status: 'New', distance: '5', rating: 3, rating_count: 2},
    resultHeaderView.add(totalLabel);

    self.add(searchBar);
    self.add(resultHeaderView);
    self.add(resultTableView);
    self.add(customButtonBar);

    searchBar.addEventListener('click', function (e) {
        searchWin = new SearchWindow({params: params, controller: controller});
        searchWin.open();
    });

    resultTableView.addEventListener('click', function (e) {
        if (e.rowData) {
            var ProductWindow = require('ui/common/ProductWindow'),
                productWindow = new ProductWindow({
                    controller: controller,
                    data: {id: e.rowData._id}
                });
            productWindow.open();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        resultTableView.setData([]);

        (function () {
            var DB = require('business/database');
            DB.updateSearchHistory(params.keyword);
        })();

        activityIndicator.show();
        fetchData().done(function (result) {
            activityIndicator.hide();
            totalLabel.setText(String.format(L('found'),result.total));
            return result;
        }).done(appendData).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    });

    function sortFilterHandler (e) {
        if (e.index) {
            var filterWindow = new FilterWindow({params: params});
            filterWindow.open();
            filterWindow.addEventListener('filter:select', searchResetHandler);
        } else {
            var sortDialog = new SortDialog({params: params});
            sortDialog.show();
            sortDialog.addEventListener('sort:select', searchResetHandler);
        }
    }

    function fetchData () {
        var deferred = searchService.search(params);
        return deferred;
    }

    function appendData (result) {
        ++ params.page;
        for (var i = 0, l = result.rows.length; i < l; ++i) {
            var row = new ProductRow({ data: result.rows[i] });
            resultTableView.appendRow(row);
        }
        if (!result.total || resultTableView.data[0].rowCount >= result.total) {
            resultTableView.stopUpdate = true;
        }
    }

    function searchResetHandler (e) {
        params.page = 1;
        resultTableView.setData([]);
        resultTableView.stopUpdate = false;
        activityIndicator.show();
        fetchData().done(function (result) {
            activityIndicator.hide();
            totalLabel.setText(String.format(L('found'),result.total));
            return result;
        }).done(appendData).fail(function (e) {
            activityIndicator.hide();
            alert(e.error);
        });
    }

    return self;
}

module.exports = SearchResultWindow;