function SelectPhotoDialog (_args) {
    var _ = require('lib/underscore'),
        opts = _args,
        self = Ti.UI.createOptionDialog({
            title: L('select_photo_from'),
            options: [L('gallery'),L('camera')]
        });

    self.addEventListener('click', function (e) {
        if (e.index == 1) {
            Titanium.Media.showCamera({
                success:function(e) {
                    opts.handler(e);                    
                },
                cancel:function() {
                    self.hide();
                },
                error:function(error) {
                    var a = Titanium.UI.createAlertDialog({title:L('camera')});
                    if (error.code == Titanium.Media.NO_CAMERA) {
                        a.setMessage(L('no_camera'));
                    } else {
                        a.setMessage(String.format(L('error'),error.code));
                    }
                    a.show();
                },
                saveToPhotoGallery:true,
                allowEditing:true,
                mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
            });
        } else if (!e.index) {
            Titanium.Media.openPhotoGallery({
                success:function(e) {
                    opts.handler(e);                    
                },
                cancel:function() {
                    self.hide();
                },
                error:function(error) {
                    var a = Titanium.UI.createAlertDialog({title:L('camera')});
                    a.setMessage(String.format(L('error'),error.code));
                    a.show();
                },
                allowEditing:false,
                mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
            });
        }
    });

    return self;
}

module.exports = SelectPhotoDialog;