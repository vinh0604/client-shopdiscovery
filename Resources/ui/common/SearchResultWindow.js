function SearchResultWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SearchBar = require('ui/components/SearchBar'),
        SortDialog = require('ui/common/SortDialog'),
        FilterWindow = require('ui/common/FilterWindow'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        InfiniteScrollTableView = require('ui/components/InfiniteScrollTableView'),
        ProductRow = require('ui/components/tablerow/ProductRow'),
        SearchWindow = require('ui/common/SearchWindow'),
        controller = _args.controller,
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    _.mixin( require('lib/underscore.deferred') );
    self.keyword = _args.keyword;

    var searchBar = new SearchBar({readOnly: true, keyword: self.keyword}),
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
        width: theme.platformWidth
    }),
    totalLabel = Ti.UI.createLabel({
        color: '#fff',
        left: 10
    }),
    customButtonBar = new CustomButtonBar({
        buttons: [L('sort'),L('refine')],
        handler: sortFilterHandler,
        width: theme.platformWidth
    });

    var sample_data = [
        {photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '6500000', price_unit: 'VND', status: 'New', distance: '5', rating: 3, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '6400000', price_unit: 'VND', status: 'New', distance: '7', rating: 3.5, rating_count: 5},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4500000', price_unit: 'VND', status: 'Used', distance: '3', rating: 2.5, rating_count: 10},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '4700000', price_unit: 'VND', status: 'Used', distance: '0.7', rating: 4, rating_count: 2},
        { photo:'/images/Phone.png', name: 'Sample Mobile Phone', category: 'Smartphone', shop: 'Mobile World', price: '6800000', price_unit: 'VND', status: 'New', distance: '2', rating: 4.5, rating_count: 1}
    ],
    numRowPerLoad = 5,
    tableRows = [],
    row = null;

    for (var i = 0; i < numRowPerLoad; ++i) {
        row = new ProductRow({
            data: sample_data[i]
        });

        tableRows.push(row);
    }

    var lastDataIndex = numRowPerLoad;

    resultTableView.setData(tableRows);

    totalLabel.setText(String.format(L('found'),sample_data.length));
    resultHeaderView.add(totalLabel);

    self.add(searchBar);
    self.add(resultHeaderView);
    self.add(resultTableView);
    self.add(customButtonBar);

    searchBar.addEventListener('click', function (e) {
        searchWin = new SearchWindow({keyword: self.keyword, controller: controller});
        searchWin.open();
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
    });

    function sortFilterHandler (e) {
        if (e.index) {
            var filterWindow = new FilterWindow({});
            filterWindow.open();
        } else {
            var sortDialog = new SortDialog({});
            sortDialog.open();
        }
    }

    function fetchData () {
        var deferred = new _.Deferred();

        setTimeout(function () {
            var result = [],
                i = lastDataIndex,
                l = lastDataIndex + numRowPerLoad;
            for (; i < l && i < sample_data.length; ++i) {
                result.push(sample_data[i]);
            }
            lastDataIndex = i;

            deferred.resolve(result);
        }, 2000);
        
        return deferred;
    }

    function appendData (result) {
        Ti.API.log(result);
        for (var i = 0, l = result.length; i < l; ++i) {
            var row = new ProductRow({
                data: result[i]
            });

            resultTableView.appendRow(row);
        }
    }

    return self;
}

module.exports = SearchResultWindow;