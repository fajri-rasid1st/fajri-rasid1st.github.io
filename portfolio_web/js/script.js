// Smooth scrolling effect //
$(".scroll").on("click", function (e) {
	// ambil isi dari attribute href dari class scroll sesuai yang di click
	const href = $(this).attr("href");
	// section target dari href
	const target = $(href);
	// animasi scroll
	$("html, body").animate(
		{
			scrollTop: target.offset().top,
		},
		900,
		"easeInOutExpo"
	);
	// hilangkan event default dari class scroll
	e.preventDefault();
	// console.log($("html, body").scrollTop());
	// console.log(target.offset().top);
});

/*
 *
 *
 */

$(window).on("scroll", function () {
	let windowScroll = $(this).scrollTop();
	// Scroll top button effect //
	// ketika window di scroll hingga jarak koordinat sekarang ke top > 1000, maka
	if (windowScroll > 1000) {
		// munculkan button-to-top dengan animasi fadeIn
		$(".section-on-top-btn").fadeIn(500);
	}
	// jika < dari 1000
	else {
		// hilangkan button-to-top dengan animasi fadeOut
		$(".section-on-top-btn").fadeOut(500);
	}

	// Content show effect //
	// section about content
	if (windowScroll > $(".about").offset().top - 110) {
		$(".text").css({
			opacity: "1",
			transform: "translateY(0px)",
		});
	}

	if (windowScroll > $(".about").offset().top + 150) {
		$(".quotes").css({
			opacity: "1",
			transform: "translatex(0px) rotate(0deg)",
		});
		$(".author").css({
			opacity: "1",
			transform: "translatex(0px) rotate(0deg)",
		});
	}

	// section portfolio content
	if (windowScroll > $(".portfolio").offset().top) {
		$(".portfolio-card").css({
			opacity: "1",
			transform: "translateY(0px) scale(0.95)",
		});
	}
});

/*
 *
 *
 */

$(".section-on-top-btn").on("click", function () {
	// animasi scroll
	$("html, body").animate(
		{
			scrollTop: 0,
		},
		900,
		"easeInOutExpo"
	);
});
