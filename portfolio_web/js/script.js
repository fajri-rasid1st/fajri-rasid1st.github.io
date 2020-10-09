// Smooth scrolling effect
// ketika element dengan class scroll di click:
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

// Scroll top button effect
// beri event ketika window di scroll
$(window).on("scroll", function () {
	// ketika window di scroll hingga koordinat top-nya > 1000, maka
	if ($(this).scrollTop() > 1000) {
		// munculkan button to top dengan animasi fadeIn
		$(".section-on-top-btn").fadeIn(500);
	} else {
		// hilangkan button to top dengan animasi fadeOut
		$(".section-on-top-btn").fadeOut(500);
	}
});
// beri event ketika element dengan class section-on-top-btn di click
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
