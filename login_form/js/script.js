// style show and hide password
// select class "fas toggle"
const eye = document.querySelector(".fas.toggle");

// select class "password"
const password = document.getElementById("password");

// saat element dengan class eye di klik
eye.addEventListener("click", () => {
	// ubah iterable classList menjadi array
	const classesEye = Array.from(eye.classList);

	// jika classList eye yang ada pada index ke 2 = "fa-eye-slash"
	if (classesEye[2] === "fa-eye-slash") {
		// ganti type input menjadi text agar password kelihatan
		password.type = "text";
		// hapus class/icon fa-eye-slash
		eye.classList.remove("fa-eye-slash");
		// tambahkan class/icon fa-eye
		eye.classList.add("fa-eye");
	}
	// jika classList eye yang ada pada index ke 2 != "fa-eye-slash"
	else {
		// ganti type input menjadi password agar password tidak kelihatan
		password.type = "password";
		// hapus class/icon fa-eye
		eye.classList.remove("fa-eye");
		// tambahkan class/icon fa-eye-slash
		eye.classList.add("fa-eye-slash");
	}
});

// style pada input
// select element dengan class ".input-user"
const input = document.querySelectorAll(".input-user");

// select element form
const parent = document.getElementsByTagName("form")[0];

// saat semua bagian dari parent di klik
parent.addEventListener("focusin", (event) => {
	// select semua element dengan class "line"
	const mainLine = document.querySelectorAll(".line");

	// jika element yang di click memiliki class "username" pada index ke-1 dari classlistnya, maka:
	if (event.target.classList[1] === "username") {
		// select class "line first"
		const line = document.querySelector(".line.first");
		// beri animasi
		line.style.animation = "input-animation 0.6s ease forwards";
	}
	// namun, jika element yang di click memiliki class "password" pada index ke-1 dari classlistnya, maka:
	else if (event.target.classList[1] === "password") {
		// select class "line second"
		const line = document.querySelector(".line.second");
		//beri animasi
		line.style.animation = "input-animation 0.6s ease forwards";
	}

	// tunggu 0.5s, kemudian value dari semua line diubah menjadi none, agar
	// animasi bisa berjalan lagi ketika user kembali mengklik input username/password
	setTimeout(() => {
		mainLine.forEach((element) => {
			element.style.animation = "none";
		});
	}, 600);
});

// mekanisme login
// select element button
const button = document.querySelector(".submit");

// parsing JSON file
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		var accounts = JSON.parse(this.responseText);
		console.log(accounts);
	}
};

xmlhttp.open("GET", "/account.json", true);

xmlhttp.send();

// select input type text
button.addEventListener("click", () => {
	const data = document.getElementsByClassName("input-user");
	console.log(data.length);
});
