	$(function () {
		// Scroll Event
		$(window).on("scroll", function () {
			var scrolled = $(window).scrollTop();
			if (scrolled > 600) $(".go-top").addClass("active");
			if (scrolled < 600) $(".go-top").removeClass("active");
		});
		// Click Event
		$(".go-top").on("click", function () {
			$("html, body").animate({ scrollTop: "0" }, 500);
		});
	});

	// Odometer JS
	$('.odometer').appear(function(e) {
		var odo = $(".odometer");
		odo.each(function() {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});
	
	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "991"
	});

	// Header Sticky
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 120) {
			$('.navbar-area').addClass("is-sticky");
		}
		else {
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Popup Video
	$('.popup-youtube').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Nice Select JS
	$('select').niceSelect();

	// Sidebar Sticky
	$('.instructor-sidebar-sticky').stickySidebar({
		topSpacing: 20,
		bottomSpacing: 0
	});

	// Mixitup
	$('#mix-wrapper').mixItUp({
		selectors: {
			target: '.mix-target'
		}
	});
