var Application_Auth_Dev = {

    init: function() {
        jQuery("#fe_tag").change(function() {
            location.href='/frontend/application/auth/login?dev_feb=' + jQuery(this).val();
        });
    }
};

jQuery(window).ready(Application_Auth_Dev.init);