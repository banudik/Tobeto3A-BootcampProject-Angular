
$(document).ready(function () {
    $('.home-slider').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1,
        itemsDesktop: false,
        itemsDesktopSmall: false,
        itemsTablet: false,
        itemsMobile: false
    });
});


$('.slider-first').owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
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
})

$('.slider-second').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide-second'></div>"],
    responsive: {
        0: {
            items: 1.5
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})

$('.slider-third').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide-second'></div>"],
    responsive: {
        0: {
            items: 1.5
        },
        600: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})





const dropdownBtn = document.getElementById('profile-dropdown');
if (dropdownBtn) {
    let dropdownItem = document.querySelector('.dropdown-menuu');
    const dropdownImage = document.querySelector('.right-nav .with-dropdown #profile-dropdown img ');
    dropdownBtn.addEventListener('click', function () {
        dropdownItem.classList.toggle('active')
        dropdownBtn.classList.toggle('active')
        dropdownImage.classList.toggle('active')
    })
}


$(document).ready(function () {

    $('.sss-left > ul > li:first').addClass('active');
    $('.sss-right > .sss-tab-content:first').addClass('active')
    $('.sss-left > ul > li').click(function () {
        index = $(this).index();
        $('.sss-left > ul > li').removeClass('active');
        $(this).addClass('active');
        $(".sss-right > .sss-tab-content").removeClass('active');
        $(".sss-right > .sss-tab-content").eq(index).addClass('active');
    })
    $('.btns ul li:first').addClass('active');
    $('.login-container:first').addClass('active')
    $('.btns ul li').click(function () {
        index = $(this).index();
        console.log(index);
        $('.btns ul li').removeClass('active');
        $(this).addClass('active');
        $(".login-container").removeClass('active');
        $(".login-container").eq(index).addClass('active');
        if ($('.long-form').hasClass('active')) {
            $('.form-start').css('top', '2%');
        } else {
            $('.form-start').css('top', '25%');
            $('.login-container input').css('margin-bottom', '20px !important')
        }
    })
    $('.login-redirect').click(function () {
        indexx = $(this).index();
        $(".login-container").removeClass('active');
        $(".login-container").eq(indexx).addClass('active');
    })
    $('.checkbox-cont').click(function () {
        $(this).toggleClass('active')
    })

    $('.password-input-area img').on('click', function () {
        var passInput = $(".password-input-area input");
        if (passInput.attr('type') === 'password') {
            passInput.attr('type', 'text');
        } else {
            passInput.attr('type', 'password');
        }
    })


    $('.mobile-search-icon').click(function () {
        let mobileSearchSection = $('.mobile-search-section');
        mobileSearchSection.addClass('active')
        if (mobileSearchSection.hasClass('active')) {
            mobileCloseIcon = $('.mobile-close-icon');
            mobileCloseIcon.click(function () {
                mobileSearchSection.removeClass('active')
            })
        }

    })
    $('.remember-me-right a').click(function () {
        $('.forgot-password').addClass('active')
        $('.register-container').addClass('blurred');
        $('.navbar').addClass('blurred');
        if (($('.forgot-password')).hasClass('active')) {
            $('.forgot-password img').click(function () {
                $('.forgot-password').removeClass('active')
                $('.register-container').removeClass('blurred');
                $('.navbar').removeClass('blurred');
            })
        }
    })




    let mobileSearch = $('.mobile-search-input input');
    if (mobileSearch) {
        mobileSearch.keypress(function (e) {
            let key = e.which;
            if (key === 13) {
                console.log($('.mobile-search-input input').val());
                $('<li><a href="#"><img src="assets/img/clock-icon.svg" alt="clock-icon"><span>' + $('.mobile-search-input input').val() + '</span></a></li>').appendTo('.searched-before ul');
                $('.mobile-search-input input').text("")
            }
        })
    } else {
        console.log('olmadý');
    };
    $('.mobile-hamb-menu').click(function () {
        $('.burger-menu-section').toggleClass('active')
        $('.down-with-login').removeClass('active')
        $('.mobile-account-a').removeClass('active')
        $(this).toggleClass('close-toggle')
        if ($('.burger-menu-section').hasClass('active')) {
            $('.video-container').css('filter', 'blur(4px)')
            $('.mainpage-hero-section').css('filter', 'blur(4px)')
            $('.mainpage-input').css('filter', 'blur(4px)')
        } else {
            $('.video-container').css('filter', 'blur(0)')
            $('.mainpage-hero-section').css('filter', 'blur(0)')
            $('.mainpage-input').css('filter', 'blur(0)')
        }
    })
    $('.mobile-account-a').click(function () {
        $('.burger-menu-section').removeClass('active')
        $('.mobile-hamb-menu').addClass('mobile-none');
        $('.close-it').toggleClass('active')
        $(this).toggleClass('active')
        $('.account-section').toggleClass('active')
        $('.down-with-login').toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.video-container').css('filter', 'blur(4px)')
            $('.mainpage-hero-section').css('filter', 'blur(4px)')
            $('.mainpage-input').css('filter', 'blur(4px)')
            $('.close-it').click(function () {
                $('.mobile-account-a').removeClass('active')
                $('.account-section').removeClass('active')
                $('.down-with-login').removeClass('active')
                $(this).removeClass('active')
                $('.mobile-hamb-menu').removeClass('mobile-none');
                $('.video-container').css('filter', 'blur(0)')
                $('.mainpage-hero-section').css('filter', 'blur(0)')
                $('.mainpage-input').css('filter', 'blur(0)')
            })
        } else {
            $('.video-container').css('filter', 'blur(0)')
            $('.mainpage-hero-section').css('filter', 'blur(0)')
            $('.mainpage-input').css('filter', 'blur(0)')
            $('.mobile-hamb-menu').removeClass('mobile-none');
        }
    })
    $('.down-with-login .with-dropdown').click(function () {
        $('.dropdown-menuu').toggleClass('active')
        $('.down-with-login .with-dropdown').toggleClass('active')
        $('.dropdown-menuu').toggleClass('padding');
        $('.with-dropdown #profile-dropdown').toggleClass('active');
        $('#profile-dropdown .down-arrow-icon').toggleClass('active');



    })
    $('.courses-top-orange h3.text-white img').click(function () {
        $('.courses-top-orange').toggleClass('active');
        $('.inputs .input-area').toggleClass('active')
    })

    $('.video-content-section .video-content-top-section ul li:first').addClass('active');
    $('.video-content-bottom-section-container .video-content-bottom-section:first').addClass('active')

    $('.video-content-section .video-content-top-section ul li').click(function () {
        index = $(this).index();
        $('.video-content-section .video-content-top-section ul li').removeClass('active');
        $(this).addClass('active');
        $(".video-content-bottom-section").removeClass('active');
        $(".video-content-bottom-section").eq(index).addClass('active');
    })

    $('.inputs .input-area .droppdown-btn').click(function () {
        $(this).toggleClass('active')
        $(this).next().toggleClass('active')
    })

    $('.instructor .inst-right-bottom').click(function () {
        let eray = $('.inst-right-mid .detail');
        console.log("asdasd");
        let durak = $(this).parent().parent().find(".summary");
        let parentP = $(this).parent().find(eray);
        parentP.toggleClass('hide');
        durak.toggleClass('hide')
        return false;
    })

    $('.tabs a:first').addClass('active');
    $('.grid-container:first').addClass('active')
    $('.tabs a').click(function () {
        index = $(this).index();
        $('.tabs a').removeClass('active');
        $(this).addClass('active');
        $(".grid-container").removeClass('active');
        $(".grid-container").eq(index).addClass('active');
        if ($('#sertifikalar').hasClass("active")) {
            $(".change-color").addClass("active");
        } else {
            $(".change-color").removeClass("active");
        }
    })
})
