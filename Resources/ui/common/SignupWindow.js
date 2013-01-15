function SignupWindow (_args) {
    var _ = require('lib/underscore'),
        theme = require('helpers/theme'),
        SignupService = require('business/services/SignupService'),
        errorLabelProperties = {
            left: 10,
            right: 10,
            color: 'red',
            font: {fontSize: 24}
        },
        self = Ti.UI.createWindow(_.extend({backgroundColor: '#fff'},theme.styles.Window));

    var headerView = Ti.UI.createView(theme.styles.header.view),
    headerLabel = Ti.UI.createLabel(_.extend({text: L('signup')},theme.styles.header.label)),
    scrollView = Ti.UI.createScrollView({
        top: 90,
        left: 0,
        right: 0,
        bottom: 0,
        scrollType: 'vertical',
        contentHeight: 'auto'
    }),
    usernameField = Ti.UI.createTextField(_.extend({
        top: 10,
        passwordMask: false,
        hintText: L('username')
    },theme.styles.textfield)),
    usernameErrorLabel = Ti.UI.createLabel(_.extend({top: 90}, errorLabelProperties)),
    emailField = Ti.UI.createTextField(_.extend({
        top: 120,
        passwordMask: false,
        keyboardType: Ti.UI.KEYBOARD_EMAIL,
        hintText: L('email')
    },theme.styles.textfield)),
    emailErrorLabel = Ti.UI.createLabel(_.extend({top: 200}, errorLabelProperties)),
    passwordField = Ti.UI.createTextField(_.extend({
        top: 230,
        passwordMask: true,
        hintText: L('password')
    },theme.styles.textfield)),
    passwordErrorLabel = Ti.UI.createLabel(_.extend({top: 310}, errorLabelProperties)),
    confirmPasswordField = Ti.UI.createTextField(_.extend({
        top: 340,
        passwordMask: true,
        hintText: L('confirm_password')
    },theme.styles.textfield)),
    confirmPasswordErrorLabel = Ti.UI.createLabel(_.extend({top: 420}, errorLabelProperties)),
    firstNameField = Ti.UI.createTextField(_.extend({
        top: 450,
        passwordMask: false,
        hintText: L('first_name')
    },theme.styles.textfield)),
    lastNameField = Ti.UI.createTextField(_.extend({
        top: 560,
        passwordMask: false,
        hintText: L('last_name')
    },theme.styles.textfield)),
    genderField = Ti.UI.createTextField(_.extend({
        top: 670,
        editable: false,
        hintText: L('gender')
    },theme.styles.textfield)),
    signupButton = Ti.UI.createButton({
        borderRadius: 20,
        height: 90,
        left: 10,
        right: 10,
        top: 780,
        backgroundColor: '#87B3FF',
        backgroundFocusedColor: '#87B3FF',
        backgroundSelectedColor: '#87B3FF',
        color: '#fff',
        title: L('signup'),
        font: {fontSize: '18dp', fontWeight: 'bold'},
        enabled: false
    }),
    genderOptionDialog = Ti.UI.createOptionDialog({
        title: L('gender'),
        options: [L('female'),L('male'), L('other')]
    }),
    activityIndicator = Ti.UI.createActivityIndicator({
        message: L('processing')
    }),
    service = new SignupService({});

    headerView.add(headerLabel);

    scrollView.add(usernameField);
    scrollView.add(emailField);
    scrollView.add(passwordField);
    scrollView.add(confirmPasswordField);
    scrollView.add(firstNameField);
    scrollView.add(lastNameField);
    scrollView.add(genderField);
    scrollView.add(signupButton);

    scrollView.add(usernameErrorLabel);
    scrollView.add(emailErrorLabel);
    scrollView.add(passwordErrorLabel);
    scrollView.add(confirmPasswordErrorLabel);

    self.add(headerView);
    self.add(scrollView);
    genderField.addEventListener('focus', function (e) {
        genderOptionDialog.show();
    });
    genderField.addEventListener('click', function (e) {
        genderOptionDialog.show();
    });

    genderOptionDialog.addEventListener('click', function (e) {
        if (e.index >= 0) {
            genderField.setValue(genderOptionDialog.getOptions()[e.index]);
        }
    });

    usernameField.addEventListener('change', enableDisableSignupButton);
    emailField.addEventListener('change', enableDisableSignupButton);
    passwordField.addEventListener('change', enableDisableSignupButton);
    confirmPasswordField.addEventListener('change', enableDisableSignupButton);
    firstNameField.addEventListener('change', enableDisableSignupButton);
    lastNameField.addEventListener('change', enableDisableSignupButton);
    genderField.addEventListener('change', enableDisableSignupButton);

    signupButton.addEventListener('click', function (e) {
        setErrors({});
        var data = {
            username: usernameField.value,
            email: emailField.value,
            password: passwordField.value,
            password_confirmation: confirmPasswordField.value,
            first_name: firstNameField.value,
            last_name: lastNameField.value,
            gender: genderField.value
        },
        errors = service.validate(data);

        if (_.isEmpty(errors)) {
            activityIndicator.show();
            service.process(data).
                    done(signupSuccessHandler).
                    fail(signupFailHandler);
        } else {
            setErrors(errors);
        }
    });

    function setErrors (errors) {
        usernameErrorLabel.text = errors.username;
        emailErrorLabel.text = errors.email;
        passwordErrorLabel.text = errors.password;
        confirmPasswordErrorLabel.text = errors.password_confirmation;
    }

    function enableDisableSignupButton (e) {
        if (genderField.value && (firstNameField.value || lastNameField.value) && confirmPasswordField.value &&
            passwordField.value && emailField.value && usernameField.value) {
            signupButton.backgroundColor = '#4086FF';
            signupButton.enabled = true;
        } else {
            signupButton.backgroundColor = '#87B3FF';
            signupButton.enabled = false;
        }
    }

    function signupSuccessHandler (data) {
        activityIndicator.hide();
        var dialog = Ti.UI.createAlertDialog({
            title: L('signup_success'),
            message: L('login_now'),
            ok: L('ok')
        });

        dialog.addEventListener('click', function (e) {
            self.close();
        });
        dialog.show();
    }

    function signupFailHandler (errors) {
        activityIndicator.hide();
        if (errors.all) {
            alert(errors.all);
        }
        setErrors(errors);
    }

    return self;
}

module.exports = SignupWindow;