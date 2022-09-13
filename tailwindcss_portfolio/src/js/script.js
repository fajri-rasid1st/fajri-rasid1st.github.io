// Navbar fixed
window.onscroll = () => {
	const navbar = document.getElementById("navbar");
	const offsetTop = navbar.offsetTop;

	if (window.scrollY > offsetTop) {
		navbar.classList.add("navbar-fixed");
	} else {
		navbar.classList.remove("navbar-fixed");
	}
};

// Menampilkan dan menghilangkan menu item saat hamburger menu ditekan
const btnNavbar = document.getElementById("btn-navbar");
const navbarMenu = document.getElementById("navbar-menu");

btnNavbar.addEventListener("click", () => {
	btnNavbar.classList.toggle("navbar-active");

	navbarMenu.classList.toggle("invisible");
	navbarMenu.classList.toggle("opacity-0");
});
