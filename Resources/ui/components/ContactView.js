function ContactView (_args) {
    var _ = require('lib/underscore'),
    APP_CONST = require('business/constants'),
    item = _args.data,
    defaults = {
        left: 0, right: 0, layout: 'vertical', height: Ti.UI.SIZE
    };

    var self = Ti.UI.createView(_(_args.config).defaults(defaults)),
    nameView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    nameLabel = Ti.UI.createLabel({
        left: 10, width: 200, color: '#000', text: L('customer')
    }),
    nameValueLabel = Ti.UI.createLabel({
        left: 210, right: 10, color: '#000'
    }),
    genderView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    genderLabel = Ti.UI.createLabel({
        left: 10, width: 200, color: '#000', text: L('gender')
    }),
    genderValueLabel = Ti.UI.createLabel({
        left: 210, right: 10, color: '#000'
    }),
    identityView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    identityLabel = Ti.UI.createLabel({
        left: 10, width: 200, color: '#000', text: L('identity')
    }),
    identityValueLabel = Ti.UI.createLabel({
        left: 210, right: 10, color: '#000'
    }),
    phoneView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    phoneLabel = Ti.UI.createLabel({
        left: 10, width: 200, color: '#000', text: L('phone')
    }),
    phoneValueLabel = Ti.UI.createLabel({
        left: 210, right: 10, color: '#000'
    }),
    addressView = Ti.UI.createView({
        left: 0, right: 0, height: Ti.UI.SIZE
    }),
    addressLabel = Ti.UI.createLabel({
        left: 10, width: 200, color: '#000', text: L('address')
    }),
    addressValueLabel = Ti.UI.createLabel({
        left: 210, right: 10, color: '#000'
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
        nameValueLabel.text = data.full_name;
        genderValueLabel.text = APP_CONST.DATA.GENDER[data.gender] ? APP_CONST.DATA.GENDER[data.gender] : '';
        identityValueLabel.text = data.identity;
        phoneValueLabel.text = data.phone;
        addressValueLabel.text = data.address;
    };

    return self;
}

module.exports = ContactView;