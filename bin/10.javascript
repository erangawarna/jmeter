var Application_Auth_Login = {

    init: function() {
        var self = Application_Auth_Login;

        //AcitonStep_Form.enableExitWarnings = false;

        if(jQuery('.js-no-unload-prompt').length) {
           window.onbeforeunload = null;
        }


        jQuery('form.as-form').on('validate', self.validateForm);

        jQuery('.js-has-mfa-code').change(function() {
            var field=jQuery('.js-mfa-code').closest('.as-field');
            if (jQuery(this).is(":checked")) {
                field.show();
            } else {
                field.hide();
            }
        }).trigger('change');

    },

    validateForm: function(e) {
        //console.log('validating here');
        //return true;
        var gr = jQuery('.g-recaptcha-response');
        if (gr.length > 0) {
            if (gr.val() == '') {
                alert("Please complete the reCAPTCHA");
                return false;
            }
        }
        return true;
    }
};

jQuery(window).ready(Application_Auth_Login.init);
try {
if ((window.top) && (window.top.location.href.indexOf('/auth/login') < 0)) {
    if ((window.top) && (window.top.location.href.indexOf('/api/oauth/authorize') < 0)) {
        window.top.location.href = '/frontend/application/auth/login';
    }
}
} catch(e) {
//ignored
}
