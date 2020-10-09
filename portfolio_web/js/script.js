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
	// Scroll top button effect //
	// nilai kordinat Y window saat discroll
	let windowScroll = $(this).scrollTop();
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
	// section about content (text)
	if (windowScroll > $(".about").offset().top - 110) {
		$(".text").css({
			opacity: "1",
			transform: "translateY(0px)",
		});
	} else {
		$(".text").css({
			opacity: "0",
			transform: "translateY(-30px)",
		});
	}
	// section about content (quotes)
	if (windowScroll > $(".about").offset().top + 150) {
		$(".quotes").css({
			opacity: "1",
			transform: "translatex(0px) rotate(0deg)",
		});
		$(".author").css({
			opacity: "1",
			transform: "translatex(0px) rotate(0deg)",
		});
	} else {
		$(".quotes").css({
			opacity: "0",
			transform: "translatex(-30px) rotate(10deg)",
		});
		$(".author").css({
			opacity: "0",
			transform: "translatex(30px) rotate(-10deg)",
		});
	}
	// section portfolio content
	if (windowScroll > $(".portfolio").offset().top - 150) {
		$(".portfolio-card").each(function (index) {
			setTimeout(() => {
				$(".portfolio-card").eq(index).css({
					opacity: "1",
					transform: "translateY(0px) scale(0.95)",
				});
			}, 350 * (index + 1));
		});
	} else {
		$(".portfolio-card").css({
			opacity: "0",
			transform: "translateY(-30px) scale(0.95)",
		});
	}
	// section services content
	if (windowScroll > $(".services").offset().top - 150) {
		$(".card").each(function (index) {
			setTimeout(() => {
				$(".card").eq(index).css({
					opacity: "1",
				});
			}, 350 * (index + 1));
		});
	} else {
		$(".card").css({
			opacity: "0",
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
