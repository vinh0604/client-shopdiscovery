//SearchView Component Constructor
function SearchView(_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        titaniumBarcode = require('com.mwaysolutions.barcode'),
        SearchBar = require('ui/components/SearchBar'),
        SavedSearchWindow = require('ui/common/SavedSearchWindow'),
        defaults = {backgroundColor:'#ffffff'},
        opts = _.extend(defaults, _args),
        params = opts.params,
        controller = _args.controller,
        self = Ti.UI.createView(_.extend({layout: 'vertical', backgroundColor: '#fff'},theme.styles.stretch));

    self.setFocus = function () {
        searchBar.setFocus();
    };

    var searchBar = new SearchBar({keyword: params.keyword}),
    searchAutocomplete = Ti.UI.createTableView({
        visible: false,
        left: 0,
        right: 0
    }),
    savedSearchRow = Ti.UI.createTableViewRow(theme.styles.hasChildrenRow),
    savedSearchLabel = Ti.UI.createLabel({
        text: L('search_history'),
        color: '#000',
        left: 20
    }),
    scanRow = Ti.UI.createTableViewRow({
        rightImage: '/images/barcode.png',
        height: 90
    }),
    scanLabel = Ti.UI.createLabel({
        text: L('scan'),
        color: '#000',
        left: 20
    });

    savedSearchRow.add(savedSearchLabel);
    scanRow.add(scanLabel);

    savedSearchRow.addEventListener('click', function (e) {
        var savedSearchWindow = new SavedSearchWindow({controller: controller});
        savedSearchWindow.open();
    });

    scanRow.addEventListener('click', function (e) {
        titaniumBarcode.scan({
            success: function (data) {
                if (data && data.barcode) {
                    var value = 'EAN:'+data.barcode;
                    searchHandler({value: value});
                }
            },
            error: function (err) {
                alert(err);
            },
            cancel: function () {}
        });
    });

    searchBar.addSearchFieldEventListener('focus', function (e) {
        var currentValue = e.source.value;
        if (!currentValue) {
            searchAutocomplete.setData([scanRow, savedSearchRow]);
        } else{
            searchAutocomplete.setData([]);
        }
        searchAutocomplete.show();
    });

    searchBar.addSearchFieldEventListener('blur', function (e) {
        searchAutocomplete.hide();
    });

    var last_search = null;
    var autocomplete_timer = null;
    searchBar.addSearchFieldEventListener('change', function (e) {
        var currentValue = e.source.value.trim();

        if (!currentValue) {
            searchAutocomplete.setData([scanRow, savedSearchRow]);
        } else if (currentValue.length <= 2) {
            searchAutocomplete.setData([]);
        } else if (currentValue !=  last_search) {
            if (autocomplete_timer) {
                clearTimeout(autocomplete_timer);
            }
            
            autocomplete_timer = setTimeout(function()
            {
                last_search = currentValue;
                autoComplete(currentValue);
            }, 300);
        }
        return false;
    });

    searchBar.addSearchFieldEventListener('return', searchHandler);

    self.add(searchBar);
    self.add(searchAutocomplete);

    function autoComplete (keyword) {
        var result = [],
            table_data = [];

        for (var i = 0, l=result.length; i < l; i++) {
            var row = Ti.UI.createTableViewRow({
                height: 90,
                title: result[i],
                color: '#000'
            });
            row.addEventListener('click', searchHandler);
            table_data.push(row);
        }

        searchAutocomplete.setData(table_data);
    }

    function searchHandler(e) {
        var keyword = e.row ? e.row.title : e.value;
        if (keyword) {
            params.keyword = keyword;
            params.page = 1;
            var SearchResultWindow = require('ui/common/SearchResultWindow'),
                searchResultWindow = new SearchResultWindow({params: params, controller: controller});
            controller.home();
            searchResultWindow.open();
        }
    }

    return self;
}

module.exports = SearchView;
