// Handle navbar fixed when scrolling
window.onscroll = () => {
	const navbar = document.getElementById("navbar");
	const btnScrollTop = document.getElementById("btn-scroll-top");

	if (window.scrollY > navbar.offsetTop) {
		navbar.classList.add("navbar-fixed");

		btnScrollTop.classList.remove("invisible");
		btnScrollTop.classList.remove("opacity-0");
	} else {
		navbar.classList.remove("navbar-fixed");

		btnScrollTop.classList.add("invisible");
		btnScrollTop.classList.add("opacity-0");
	}
};

// Show and hide navigation menu when hamburger menu button is on pressed
const btnNavbar = document.getElementById("btn-navbar");
const navbarMenu = document.getElementById("navbar-menu");

btnNavbar.addEventListener("click", () => {
	btnNavbar.classList.toggle("navbar-active");

	navbarMenu.classList.toggle("invisible");
	navbarMenu.classList.toggle("opacity-0");
});

// Hide navigation menu when navigation item is on pressed
const navbarItems = document.querySelectorAll(".navbar-item");

navbarItems.forEach((item) => {
	item.addEventListener("click", () => {
		btnNavbar.classList.remove("navbar-active");

		navbarMenu.classList.add("invisible");
		navbarMenu.classList.add("opacity-0");
	});
});

// Handle icon dark theme checkbox
const checkbox = document.getElementById("toggle-mode-theme");
const html = document.querySelector("html");
const icSun = document.querySelector(".fa-sun");
const icMoon = document.querySelector(".fa-moon");

checkbox.addEventListener("click", () => {
	if (checkbox.checked) {
		html.classList.add("dark");

		icSun.classList.remove("fa-solid");
		icSun.classList.add("fa-regular");

		icMoon.classList.remove("fa-regular");
		icMoon.classList.add("fa-solid");
	} else {
		html.classList.remove("dark");

		icSun.classList.remove("fa-regular");
		icSun.classList.add("fa-solid");

		icMoon.classList.remove("fa-solid");
		icMoon.classList.add("fa-regular");
	}
});
