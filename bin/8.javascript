var Layout_Layout = {
    init: function() {

        var timer = null;

        var openMenu = function(e) {
            var $el = jQuery(e.target).closest('.as-navigation-bar-item');

            window.clearTimeout(timer);

            jQuery(".as-navigation-bar .as-menu").hide();
            jQuery('.as-navigation-bar .as-navigation-bar-item').removeClass('is-active');

            $el.children(".as-menu").show();
            $el.addClass('is-active');

        };

        var closeMenu = function(e) {
            var $el = jQuery(e.target).closest('.as-navigation-bar-item');

            timer = window.setTimeout(function() {
                $el.children(".as-menu").hide();
                $el.removeClass('is-active');
            }, 1000);

        };

        jQuery(".as-navigation-bar .as-navigation-bar-item:has(.as-menu li:gt(1))")

            .hover(openMenu, closeMenu);

        jQuery(".as-navigation-bar .as-navigation-bar-item:has(.as-menu li:gt(1)) > a")

            .on('touchstart',function(e) {
                e.preventDefault();
                e.stopPropagation();
                var $el = jQuery(e.target).closest('.as-navigation-bar-item');
                if($el.is('.is-active')) {
                    closeMenu(e);
                } else {
                    openMenu(e);
                }
            });




        jQuery(".as-navigation-bar .as-navigation-bar-item .as-menu").menu();


        jQuery(".as-navigation-bar a[href='#']").on('click',function(e){
            e.preventDefault();
            return false;
        });

        jQuery(".as-navigation-bar a[href^='http:\/\/'], .as-navigation-bar a[href^='https:\/\/']").attr('target','_blank');

    }
}

jQuery(window).ready(Layout_Layout.init);