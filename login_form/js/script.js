// style show and hide password
// select class fas fa-eye
const eye = document.querySelector(".fas.toggle");

// select class password
const password = document.getElementById("password");

eye.addEventListener("click", () => {
	const classesEye = Array.from(eye.classList);

	if (classesEye[2] === "fa-eye-slash") {
		password.type = "text";
		eye.classList.remove("fa-eye-slash");
		eye.classList.add("fa-eye");
	} else {
		password.type = "password";
		eye.classList.remove("fa-eye");
		eye.classList.add("fa-eye-slash");
	}
});

// style pada input type text
// select input type=text
const input = document.querySelectorAll(".input-user");

// select element form
const parent = document.getElementsByTagName("form")[0];

parent.addEventListener("click", (event) => {
	const mainLine = document.querySelectorAll(".line");

	if (event.target.classList[1] === "username") {
		// select kelas "line first"
		const line = document.querySelector(".first");
		line.style.animation = "input-animation 0.5s ease forwards";
	} else if (event.target.classList[1] === "password") {
		// select kelas "line second"
		const line = document.querySelector(".second");
		line.style.animation = "input-animation 0.5s ease forwards";
	}

	setTimeout(() => {
		mainLine.forEach((element) => {
			element.style.animation = "none";
		});
	}, 500);
});
