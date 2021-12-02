(function () {
    var $;
    $ = this.jQuery || window.jQuery;
    win = $(window), body = $('body'), doc = $(document);

    $.fn.hc_accordion = function () {
        let acd = $(this);
        acd.find('ul>li').each(function (index, el) {
            if ($(el).find('ul li').length > 0) $(el).prepend('<button type="button" class="acd-drop"></button>');
        });
        acd.on('click', '.acd-drop', function (e) {
            e.preventDefault();
            var ul = $(this).nextAll("ul");
            if (ul.is(":hidden") === true) {
                ul.parent('li').parent('ul').children('li').children('ul').slideUp(180);
                ul.parent('li').parent('ul').children('li').children('.acd-drop').removeClass("active");
                $(this).addClass("active");
                ul.slideDown(180);
            } else {
                $(this).removeClass("active");
                ul.slideUp(180);
            }
        });
    }

    $.fn.hc_menu = function (options) {
        let settings = $.extend({
                open: '.open-mnav',
            }, options),
            this_ = $(this);
        let m_nav = $('<div class="m-nav"><button class="m-nav-close">&times;</button><div class="nav-ct"></div></div>');
        body.append(m_nav);
        m_nav.find('.m-nav-close').click(function (e) {
            e.preventDefault();
            mnav_close();
        });
        m_nav.find('.nav-ct').append($('.logo').clone().attr('style', false).removeClass('wow'));
        let parent = '';
        $('.menu .dropdown-menu .item').each(function () {
            parent += '<li>' + $(this).find('.item__title').html() + '<ul class="sub-menu">' + $(this).find('ul').html() + '</ul></li>';
        });
        m_nav.find('.nav-ct').append('<ul>' + parent + '</ul>');
        m_nav.find('.nav-ct').find('> ul').append(this_.children().clone()).append($('.btn-account').clone());
        m_nav.find('.sub-menu').removeClass();
        let mnav_open = function () {
            m_nav.addClass('active');
            body.append('<div class="m-nav-over"></div>').css('overflow', 'hidden');
        }
        let mnav_close = function () {
            m_nav.removeClass('active');
            body.children('.m-nav-over').remove();
            body.css('overflow', '');
        }

        doc.on('click', settings.open, function (e) {
            e.preventDefault();
            if (win.width() <= 1199) mnav_open();
        }).on('click', '.m-nav-over', function (e) {
            e.preventDefault();
            mnav_close();
        });

        m_nav.hc_accordion();
    }


}).call(this);


const FU = {
    animate: function (elems) {
        var animEndEv = 'webkitAnimationEnd animationend';
        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    },
};

const UI = {

    toggle: function () {
        const ani = 100;
        $('[data-show]').each(function (index, el) {
            let ct = $($(el).attr('data-show'));
            $(el).click(function (e) {
                e.preventDefault();
                ct.fadeToggle(ani);
            });
        });
        win.click(function (e) {
            $('[data-show]').each(function (index, el) {
                let ct = $($(el).attr('data-show'));
                if (ct.has(e.target).length == 0 && !ct.is(e.target) && $(el).has(e.target).length == 0 && !$(el).is(e.target)) {
                    ct.fadeOut(ani);
                }
            });
        });
    },
    search: () => {
        $('.ic-search').click(function (event) {
            $(this).children('i').toggleClass('fa-search fa-close');
            $(this).next('.form-search-hd').toggleClass('show');
        });
    },
    header: function () {
        let elm = $('.menu'),
            h = elm.innerHeight(),
            offset = $('.header .top').outerHeight(),
            mOffset = 0;
        let fixed = function () {
            elm.addClass('fixed');
            body.css('margin-top', offset);
        }
        let unfixed = function () {
            elm.removeClass('fixed');
            body.css('margin-top', '');
        }

        win.scrollTop() > offset ? fixed() : unfixed();
        win.scroll(function (e) {
            win.scrollTop() > offset ? fixed() : unfixed()
        });
    },

    stepRegister: function () {
        const wrapStep = $('.page-account');
        if (win.width < 992) {
            wrapStep.css("height", $('.step[data-index="0"]').height());
            $(win).on('resize', function () {
                wrapStep.css("height", $('.step[data-index="0"]').height());
            });
        }
        $('.page-register .step').on("click", '.btn_sb', function (e) {
            e.preventDefault();
            let that = $(this);
            wrapStep.css("height", $('.step.active').height());
            let index;
            if (that.hasClass('next')) {
                index = parseInt(that.closest('.step').data('index')) + 1;
            } else {
                index = parseInt(that.closest('.step').data('index')) - 1;
            }
            wrapStep.css({
                "margin-left": -index * 100 + "vw",
                "height": $('.step[data-index="' + index + '"]').height()
            });
        });
    },
    handleOTP: function () {
        function getCodeBoxElement(index) {
            return document.getElementById('codeBox' + index);
        }

        $('.otp input').on('keyup', function (event) {
            let index = parseInt($(this).attr('data-index'));
            const eventCode = event.which || event.keyCode;
            if (getCodeBoxElement(index).value.length === 1) {
                if (index !== 4) {
                    getCodeBoxElement(index + 1).focus();
                } else {
                    getCodeBoxElement(index).blur();
                    // Submit code
                }
            }
            if (eventCode === 8 && index !== 1) {
                getCodeBoxElement(index - 1).focus();
            }
        }).on('focus', function () {
            let index = parseInt($(this).attr('data-index'));
            for (item = 1; item < index; item++) {
                const currentElement = getCodeBoxElement(item);
                if (!currentElement.value) {
                    currentElement.focus();
                    break;
                }
            }
        }).on('keydown', function (e) {
            if ($(this).val().length === 1 && e.keyCode !== 8) return false;
        });
    },
    handleMenu: function () {
        const sidebar = $('.sidebar-left');
        const quickMenu = $('.quick-menu');
        quickMenu.on('click', function (e) {
            e.preventDefault();
            sidebar.toggleClass('active');
        });
        win.click(function (e) {
            if (sidebar.has(e.target).length === 0 && !sidebar.is(e.target) && quickMenu.has(e.target).length === 0 && !quickMenu.is(e.target)) {
                sidebar.removeClass('active');
            }
        });
    },
    other: function () {
        /*custom here*/
        if ($('.wow').length > 0) {
            WOW.prototype.addBox = function (element) {
                this.boxes.push(element);
            };

            var wow = new WOW({
                mobile: false
            });
            wow.init();
            if ($(window).width() > 991) {
                $('.wow').on('scrollSpy:exit', function () {
                    $(this).css({
                        'visibility': 'hidden',
                        'animation-name': 'none'
                    }).removeClass('animated');
                    wow.addBox(this);
                }).scrollSpy();
            }
        }

        const settings = {
            fill: '#35add9',
            background: '#ededed'
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
            let transform = 50;
            if (percentage > 95) {
                transform = 100;
            }
            if (percentage < 5) {
                transform = 0;
            }

            $(slider).prev().css({"left": percentage + '%', 'transform': 'translateX(-' + transform + '%)'})
                .find('span').text(UI.numberFormat(slider.value, ',', 0, '.'));
            slider.style.background = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${settings.background} ${percentage + 0.1}%)`;
            $(slider).val(slider.value).trigger('change');
        }
    },
    numberFormat: function (number, decimals, dec_point, thousands_sep) {
        number = parseFloat(number).toFixed(decimals);

        let nstr = number.toString();
        nstr += '';
        x = nstr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? dec_point + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

        return x1 + x2;
    },
    collapse: () => {
        $(".collapse.show").each(function () {
            $(this).prev(".card-header").find(".icon").addClass("fa-minus").removeClass("fa-plus");
        });

        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function () {
            $(this).prev(".card-header").find(".icon").removeClass("fa-plus").addClass("fa-minus");
        }).on('hide.bs.collapse', function () {
            $(this).prev(".card-header").find(".icon").removeClass("fa-minus").addClass("fa-plus");
        });
    },
    ready: function () {
        UI.toggle();
        UI.search();
        UI.header();
        UI.stepRegister();
        UI.handleOTP();
        UI.handleMenu();
        UI.other();
        UI.collapse();
    },
}

jQuery(function ($) {
    const win = $(window),
        body = $('body'),
        doc = $(document);
    UI.ready();
    $('.d-nav').hc_menu({
        open: '.open-mnav',
    })

    casSlick.init();
})

const casSlick = {
    init: () => {
        casSlick.casHome();
        casSlick.casPartner();
        casSlick.casTools();
    },
    slick: (element, options = {}) => {
        options = $.extend({
            dots: true,
            infinite: true,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="far fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="far fa-angle-right"></i></button>',
            arrows: true,
        }, options);
        if ($(element).length > 0) {
            $(element).slick(options);
            FU.animate($(element + " .slick-current [data-animation ^= 'animated']"));
            $(element).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                if (currentSlide !== nextSlide) {
                    let aniElm = $(this).find('.slick-slide[data-slick-index="' + nextSlide + '"]').find("[data-animation ^= 'animated']");
                    FU.animate(aniElm);
                }
            });
        }
    },
    casHome: () => {
        let options = {
            arrows: false,
        };
        casSlick.slick('.slide-home', options);

    },
    casPartner: () => {
        let options = {
            slidesToShow: 6,
            slidesToScroll: 6,
            dots: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        };
        casSlick.slick('.cas-partner', options);
    },
    casTools: () => {
        let options = {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        casSlick.slick('.cas-tools', options);
    },


};

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}