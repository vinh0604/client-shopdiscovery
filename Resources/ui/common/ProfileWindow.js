function ProfileWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        APP_CONST = require('business/constants'),
        CustomButtonBar = require('ui/components/CustomButtonBar'),
        SelectPhotoDialog = require('ui/components/SelectPhotoDialog'),
        ChangePasswordWindow = require('ui/common/ChangePasswordWindow'),
        controller = _args.controller,
        data = _args.data,
        labelProperties = {
            color: '#000',
            font: {fontSize: 30, fontWeight: 'bold'},
            left: 10
        },
        fieldProperties = {
            width: '68%',
            right: 10
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('profile')},theme.styles.header.label)),
    scrollView = Ti.UI.createScrollView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 90,
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    photoImageView = Ti.UI.createImageView({
        top: 10,
        height: 300,
        width: 300
    }),
    passwordChangeButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        backgroundColor: '#4086FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        top: 320,
        title: L('change_password'),
        font: {fontSize: '18dp', fontWeight: 'bold'}
    }),
    firstNameLabel = Ti.UI.createLabel(_.extend({text: L('first_name'), top: 445}, labelProperties)),
    firstNameField = Ti.UI.createTextField(_.extend({
        top: 420, hintText: L('first_name')
    }, fieldProperties)),
    lastNameLabel = Ti.UI.createLabel(_.extend({text: L('last_name'), top: 545}, labelProperties)),
    lastNameField = Ti.UI.createTextField(_.extend({
        top: 520, hintText: L('last_name')
    }, fieldProperties)),
    genderLabel = Ti.UI.createLabel(_.extend({text: L('gender'), top: 645}, labelProperties)),
    genderField = Ti.UI.createTextField(_.extend({
        top: 620, editable: false
    }, fieldProperties)),
    phoneLabel = Ti.UI.createLabel(_.extend({text: L('phone'), top: 745}, labelProperties)),
    phoneField = Ti.UI.createTextField(_.extend({
        top: 720, hintText: L('phone_number'), keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    }, fieldProperties)),
    identityLabel = Ti.UI.createLabel(_.extend({text: L('identity'), top: 845}, labelProperties)),
    identityField = Ti.UI.createTextField(_.extend({
        top: 820, hintText: L('identity_number'), keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    }, fieldProperties)),
    addressLabel = Ti.UI.createLabel(_.extend({text: L('address'), top: 945}, labelProperties)),
    addressTextArea = Ti.UI.createTextArea(_.extend({
        top: 920, hintText: L('address'), height: 200
    }, fieldProperties)),
    buttonBar = new CustomButtonBar({
        buttons: [L('reset'),L('done')],
        handler: function (e) {
            if (e.index) {
                
            } else {
                reset();
            }
        }
    }),
    genderOptionDialog = Ti.UI.createOptionDialog({
        title: L('gender'),
        options: [L('female'),L('male'), L('other')]
    }),
    selectPhotoDialog = new SelectPhotoDialog({
        handler: function (e) {
            photoImageView.setImage(e.media);
        }
    });

    headerView.add(headerLabel);
    scrollView.add(photoImageView);
    scrollView.add(passwordChangeButton);
    scrollView.add(firstNameLabel);
    scrollView.add(firstNameField);
    scrollView.add(lastNameLabel);
    scrollView.add(lastNameField);
    scrollView.add(genderLabel);
    scrollView.add(genderField);
    scrollView.add(phoneLabel);
    scrollView.add(phoneField);
    scrollView.add(identityLabel);
    scrollView.add(identityField);
    scrollView.add(addressLabel);
    scrollView.add(addressTextArea);

    self.add(headerView);
    self.add(scrollView);
    self.add(buttonBar);

    photoImageView.addEventListener('click', function (e) {
        selectPhotoDialog.show();
    });

    passwordChangeButton.addEventListener('click', function (e) {
        var passwordWindow = new ChangePasswordWindow({
            handler: function (e) {
                
            }
        });
        passwordWindow.open({modal: true});
    });

    genderField.addEventListener('focus', function (e) {
        genderOptionDialog.show();
    });
    genderField.addEventListener('click', function (e) {
        genderOptionDialog.show();
    });

    genderOptionDialog.addEventListener('click', function (e) {
        if (e.index >= 0) {
            genderField.setValue(genderOptionDialog.getOptions()[e.index]);
            phoneField.focus();
        }
    });

    self.addEventListener('open', function (e) {
        controller.register(self);
        reset();
    });

    function reset () {
        photoImageView.image = (data.photo ? data.photo : APP_CONST.DEFAULT.USER_PHOTO);
        firstNameField.value = data.first_name;
        lastNameField.value = data.last_name;
        genderField.value = APP_CONST.DATA.GENDER[data.gender];
        phoneField.value = data.phone;
        identityField.value = data.identity;
        addressTextArea.value = data.address;
    }

    return self;
}

module.exports = ProfileWindow;