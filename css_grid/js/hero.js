// a responsive navigation bar
// select the toggle menu input
const input = document.querySelector(".toggle-menu input");
// select the navigation ul
const navUl = document.querySelector(".navbar .navigation");

input.addEventListener("click", () => {
	navUl.classList.toggle("slide");
});

// make hero image change every 7 seconds
// select hero
const hero = document.querySelector(".hero");

// make list of hero images
const listImage = ["hero-1", "hero-2", "hero-3"];

let index = 0;

// make an interval
let heroInterval = setInterval(() => {
	// sebelum mengganti hero, tambah dulu class fade-out agar gambar berubah secara berlahan
	hero.classList.add("fade-out");

	// tunggu 0.3 detik, lalu gambar berubah
	setTimeout(() => {
		// change background image of hero appropriate of listImage
		hero.style.backgroundImage = `url(../img/${listImage[index]}.jpg)`;
	}, 300);

	// tunggu 0.3 detik lagi, lalu hilangkan class fade-out pada hero
	setTimeout(() => {
		hero.classList.remove("fade-out");
	}, 300);

	index++;

	if (index === 3) {
		index = 0;
	}
}, 7000);
