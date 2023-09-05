(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();
	
	$('.navbar-toggler').on('click', function() {
		if( ! $('#mainNav').hasClass('navbar-reduce')) {
		$('#mainNav').addClass('navbar-reduce');
		}
	})

	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		});
		}
	});

	// Back to top button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
		$('.back-to-top').fadeIn('slow');
		} else {
		$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function(){
		$('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
		return false;
	});

		/*--/ Star ScrollTop /--*/
		$('.scrolltop-mf').on("click", function () {
			$('html, body').animate({
				scrollTop: 0
			}, 1000);
		});

		/*--/ Star Scrolling nav /--*/
		$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: (target.offset().top - navHeight + 5)
					}, 1000, "easeInOutExpo");
					return false;
				}
			}
		});

		// Closes responsive menu when a scroll trigger link is clicked
		$('.js-scroll').on("click", function () {
			$('.navbar-collapse').collapse('hide');
		});

		// Activate scrollspy to add active class to navbar items on scroll
		$('body').scrollspy({
			target: '#mainNav',
			offset: navHeight
		});
		/*--/ End Scrolling nav /--*/

		/*--/ Navbar Menu Reduce /--*/
		$(window).trigger('scroll');
		$(window).on('scroll', function () {
			var pixels = 50; 
			var top = 1200;
			if ($(window).scrollTop() > pixels) {
				$('.navbar-expand-md').addClass('navbar-reduce');
				$('.navbar-expand-md').removeClass('navbar-trans');
				$('#logo').css('height', 40);
				$('#logo').css('width', 35);
			} else {
				$('.navbar-expand-md').addClass('navbar-trans');
				$('.navbar-expand-md').removeClass('navbar-reduce');
				$('#logo').css('height', 100);
				$('#logo').css('width', 90);
			}
			if ($(window).scrollTop() > top) {
				$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
			} else {
				$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
			}
		});

		/*--/ Star Typed /--*/
		if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
			var typed = new Typed('.text-slider', {
				strings: typed_strings.split(','),
				typeSpeed: 80,
				loop: true,
				backDelay: 1100,
				backSpeed: 30
			});
		}

		$('.expander').expander({
			expandText: 'leer mas',
			expandPrefix: '&hellip; ',
			moreLinkClass: 'more-link',
			userCollapseText: 'leer menos',
			userCollapsePrefix: ' ',
			lessLinkClass: 'less-link',
		});

		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		$('#current-date').html(new Date().toLocaleDateString('es-ES', options));

		$('#cant-month-current').html(getMonthDifference(new Date(2023, 0, 7), new Date()));

		$('[data-toggle="tooltip"]').tooltip();
})(jQuery);

function getMonthDifference(startDate, endDate) {
	return (
		endDate.getMonth() -
		startDate.getMonth() +
		12 * (endDate.getFullYear() - startDate.getFullYear())
	);
}
