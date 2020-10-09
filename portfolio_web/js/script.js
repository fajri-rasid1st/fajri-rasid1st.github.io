// smooth scrolling effect
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

// scroll top button effect
$(window).on("scroll", function () {
	if ($(this).scrollTop() > 700) {
		$(".section-on-top").fadeIn(500);
	} else {
		$(".section-on-top").fadeOut(500);
	}
});

$(".section-on-top").on("click", function () {
	$("html, body").animate(
		{
			scrollTop: 0,
		},
		900,
		"easeInOutExpo"
	);
});
