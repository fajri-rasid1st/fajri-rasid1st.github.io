// Menampilkan dan menghilangkan menu item saat hamburger menu ditekan
const navMenuToggle = document.querySelector(".nav-menu-toggle input");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-link");
const navIcon = document.getElementById("ic-nav-menu");

navMenuToggle.addEventListener("click", () => {
	navList.classList.toggle("slide");
});

navLinks.forEach((navLink) => {
	navLink.addEventListener("click", () => {
		navList.classList.remove("slide");
		navIcon.checked = false;
	});
});

// Mengatur navigasi carousel pada article expedition
const carouselButtons = document.querySelectorAll("[data-carousel-button]");

carouselButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const offset = button.dataset.carouselButton === "next" ? 1 : -1;
		const carouselItems = button
			.closest("[data-carousel]")
			.querySelector("[data-carousel-item]");
		const activeItem = carouselItems.querySelector("[data-active]");

		let newIndex = [...carouselItems.children].indexOf(activeItem) + offset;

		if (newIndex < 0) newIndex = carouselItems.children.length - 1;

		if (newIndex >= carouselItems.children.length) newIndex = 0;

		carouselItems.children[newIndex].dataset.active = true;

		delete activeItem.dataset.active;
	});
});

// Mengubah tahun pada footer secara dinamis sesuai tahun saat ini
const copyright = document.getElementById("copyright");

copyright.appendChild(document.createTextNode(new Date().getFullYear()));
