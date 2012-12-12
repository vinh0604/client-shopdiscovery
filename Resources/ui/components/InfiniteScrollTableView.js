function InfiniteScrollTableView (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        defaults = {
            left: 0,
            right: 0,
            data: []
        },
        opts = _.extend(defaults, _args.config),
        self = Ti.UI.createTableView(opts),
        loadingRow = Ti.UI.createTableViewRow({
            height: 45
        }),
        loadingImageView = Ti.UI.createImageView({
            images: ['/images/loading/loading-00.png',
                    '/images/loading/loading-04.png',
                    '/images/loading/loading-08.png',
                    '/images/loading/loading-12.png',
                    '/images/loading/loading-16.png',
                    '/images/loading/loading-20.png',
                    '/images/loading/loading-24.png',
                    '/images/loading/loading-28.png',
                    '/images/loading/loading-32.png',
                    '/images/loading/loading-36.png',
                    '/images/loading/loading-40.png',
                    '/images/loading/loading-44.png'],
            height: 45,
            width: 45,
            duration: 75
        });

    loadingRow.add(loadingImageView);

    self.stopUpdate = false;
    self.fetchDataFunc = _args.fetchDataFunc;
    self.appendDataFunc = _args.appendDataFunc;

    var updating = false,
        loadingRowIndex = 0,
        lastDistance = 0,
        bufferRow = 3;

    self.addEventListener('scroll', function (e) {
        if (!self.stopUpdate) {
            if(Ti.Platform.osname == 'iphone'){
                var offset = e.contentOffset.y,
                    height = e.size.height,
                    total = offset + height,
                    theEnd = e.contentSize.height,
                    distance = theEnd - total;

                if (distance < lastDistance){
                    var nearEnd = theEnd * 0.75;

                    if (!updating && (total >= nearEnd))
                    {
                        startUpdate();
                    }
                }
                lastDistance = distance;
            }
            if(Ti.Platform.osname == 'android'){
                if(!updating && (e.firstVisibleItem+e.visibleItemCount+bufferRow) >= e.totalItemCount){
                    startUpdate();
                }
            }
        }
    });

    function startUpdate () {
        updating = true;
        loadingRowIndex = self.data[0].rows.length;
        self.appendRow(loadingRow);
        loadingImageView.start();

        self.fetchDataFunc().then(endUpdate).then(self.appendDataFunc);
    }

    function endUpdate (result) {
        updating = false;
        self.deleteRow(loadingRowIndex, {});

        return result;
    }

    return self;
}

module.exports = InfiniteScrollTableView;