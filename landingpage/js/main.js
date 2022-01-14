$(document).ready(function() {


    if (window.location.hash) {
        var offset = -120;
        $('html, body').animate({
            scrollTop: ($(window.location.hash).offset().top + offset) + 'px'
        }, 1000, 'swing');
    }


    $(window).scroll(function() {
        if ($(this).scrollTop() > 60) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    AOS.init({
        easing: 'ease',
        startEvent: 'DOMContentLoaded',
        disable: function() {
            var maxWidth = 500;
            return window.innerWidth < maxWidth;
        }
    });


    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeInOutExpo');
        return false;
    });


    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
            $("#header").css({ "position": "fixed" });
            // $("#header .btn-download-app").css({ "position": "fixed", "top": "16px", "right": "72px" });
            $("#header .ion-android-menu").css({ "position": "fixed", "top": "inherit", "right": "16px" });
        } else {
            $('#header').removeClass('header-scrolled');
            $("#header").css({ "position": "inherit" });
            // $("#header .btn-download-app").css({ "position": "inherit" });
            $("#header .ion-android-menu").css({ "position": "inherit", "top": "48px", "right": "inherit" });
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }


    var showChar = 80;
    var ellipsestext = "...";
    $('.more-80').each(function() {
        var content = $(this).html();
        if (content.length > showChar) {
            var c = content.substr(0, showChar);
            var html = c + ellipsestext;
            $(this).html(html);
        }
    });



    $('.owl-carousel-newspaper').owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $('.owl-carousel_partner').owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        dots: false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
});

//refresh animations
$(window).on('load', function() {
    AOS.refresh();
});

$(".support__box-li").click(function()  {
    $(".support__box-li").removeClass("active");
    $(this).addClass("active");
    $(".support__box-content>div").removeClass("active");
    $($(this).data("ref")).addClass("active");
});