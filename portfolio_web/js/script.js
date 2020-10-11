// Smooth scrolling effect //
$(".scroll").on("click", function (e) {
	// hilangkan event default dari class scroll
	e.preventDefault();
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
	// reset jQuery animation jika window Scroll Top < 100
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
			transform: "translateY(-40px) scale(0.95)",
		});
		$(".card").css({
			opacity: "0",
			transform: "translateY(-40px)",
		});
	} else {
		// section about content scroll animation (text)
		if (windowScroll > $(".about").offset().top - 75) {
			$(".text").css({
				opacity: "1",
				transform: "translateY(0px)",
			});
		}
		// section about content scroll animation (quotes)
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
		// section portfolio content scroll animation
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
		// section services content scroll animation
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

// Animasi scroll saat button-to-top di klik
$(".section-on-top-btn").on("click", function () {
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
// mengganti icon dari form select sesuai kondisi
let y = 0;
$("#select").on("click", function () {
	if (y % 2 == 0) {
		toggleIcon(this, "arrow-up");
	} else {
		toggleIcon(this, "arrow-down");
	}
	y++;
});
// saat element option pada select di click:
$("#select").on("change", function () {
	// ambil value dari option yang dipilih pada element select
	let selected = $("#select option:selected").val();
	// hilangkan terlebih dahulu semua porfolio card
	$(".portfolio-card").each(function (index) {
		$(".portfolio-card").eq(index).css({
			display: "none",
		});
	});
	// beri animasi pada content portfolio sesuai pilihan user
	if (selected == "1") {
		toggleContent(".mobile-app");
	} else if (selected == "2") {
		toggleContent(".web-dev");
	} else if (selected == "3") {
		toggleContent(".vid-edit");
	} else {
		toggleContent(".portfolio-card");
	}
});
// function untuk memunculkan animasi pada portfolio card
const toggleContent = (className) => {
	$(`${className}`).each(function (index) {
		// pertama-tama beri display block agar animasi bisa berjalan
		$(`${className}`).eq(index).css({
			display: "block",
			opacity: "0",
			transform: "translateY(-40px) scale(0.95)",
		});
		// tunggu tiap 300ms, lalu jalankan animasi
		setTimeout(() => {
			$(`${className}`).eq(index).css({
				opacity: "1",
				transform: "translateY(0px) scale(0.95)",
			});
		}, 300 * (index + 1));
	});
};
// function untuk mengganti gambar icon pada element select
const toggleIcon = (className, targetFile) => {
	$(className).css({
		backgroundImage: `url(../css/${targetFile}.png)`,
	});
};
