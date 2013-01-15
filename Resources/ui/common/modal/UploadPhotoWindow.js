function UploadPhotoWindow (_args) {
    var _ = require('lib/underscore'),
        api = require('network/ShopDiscoveryAPI'),
        DB = require('business/database'),
        theme = require('helpers/theme'),
        opts = _args,
        self = Ti.UI.createWindow({
            navBarHidden: true,
            backgroundColor: '#40000000'
        });

    var view = Ti.UI.createView({
        backgroundColor : '#fff',
        borderColor : '#A5A5A5',
        borderWidth : 2,
        layout: 'vertical',
        width : theme.platformWidth - 100,
        height : Ti.UI.SIZE
    }),
    headerView = Ti.UI.createView(theme.styles.popup.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('upload_photo')},theme.styles.popup.header.label)),
    progressBar = Titanium.UI.createProgressBar({
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        height:'auto',
        min:0,
        max:1,
        value:0,
        color:'#fff',
        message: L('uploading'),
        font:{fontSize:30, fontWeight:'bold'}
    }),
    cancelButton = Ti.UI.createButton({
        top: 10,
        bottom: 10,
        width: 250,
        title: L('cancel')
    });
    xhr = null;

    headerView.add(headerLabel);
    view.add(headerView);
    view.add(progressBar);
    view.add(cancelButton);
    self.add(view);

    cancelButton.addEventListener('click', function (e) {
        if (xhr) {
            xhr.abort();
        }
        self.close();
    });

    self.addEventListener('open', function (e) {
        var url = api.API_URL + 'photos',
            xhr = Ti.Network.createHTTPClient({});
        xhr.onload = function () {
            var json = JSON.parse(this.responseText);
            if (this.status == 200 || this.status == 201) {
                var url = api.HOST + json.image.url;
                self.close();
                opts.handler({id: json.id, url: url});
            } else {
                alert(json);
            }
        };
        xhr.onerror = function (e) {
            if (this.status) {
                var json;
                try {
                    json = JSON.parse(this.responseText);
                } catch(ex) {
                    json = this.responseText;
                }
                alert(json);
            } else {
                alert(e.error);
            }
        };
        xhr.onsendstream = function (e) {
            progressBar.value = e.progress;
        };
        xhr.open('POST', url);
        xhr.send({
            auth_token: DB.getAuthToken(),
            image: opts.media
        });
    });

    return self;
}

module.exports = UploadPhotoWindow;