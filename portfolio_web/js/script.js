// toggle search bar
$(".search-icon").on("click", function () {
	$(".search-field").toggleClass("open-close");
	$(".search-icon").toggleClass("rotate");
});

// scroll button to top effect
$(window).on("scroll", function () {
	let windowScroll = $(this).scrollTop();

	if (windowScroll > 750) {
		$(".section-on-top-btn").fadeIn(500);
	} else {
		$(".section-on-top-btn").fadeOut(500);
	}
});

// scroll button to top animate
$(".section-on-top-btn").on("click", function () {
	$("html, body").animate(
		{
			scrollTop: 0,
		},
		750
	);
});
