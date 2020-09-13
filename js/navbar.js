// a responsive navigation bar

// select the toggle menu input
const input = document.querySelector(".toggle-menu input");
// select the navigation ul
const navUl = document.querySelector("nav ul");

input.addEventListener("click", () => {
	navUl.classList.toggle("slide");
});
