(function($) {
    "use strict";

    // Mobile Navigation
    if ($('.main-nav-mobile').length) {

        var $mobile_nav = $('.main-nav-mobile').clone().prop({
            class: 'mobile-nav',
        });
        $('body').append($mobile_nav);

        $('body #header').prepend('<button type="button" class="mobile-nav-toggle"><i class="ion-android-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $(document).on('click', '.mobile-nav-toggle', function(e) {
            $('#header').addClass('header-scrolled');
            $("#header").css({ "position": "fixed" });
            $("#header .ion-android-menu").css({ "position": "fixed", "top": "inherit", "right": "16px" });
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('ion-android-close ion-android-menu');
            $('.mobile-nav-overly').toggle();
        });

        $(document).on('click', '.mobile-nav-overly', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('ion-android-close ion-android-menu');
            $('.mobile-nav-overly').toggle();
        });



        $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
            e.preventDefault();
            console.log(1)
            $(this).next().slideToggle(200);
            $(this).parent().toggleClass('active');
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('ion-android-close ion-android-menu');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });

        $(".mobile-nav > ul > li > i").click(function(e) {
          // $(this).find(".submenu").css({ "transition": "max-height 2s ease-in", "max-height": "500px" });
          $(this).parent().find(".submenu").toggle();
        })
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

})(jQuery);