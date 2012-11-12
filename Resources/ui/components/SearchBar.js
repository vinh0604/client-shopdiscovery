function SearchBar(_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        defaults = {
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderColor: '#FFA600',
            borderWidth: 5,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
            height: 90,
            layout: 'horizontal',
            readOnly: false
        },
        opts = _.extend(defaults, _args),
        self = Ti.UI.createView(opts);

    self.addSearchFieldEventListener = function (event_name, handler) {
        searchField.addEventListener(event_name,handler);
    };

    self.removeSearchFieldEventListener = function (event_name, handler) {
        searchField.removeEventListener(event_name,handler);
    };

    self.setFocus = function () {
        searchField.focus();
        searchField.setSelection(0, searchField.value.length);
    };

    var searchIcon = Ti.UI.createImageView({
        backgroundImage: '/images/search_icon.png',
        width: 50,
        height: 50,
        left: 20
    }),
    searchField = Ti.UI.createTextField({
        height: opts.height,
        hintText: L('search'),
        opacity: 0,
        softKeyboardOnFocus: Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
        width: theme.platformWidth - 160,
        editable: !opts.readOnly,
        value: opts.keyword ? opts.keyword : ''
    }),
    cancelButton = Ti.UI.createButton({
        width: 50,
        height: 50,
        backgroundImage: '/images/cancel.png',
        visible: false
    });

    cancelButton.addEventListener('click', function (e) {
        searchField.setValue("");
    });

    searchField.addEventListener('change', function (e) {
        if (!searchField.value || !searchField.editable) {
            cancelButton.hide();
        } else {
            cancelButton.show();
        }
    });

    self.add(searchIcon);
    self.add(searchField);
    self.add(cancelButton);

    return self;
}

module.exports = SearchBar;