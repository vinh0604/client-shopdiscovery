function ContactView (_args) {
    var _ = require('lib/underscore'),
    item = _args.data,
    defaults = {
        left: 0, right: 0, layout: 'vertical'
    };

    var self = Ti.UI.createView(_(_args.config).defaults(defaults)),
    nameView = Ti.UI.createView({

    }),
    nameLabel = Ti.UI.createLabel({

    }),
    nameValueLabel = Ti.UI.createLabel({

    }),
    genderView = Ti.UI.createView({

    }),
    genderLabel = Ti.UI.createLabel({

    }),
    genderValueLabel = Ti.UI.createLabel({

    }),
    identityView = Ti.UI.createView({

    }),
    identityLabel = Ti.UI.createLabel({

    }),
    identityValueLabel = Ti.UI.createLabel({

    }),
    phoneView = Ti.UI.createView({

    }),
    phoneLabel = Ti.UI.createLabel({

    }),
    phoneValueLabel = Ti.UI.createLabel({

    }),
    addressView = Ti.UI.createView({

    }),
    addressLabel = Ti.UI.createLabel({

    }),
    addressValueLabel = Ti.UI.createLabel({

    });

    nameView.add(nameLabel);
    nameView.add(nameValueLabel);
    genderView.add(genderLabel);
    genderView.add(genderValueLabel);
    identityView.add(identityLabel);
    identityView.add(identityValueLabel);
    phoneView.add(phoneLabel);
    phoneView.add(phoneValueLabel);
    addressView.add(addressLabel);
    addressView.add(addressValueLabel);
    self.add(nameView);
    self.add(genderView);
    self.add(identityView);
    self.add(phoneView);
    self.add(addressView);

    self.setContactData = function (data) {
        
    };

    return self;
}

module.exports = ContactView;