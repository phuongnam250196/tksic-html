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


    // Smooth scroll for the menu and links with .scrollto classes
    $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 50;

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 800, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('ion-android-close ion-android-menu');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    $('.owl-carousel_capital').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        // autoplay:true,
        // autoplayTimeout:3000,
        // autoplayHoverPause:true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
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


    const settings = {
        fill: '#055ba9',
        background: '#d7dcdf'
    }

    const sliders = document.querySelectorAll('.range-slider');
    Array.prototype.forEach.call(sliders, (slider) => {

        slider.querySelector('input').addEventListener('input', (event) => {

            applyFill(event.target);
        });

        applyFill(slider.querySelector('input'));
    });

    function applyFill(slider) {

        const percentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);

        const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage+0.1}%)`;
        slider.style.background = bg;
    }
});

//refresh animations
$(window).on('load', function() {
    AOS.refresh();
});