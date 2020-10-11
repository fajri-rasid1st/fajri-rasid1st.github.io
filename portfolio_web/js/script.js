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
	// reset jQuery animation if window Scroll Top < 50
	if (windowScroll < 100) {
		$(".text").css({
			opacity: "0",
			transform: "translateY(-50px)",
		});
		$(".quotes").css({
			opacity: "0",
			transform: "translatex(-50px) rotate(10deg)",
		});
		$(".author").css({
			opacity: "0",
			transform: "translatex(50px) rotate(-10deg)",
		});
		$(".portfolio-card").css({
			display: "block",
			opacity: "0",
			transform: "translateY(-50px) scale(0.95)",
		});
		$(".card").css({
			opacity: "0",
			transform: "translateY(-50px)",
		});
	} else {
		// section about content (text)
		if (windowScroll > $(".about").offset().top - 75) {
			$(".text").css({
				opacity: "1",
				transform: "translateY(0px)",
			});
		}
		// section about content (quotes)
		if (windowScroll > $(".about").offset().top + 175) {
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
		if (windowScroll > $(".portfolio").offset().top - 175) {
			$(".portfolio-card").each(function (index) {
				setTimeout(() => {
					$(".portfolio-card").eq(index).css({
						opacity: "1",
						transform: "translateY(0px) scale(0.95)",
					});
				}, 300 * index);
			});
		}
		// section services content
		if (windowScroll > $(".services").offset().top - 200) {
			$(".card").each(function (index) {
				setTimeout(() => {
					$(".card").eq(index).css({
						opacity: "1",
						transform: "translateY(0px)",
					});
				}, 300 * index);
			});
		}
	}
});

/*
 *
 *
 */

$(".section-on-top-btn").on("click", function () {
	// animasi scroll saat button-to-top di klik
	$("html, body").animate(
		{
			scrollTop: 0,
		},
		900,
		"easeInOutExpo"
	);
});

/*
 *
 *
 */

// Download CV button
$(".btn-cv").on("click", function () {
	window.open(
		"https://docs.google.com/uc?export=download&id=1-LRglCQbbD-97eUbMVXPOZVJf-J6poWh",
		"_blank"
	);
});

/*
 *
 *
 */

// Mekanisme portfolio select
let x = "0";
let y = 0;

$(".custom-select").on("click", function () {
	let selected = $(".custom-select option:selected").val();

	if (y % 2 == 0) {
		toggleIcon(".custom-select", "arrow-up");
	} else {
		toggleIcon(".custom-select", "arrow-down");
	}

	if (x != selected) {
		$(".portfolio-card").each(function (index) {
			$(".portfolio-card").eq(index).css({
				display: "none",
			});
		});

		if (selected == "1") {
			toggleContent(".mobile-app");
		} else if (selected == "2") {
			toggleContent(".web-dev");
		} else if (selected == "3") {
			toggleContent(".vid-edit");
		} else {
			toggleContent(".portfolio-card");
		}
	}
	y++;
	x = selected;
});

const toggleContent = (className) => {
	$(`${className}`).each(function (index) {
		$(`${className}`).eq(index).css({
			display: "block",
			opacity: "0",
			transform: "translateY(-50px) scale(0.95)",
		});
		setTimeout(() => {
			$(`${className}`).eq(index).css({
				opacity: "1",
				transform: "translateY(0px) scale(0.95)",
			});
		}, 300 * (index + 1));
	});
};

const toggleIcon = (className, targetFile) => {
	$(className).css({
		backgroundImage: `url(../css/${targetFile}.png)`,
	});
};
