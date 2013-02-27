//SearchView Component Constructor
function SearchView(_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        titaniumBarcode = require('com.mwaysolutions.barcode'),
        SearchBar = require('ui/components/SearchBar'),
        SavedSearchWindow = require('ui/common/SavedSearchWindow'),
        SearchService = require('business/services/SearchService'),
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
    }),
    cameraRow = Ti.UI.createTableViewRow({
        rightImage: '/images/camera.png',
        height: 90
    }),
    cameraLabel = Ti.UI.createLabel({
        text: L('snap'),
        color: '#000',
        left: 20
    }),
    speakRow = Ti.UI.createTableViewRow({
        rightImage: '/images/microphone.png',
        height: 90
    }),
    speakLabel = Ti.UI.createLabel({
        text: L('speak'),
        color: '#000',
        left: 20
    }),
    service = new SearchService();

    savedSearchRow.add(savedSearchLabel);
    scanRow.add(scanLabel);
    speakRow.add(speakLabel);
    cameraRow.add(cameraLabel);

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

    cameraRow.addEventListener('click', function (e) {
        var SelectPhotoDialog = require('ui/components/SelectPhotoDialog'),
            PhotoRecognitionAPI = require('lib/PhotoRecognitionAPI'),
            selectPhotoDialog = new SelectPhotoDialog({
                handler: function (e) {
                    PhotoRecognitionAPI.send(e.media).done(function (result) {
                        searchHandler({value: result});
                    });
                    imageTemp = image = null;
                }
            });

            selectPhotoDialog.show();
    });

    speakRow.addEventListener('click', function (e) {
        if (Ti.Platform.name == "android") {
            var speechModule = require('org.mumumu.ti.android.speech');
            var voiceRecognitionProxy = speechModule.createVoiceRecognition();
            var callback_func = function (e) {
                var voice_recognition_enabled = e.voice_enabled;
                var voice_results = e.voice_results;
                if (!e.voice_canceled) {
                    if (!voice_recognition_enabled) {
                        alert("Voice recognition seems to be disabled.");
                    } else if (voice_results[0]) {
                        searchHandler({value: voice_results[0]});
                    }
                }
            };
            voiceRecognitionProxy.voiceRecognition({
                "android.speech.extra.PROMPT": "please say something",
                "android.speech.extra.LANGUAGE_MODEL": "free_form",
                "callback": callback_func
            });
        }
    });

    searchBar.addSearchFieldEventListener('focus', function (e) {
        var currentValue = e.source.value;
        if (!currentValue) {
            searchAutocomplete.setData([scanRow, cameraRow, speakRow, savedSearchRow]);
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
            searchAutocomplete.setData([scanRow, cameraRow, speakRow, savedSearchRow]);
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
        service.get_suggestions({keyword: keyword}).done(function (result) {
            var rows = [];
            for (var i = 0, l=result.length; i < l; i++) {
                var row = Ti.UI.createTableViewRow({
                    height: 90,
                    title: result[i],
                    color: '#000'
                });
                row.addEventListener('click', searchHandler);
                rows.push(row);
            }
            searchAutocomplete.setData(rows);
        });
    }

    function searchHandler(e) {
        var keyword = e.rowData ? e.rowData.title : e.value;
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
